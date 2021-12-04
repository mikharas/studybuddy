'use strict'

const env = process.env.NODE_ENV

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
// const TEST_USER_ID =
const TEST_USER_USERNAME = 'user'

const path = require('path')

const express = require('express')
const app = express();
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }
const log = (stuff) => console.log(stuff)
const { mongoose } = require("./db/mongoose");
mongoose.connect('mongodb://localhost:27017/StudyBuddyAPI').then(()=>{console.log('...')})

const { Event } = require("./models/event");
const { User } = require("./models/user");
const { ObjectID } = require('mongodb')

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
            res.status(401).send('Unauthorized')
        })
    } else {
        res.status(401).send('Unauthorized')
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
        res.status(401).send('Unauthorized');
    }
})

/** API Routes **/
// User API Routes

// Route for creating a user.
/* 
Request body expects:
{
	"username": <username>,
    "password": <password>,
    "isAdmin": <true or false>
}
*/
app.post('/events-explorer', mongoChecker, async (req, res) => {
    
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        following: [],
    })

    try {
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad request')
        }
    }
})

// Route for removing a user.
app.delete('/profile/:userID', mongoChecker, authenticate, async (req, res) => {
    const userID = req.params.userID
    if (!ObjectID.isValid(userID)) {
		res.status(404).send('Resource not found')
		return;
	}

    try {
        const user = await User.findByIdAndRemove(userID)
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            res.send(user)
        }
    } catch(error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})

// Route for getting a user.
app.get('/profile/:userID', mongoChecker, authenticate, async (req, res) => {
    const userID = req.params.userID
    if (!ObjectID.isValid(userID)) {
		res.status(404).send('Resource not found')
		return;
	}

    try {
        const user = await User.findById(userID)
        if (!user) {
            res.status(404).send('Resource not found')
        } else {
            res.send(user)
        }
    } catch(error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})

// Route for getting all users.
app.get('/users', mongoChecker, authenticate, async (req, res) => {

    try {
        const users = await User.find()
        res.send(users)
    } catch(error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})

// Route for editing a user's information.
/* 
Request body expects, for example:
[
  { "op": "add", "path": "/fullName", "value": "Full Name" },
  { "op": "replace", "path": "/school", "value": "New School" },
  ...
]
*/
app.patch('/profile/:userID', mongoChecker, authenticate, async (req, res) => {
    const userID = req.params.userID
    if (!ObjectID.isValid(userID)) {
		res.status(404).send('Resource not found')
		return;
	}

    const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1)
		fieldsToUpdate[propertyToChange] = change.value
	})

    try {
		const user = await User.findOneAndUpdate({_id: userID}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(user)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad request')
        }
    }
})


// Route for adding an user to another's following list.
/* 
Request body expects:
{
	"user": <follower user ID>
}
*/
app.post('/profile/:userID/follow', mongoChecker, async (req, res) => {
	const userID = req.params.userID
    if (!ObjectID.isValid(userID)) {
		res.status(404).send('Resource not found')
		return;
	}

	try {
		const follower = await User.findById(req.body.user)
		if (!follower) {
			res.status(404).send('Resource not found')
		} else {
			follower.following.push(userID)
			const newUser = await follower.save()
			res.send({
				user: newUser
			})
		}
	} catch(error) {
		console.log(error)
		res.status(400).send('Bad request')
	}
})

// Route for removing a user from another's following list.
/* 
Request body expects:
{
	"user": <to-be removed user ID>
}
*/
app.delete('/profile/:userID/unfollow', mongoChecker, async (req, res) => {
	const userID = req.params.userID
    if (!ObjectID.isValid(userID)) {
		res.status(404).send('Resource not found')
		return;
	}

	try {
		const follower = await User.findById(req.body.user)
		if (!follower) {
			res.status(404).send('Resource not found')
		} else {
            const index = follower.following.indexOf(userID)
            follower.following.splice(index, 1)
			const newUser = await follower.save()
			res.send({
				user: newUser
			})
		}
	} catch(error) {
		console.log(error)
		res.status(400).send('Bad request')
	}
})

// Event API Routes

// Route for creating an event.
/* 
Request body expects:
{
	"title": <attendee>,
    "description": <description>,
    "location": <location>,
    "maxSpots": <number of spots>,
    "date": <date>
}
*/
app.post('/event-dashboard', mongoChecker, authenticate, async (req, res) => {
    
    const event = new Event({
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
            log(error)
            res.status(400).send('Bad request')
        }
    }
})

// Route for removing an event.
app.delete('/event-dashboard/:eventID', mongoChecker, authenticate, async (req, res) => {
    const eventID = req.params.eventID
    if (!ObjectID.isValid(eventID)) {
		res.status(404).send('Resource not found')
		return;
	}

    try {
        const event = await Event.findByIdAndRemove(eventID)
        if (!event) {
            res.status(404).send('Resource not found')
        } else {
            res.send(event)
        }
    } catch(error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})

// Route for getting all events.
app.get('/event-dashboard', mongoChecker, authenticate, async (req, res) => {
    try {
        const events = await Event.find()
        res.send(events)
    } catch(error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})

// Route for getting one event.
app.get('/event-dashboard/:eventID', mongoChecker, authenticate, async (req, res) => {
    const eventID = req.params.eventID
    if (!ObjectID.isValid(eventID)) {
		res.status(404).send('Resource not found')
		return;
	}

    try {
        const event = await Event.findById(eventID)
        if (!event) {
            res.status(404).send('Resource not found')
        } else {
            res.send(event)
        }
    } catch(error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})

// Route for editing an event.
/* 
Request body expects, for example:
[
  { "op": "replace", "path": "/description", "value": "New Description" },
  { "op": "replace", "path": "/maxSpots", "value": 5 },
  ...
]
*/
app.patch('/event-dashboard/:eventID', mongoChecker, authenticate, async (req, res) => {
    const eventID = req.params.eventID
    if (!ObjectID.isValid(eventID)) {
		res.status(404).send('Resource not found')
		return;
	}

    const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1)
		fieldsToUpdate[propertyToChange] = change.value
	})

    try {
		const event = await Event.findOneAndUpdate({_id: eventID}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!event) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(event)
		}
	} catch (error) {
        log(error)
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
	"attendee": <attendee ID>
}
*/
app.post('/event-dashboard/:eventID/attend', mongoChecker, authenticate, async (req, res) => {
	const eventID = req.params.eventID
    if (!ObjectID.isValid(eventID)) {
		res.status(404).send('Resource not found')
		return;
	}

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
		log(error)
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
app.delete('/event-dashboard/:eventID/unattend', mongoChecker, authenticate, async (req, res) => {
	const eventID = req.params.eventID
    if (!ObjectID.isValid(eventID)) {
		res.status(404).send('Resource not found')
		return;
	}

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
		log(error)
		res.status(400).send('Bad request')
	}
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port localhost://${port}...`);
})