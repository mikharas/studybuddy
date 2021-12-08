const env = process.env.NODE_ENV;
require('dotenv').config();

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON; // option to turn on the test user.
// const TEST_USER_ID =
const TEST_USER_USERNAME = 'user';

const path = require('path');

const express = require('express');

const app = express();
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }),
);
const cors = require('cors');

app.use(cors());
const log = (stuff) => console.log(stuff);
const { mongoose } = require('./db/mongoose');

const { Event } = require('./models/event');
const { User } = require('./models/user');
const { ObjectID } = require('mongodb');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');
const MongoStore = require('connect-mongo');

function isMongoError(error) {
  return (
    typeof error === 'object' &&
    error != null &&
    error.name === 'MongoNetworkError'
  );
}

/** Helper Functions * */

const mongoChecker = (req, res, next) => {
  if (mongoose.connection.readyState != 1) {
    res.status(500).send('Internal server error');
  } else {
    next();
  }
};

/** Middleware * */

const authenticate = (req, res, next) => {
  if (env !== 'production' && USE_TEST_USER) {
    req.session.user = TEST_USER_ID;
  }

  if (req.session.user) {
    User.findById(req.session.user)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        }
        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(401).send('Unauthorized');
      });
  } else {
    res.status(401).send('Unauthorized');
  }
};

/** Session Handling * */

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'some secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
      httpOnly: true,
    },
    store:
      env === 'production'
        ? MongoStore.create({
            mongoUrl:
              process.env.MONGODB_URI ||
              'mongodb://localhost:27017/StudyBuddyAPI',
          })
        : null,
  }),
);

app.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  User.findByUsernamePassword(username, password)
    .then((user) => {
      req.session.user = user._id;
      req.session.username = user.username;
      res.send({ currentUser: user.username, isAdmin: user.isAdmin });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

app.get('/check-session', (req, res) => {
  if (env !== 'production' && USE_TEST_USER) {
    req.session.user = TEST_USER_ID;
    req.session.username = TEST_USER_USERNAME;
    res.send({ currentUser: TEST_USER_USERNAME });
    return;
  }

  if (req.session.user) {
    res.send({ currentUser: req.session.username });
  } else {
    res.status(401).send('Unauthorized');
  }
});

/** API Routes * */
// User API Routes

// Route for creating a user.
/* 
Request body expects:
{
	"username": <username>,
    "password": <password>,
    "isAdmin": <true or false>,
    "profileImage": <image>
}
*/
app.post('/user', mongoChecker, async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    following: [],
    contact: 'N/A',
    fullName: 'N/A',
    userSchool: 'N/A',
    profileImage: req.body.profileImage
  });

  try {
    const users = await User.find();
    let flag = true;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == req.body.username) {
        flag = false;
        res.status(409).send('User Exists');
      }
    }
    if (flag) {
      const newUser = await user.save();
      res.send(newUser);
    }
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send('Internal server error');
    } else {
      log(error);
      res.status(400).send('Bad request');
    }
  }
});

// Route for removing a user.
app.delete('/profile/:userID', mongoChecker, authenticate, async (req, res) => {
  const { userID } = req.params;
  if (!ObjectID.isValid(userID)) {
    res.status(404).send('Resource not found');
    return;
  }

  try {
    const user = await User.findByIdAndRemove(userID);
    if (!user) {
      res.status(404).send('Resource not found');
    } else {
      res.send(user);
    }
  } catch (error) {
    log(error);
    res.status(500).send('Internal server error');
  }
});

// Route for getting a user.
app.get('/profile/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await User.findOne({
      username: userID,
    });

    if (!user) {
      res.status(404).send('Resource not found');
    } else {
      res.send(user);
    }
  } catch (error) {
    log(error);
    res.status(500).send('Internal server error');
  }
});

// Route for getting all users.
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    log(error);
    res.status(500).send('Internal server error');
  }
});

// Route for editing a user's information.
/* 
Request body expects, for example:
[
  { "op": "add", "path": "/fullName", "value": "Full Name" },
  { "op": "replace", "path": "/school", "value": "New School" },
  ...
]
*/
app.patch('/profile/:userID', mongoChecker, async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { username: userID },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true, useFindAndModify: false },
    );

    if (!user) {
      res.status(404).send();
    } else {
      res.send(user);
    }
  } catch (error) {
    log(error);
    res.status(500).send(); // server error, could not delete.
  }
});

// Route for adding an user to another's following list.
/* 
Request body expects:
{
	"user": <follower user ID>
}
*/
app.post('/profile/:follower/:following', mongoChecker, async (req, res) => {
  try {
    const follower = await User.findOne({
      username: req.params.follower,
    });
    if (!follower) {
      res.status(404).send('Resource not found');
    } else {
      follower.following.push(req.params.following);
      const newUser = await follower.save();
      res.send({
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('Bad request');
  }
});

// Route for removing a user from another's following list.
/* 
Request body expects:
{
	"user": <to-be removed user ID>
}
*/
app.delete('/profile/:follower/:following', mongoChecker, async (req, res) => {
  try {
    const follower = await User.findOne({
      username: req.params.follower,
    });
    if (!follower) {
      res.status(404).send('Resource not found');
    } else {
      const index = follower.following.indexOf(req.params.following);
      follower.following.splice(index, 1);
      const newUser = await follower.save();
      res.send({
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('Bad request');
  }
});

// Event API Routes

// Route for creating an event.
/* 
Request body expects:
{
	"title": <attendee>,
    "description": <description>,
    "location": <location>,
    "maxSpots": <number of spots>,
    "date": <date>,
    "image": <image>
}
*/
app.post('/event-dashboard', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    host: req.body.host,
    location: req.body.location,
    maxSpots: req.body.maxSpots,
    date: req.body.date,
    attendees: [],
    image: req.body.image
  });

  try {
    const newEvent = await event.save();
    res.send(newEvent);
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send('Internal server error');
    } else {
      log(error);
      res.status(400).send('Bad request');
    }
  }
});

// Route for removing an event.
app.delete(
  '/event-dashboard/:eventID',
  mongoChecker,
  authenticate,
  async (req, res) => {
    const { eventID } = req.params;
    if (!ObjectID.isValid(eventID)) {
      res.status(404).send('Resource not found');
      return;
    }

    try {
      const event = await Event.findByIdAndRemove(eventID);
      if (!event) {
        res.status(404).send('Resource not found');
      } else {
        res.send(event);
      }
    } catch (error) {
      log(error);
      res.status(500).send('Internal server error');
    }
  },
);

// Route for getting all events.
app.get('/event-dashboard', async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    log(error);
    res.status(500).send('Internal server error');
  }
});

// Route for getting one event.
app.get('/event-dashboard/:eventID', async (req, res) => {
  const { eventID } = req.params;
  if (!ObjectID.isValid(eventID)) {
    res.status(404).send('Resource not found');
    return;
  }

  try {
    const event = await Event.findById(eventID);
    if (!event) {
      res.status(404).send('Resource not found');
    } else {
      res.send(event);
    }
  } catch (error) {
    log(error);
    res.status(500).send('Internal server error');
  }
});

// Route for editing an event.
/* 
Request body expects, for example:
[
  { "op": "replace", "path": "/description", "value": "New Description" },
  { "op": "replace", "path": "/maxSpots", "value": 5 },
  ...
]
*/
app.patch('/event-dashboard/:eventID', async (req, res) => {
  const { eventID } = req.params;
  if (!ObjectID.isValid(eventID)) {
    res.status(404).send('Resource not found');
    return;
  }
  try {
    const event = await Event.findOneAndUpdate(
      { _id: eventID },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true, useFindAndModify: false },
    );

    if (!event) {
      res.status(404).send();
    } else {
      res.send({
        event,
      });
    }
  } catch (error) {
    log(error);
    res.status(500).send(); // server error, could not delete.
  }
});

// Route for adding an attendee to a particular event.
/* 
Request body expects:
{
	"attendee": <attendee ID>
}
*/
app.post('/event-dashboard/:eventID/attend', async (req, res) => {
  const { eventID } = req.params;
  if (!ObjectID.isValid(eventID)) {
    res.status(404).send('Resource not found');
    return;
  }

  try {
    const event = await Event.findById(eventID);
    if (!event) {
      res.status(404).send('Resource not found');
    } else {
      event.attendees.push(req.body.attendee);
      const newEvent = await event.save();
      res.send({
        event: newEvent,
      });
    }
  } catch (error) {
    log(error);
    res.status(400).send('Bad request');
  }
});

// Route for removing an attendee from a particular event.
/* 
Request body expects:
{
	"attendee": <attendee>
}
*/
app.delete('/event-dashboard/:eventID/unattend', async (req, res) => {
  const { eventID } = req.params;
  if (!ObjectID.isValid(eventID)) {
    res.status(404).send('Resource not found');
    return;
  }

  try {
    const event = await Event.findById(eventID);
    if (!event) {
      res.status(404).send('Resource not found');
    } else {
      const index = event.attendees.indexOf(req.body.attendee);
      event.attendees.splice(index, 1);
      const newEvent = await event.save();
      res.send({
        event: newEvent,
      });
    }
  } catch (error) {
    log(error);
    res.status(400).send('Bad request');
  }
});

/** * Webpage routes below ********************************* */
// Serve the build
app.use(express.static(`${__dirname}/../client/build`));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

/** ********************************************** */
// Express server listening...
const port = process.env.PORT || 5001;
app.listen(port, () => {
  log(`Listening on port localhost:${port}...`);
});
