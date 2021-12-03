'use strict'

const env = process.env.NODE_ENV

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
// const TEST_USER_ID =
const TEST_USER_USERNAME = 'user'

const path = require('path')

const express = require('express')
const app = express();

const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

const { Event } = require("./models/event");
const { User } = require("./models/user");

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const session = require("express-session");
const MongoStore = require('connect-mongo');

function isMongoError(error) {
    return typeof error === 'object' && error != null && error.name === "MongoNetworkError"
}

/** Helper Functions **/

const mongoChecker = (req, res, next) => {
    if (mongoose.connection.readyState != 1) {
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}

/** Middleware **/

const authenticate = (req, res, next) => {
    if (env !== 'production' && USE_TEST_USER) {
        req.session.user = TEST_USER_ID
    }

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send()
        })
    } else {
        res.status(401).send()
    }
}

/** Session Handling **/

app.use(
    session({
        secret: process.env.SESSION_SECRET, // || "some secret"
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        store: env === 'production' ? MongoStore.create({
                                                mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/StudyBuddyAPI'
                                            }) : null
    })
);

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findByUsernamePassword(username, password)
        .then(user => {
            req.session.user = user._id;
            req.session.username = user.username;
            res.send({ currentUser: user.username});
        })
    .catch(error => {
        res.status(400).send()
    })
})

app.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

app.get("/check-session", (req, res) => {
    if (env !== 'production' && USE_TEST_USER) {
        req.session.user = TEST_USER_ID;
        req.session.username = TEST_USER_USERNAME;
        res.send({ currentUser: TEST_USER_USERNAME })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
})

/** API Routes **/
// User API Routes
app.post('/events-explorer', mongoChecker, async (req, res) => {
    
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        following: []
    })

    try {
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad request')
        }
    }
})

app.get('/profile/:userID', mongoChecker, authenticate, async (req, res) => {
    const userID = req.params.userID

    try {
        const user = await User.findById(userID)
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            res.send(user)
        }
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})

// Event API Routes
app.post('/event-dashboard', mongoChecker, authenticate, async (req, res) => {
    
    const event = new Event({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        host: currentUser,
        location: req.body.location,
        maxSpots: req.body.maxSpots,
        date: req.body.date,
        attendees: []
    })

    try {
        const newEvent = await event.save()
        res.send(newEvent)
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad request')
        }
    }
})

app.get('/event-dashboard', mongoChecker, authenticate, async (req, res) => {
    try {
        const events = await Event.find()
        res.send(events)
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})

app.get('/event-dashboard/:eventID', mongoChecker, authenticate, async (req, res) => {
    const eventID = req.params.eventID

    try {
        const event = await Event.findById(eventID)
        if (!event) {
            res.status(404).send('Resource not found')
        } else {
            res.send(event)
        }
    } catch(error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})

app.patch('/event-dashboard/:eventID', mongoChecker, authenticate, async (req, res) => {
    const eventID = req.params.eventID

    const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1)
		fieldsToUpdate[propertyToChange] = change.value
	})

    try {
		const event = await Event.findOneAndUpdate({id: eventID}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!event) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(event)
		}
	} catch (error) {
		console.log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad request')
        }
    }
})

// Route for adding an attendee to a particular event.
/* 
Request body expects:
{
	"attendee": <attendee>
}
*/
app.post('/event-dashboard/:eventID', mongoChecker, authenticate, async (req, res) => {
	const eventID = req.params.eventID

	try {
		const event = await Event.findById(eventID)
		if (!event) {
			res.status(404).send('Resource not found')
		} else {
			event.attendees.push(req.body.attendee)
			const newEvent = await event.save()
			res.send({
				event: newEvent
			})
		}
	} catch(error) {
		console.log(error)
		res.status(400).send('Bad request')
	}
})

// Route for removing an attendee from a particular event.
/* 
Request body expects:
{
	"attendee": <attendee>
}
*/
app.delete('/event-dashboard/:eventID', mongoChecker, authenticate, async (req, res) => {
	const eventID = req.params.eventID

	try {
		const event = await Event.findById(eventID)
		if (!event) {
			res.status(404).send('Resource not found')
		} else {
            const index = event.attendees.indexOf(req.body.attendee)
            event.attendees.splice(index, 1)
			const newEvent = await event.save()
			res.send({
				event: newEvent
			})
		}
	} catch(error) {
		console.log(error)
		res.status(400).send('Bad request')
	}
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})