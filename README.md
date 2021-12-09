Our application, StudyBuddy, aims to connect students who don't want to be alone in their stuggle for academic greatness.

Features added:
- event filtering
- detailed event location creation
- detailed event time creation
- image uploading
- map updates (now shows actual locations rather than fixed locations although there is a limit)
- profile editing
- full backend implmentation

- [1. Heroku Deployed Link:](#1-heroku-deployed-link)
- [2. How to use (for development purposes):](#2-how-to-use-for-development-purposes)
- [3. Features:](#3-features)
- [4. Roles of Users/Instructions to use](#4-roles-of-usersinstructions-to-use)
- [5. Third Party Libraries Used:](#5-third-party-libraries-used)
- [6. Routes Overview](#6-routes-overview)
- [7. (OLD! DO NOT READ) Detailed Features Instructions:](#7-old-do-not-read-detailed-features-instructions)

========================================

# 1. Heroku Deployed Link: 

https://studybuddy309.herokuapp.com/

========================================
# 2. How to use (for development purposes):

First clone the our repo onto your local machine
then run the following commands in the terminal: (in this order)

    cd client

    yarn install
    
    yarn start

    yarn install

    node server.js

Then you should be able to navigate to https://localhost:3000 to see our application

========================================

# 3. Features:

Our current features include:
- Login System
- Event Navigation
- Event Creation
- Event Editing
- Event Map/location navigation
- Event Filtering (by time or keyword)
- Event Attending/Event Leaving
- Profile Editing
- Profile Following/Unfollowing/Viewing
- Admins currently have the ability to edit any event they wish (while normal users can only edit if they are the host)
   
Usage of the features should be self explanatory but for more detailed instructions
see below.

========================================

# 4. Roles of Users/Instructions to use

The role of the users is to able to host or attend any events that they find interesting nearby. 

Note that since Admin and Users have very similar ways of interacting we have included them in the same instructions (we also specified what is different about the admin).

They would preform the features of the websites as follows:

- Login System
  - They would need to login in order to make their own profile to attend or create events (although you can still look at events if you aren't logged in)
- Event Navigation
  - Should they want to find more details of the event they can simply click on any event they find interesting and find out more detailed information
- Event Creation
  - Should they desire to create an event of their own they can click the "create event" button on the navigation bar and fill in the details to create their own event
- (ADMIN DIFFERENCE) Event Editing
  - When looking at the event details, if you are the host (i.e. the person who made the event) or an Admin you can edit the details of the event at your leisure (in case plans change)
- Event Map/location navigation
  - For the more location conscious individuals they are able to click on the event explorer tab in the navbar to see a map of the events nearby
  - The map has zoom in features as well feel free to try it out
  - Should they desire to know the exact google location they can go to the event details by clicking on any event and click the location on the right to open up a new link to the google address
- Event Filtering (by time or keyword)
  - Should they want to find a specific event they need look no further than the event explorer, which can filter by time or keyword
- Event Attending/Event Leaving
  - If they find an event they wish to attend, they can just click the attend button in the event details page (so long as its not their own)
- Profile Editing
  - Should they want to add more information to their profile they can click the profile button in the nav bar, and click the edit profile button on the far right to change their information
- Profile Following/Unfollowing/Viewing
  - Should they like a particular individual's events they have the option to view their profile and event follow them
  - To view their profile simply click where their profile may show up (i.e. the event details page)

========================================

# 5. Third Party Libraries Used:

- emotion
- material ui
- react-router-dom
- redux
- formik
- google-map-react
- yup
- bcryptjs
- axios
- cors
- mongodb
- express
- mongoose

For detailed list see the two "package.json" files (there is another one in client folder)

========================================
# 6. Routes Overview

Note: all returns are in JSON unless specified otherwise

- https://studybuddy309.herokuapp.com/login POST
  - expects: { 
        "username": <username>
        "password": <password> 
    } 
  - returns: the currentUser's username and whether they are admin or not
  - usage: to log people in
- https://studybuddy309.herokuapp.com/logout GET
  - expects: N/A
  - returns: no response, but it does log you out
  - usage: to log people out
- https://studybuddy309.herokuapp.com/check-session GET
  - expects: N/A
  - returns: the username of the currentUser if you are logged in, unauthorized if you are not
  - usage: checks the current user and session
- https://studybuddy309.herokuapp.com/user POST
  - expects: {
      "username": <username>,
      "password": <password>,
      "isAdmin": <true or false>,
      "profileImage": <image> 
    }
  - returns: full detail JSON about the created user
  - usage: to create new users
- https://studybuddy309.herokuapp.com/profile/:userid GET
  - expects: no body but for :userid to be a valid username
  - returns: full detail JSON about the user
  - usage: to get user information
- https://studybuddy309.herokuapp.com/profile/:userid PATCH
  - expects: {
      "contact": <contact details>
      "fullName": <fullName>
      "school": <userSchool>
    }
  - returns: full updated JSON detail about the user
  - usage: to edit user information
- https://studybuddy309.herokuapp.com/users GET
  - expects: N/A
  - returns: all users in our database
  - usage: checking login information as well as event attendance, following, and other important information 
- https://studybuddy309.herokuapp.com/profile/:follower/:following POST
  - expects: no body but :follower and :following to be valid users
  - returns: updated user info about the follower
  - usage: for following people
- https://studybuddy309.herokuapp.com/profile/:follower/:following DELETE
  - expects: no body but :follower and :following to be valid users
  - returns: updated user info about the follower
  - usage: for unfollowing people
- https://studybuddy309.herokuapp.com/event-dashboard POST
  - expects: {
	  "title": <title>,
    "description": <description>,
    "location": <location>,
    "maxSpots": <number of spots>,
    "date": <date>,
    "image": <image>
}
  note: our image uses a custom image database, for postman, try to create the event without the image
    you can see how it works via inspect element -> network -> payload, when creating an event

  - returns: full updated JSON detail about the event
  - usage: to create events
- https://studybuddy309.herokuapp.com/event-dashboard GET
  - expects: N/A
  - returns: all event information in database
  - usage: querying events for filtering and other important tasks
- https://studybuddy309.herokuapp.com/event-dashboard/:eventid GET
  - expects: no body but :eventid to be a valid eventid
  - returns: full details about the event
  - usage: displaying events
- https://studybuddy309.herokuapp.com/event-dashboard/:eventID PATCH
  - expects: expects: {
    "title": <title>,
    "description": <description>,
    "host": <host>
    "location": <location>,
    "maxSpots": <number of spots>,
    "date": <date>,
    }
  - returns: full updated event information
  - usage: editing event/updating event information
- https://studybuddy309.herokuapp.com/event-dashboard/:eventid DELETE
  - expects: no body but :eventid to be a valid eventid
  - returns: full details about the event deleted
  - usage: deleting events
- https://studybuddy309.herokuapp.com/event-dashboard/:eventID/attend POST
  - expects:{
    "attendee": <attendee ID>
  }
  - returns: full details about the updated event
  - usage: for users attending events
- https://studybuddy309.herokuapp.com/event-dashboard/:eventID/unattend DELETE
  - expects:{
    "attendee": <attendee ID>
  }
  - returns: full details about the updated event
  - usage: for users unattending events

  
========================================



# 7. (OLD! DO NOT READ) Detailed Features Instructions:

- Login System
    1. Click the Login Button on the top right
    2. You may sign in with {admin:admin} or {user:user}
        - if you wish to create your own account click the switch to sign up button
        - You may create a user or admin account (admin account creation only for demonstration purposes)
        - Note: do not refresh as that will delete the state
- Event Navigation
    1. Click the "Event Explorer" tab in the navigation bar to see all events
    2. You may click on an event to view its details
- Event Creation
    1. Once logged in click the "Create Event" tab in the navigation bar
    2. You may create an event by entering all the details and clicking the "Create Event" button 
    in the middle of the page
        - Image uploading relies on backend and has not been fully implemented
- Event Editing
    1. Navigate to an event you currently host (via the event explorer or the homepage)
        - if you are an admin you may edit any event
    2. Click the "edit event" button located under the banner
    3. Now you may edit all the details of the event
    4. Click the "done" button once you're done
- Event Map/location navigation
    1. Navigate to the event explorer
    2. You may click on any of the markers to see its event details
        - You can also hover to see basic info about the event
    3. Should you attend any events the marker will change color to green from black
    4. Should you host any events the marker will be red
- Event Joining/Leaving
    1. Navigate to the details of any event (via event explorer or the homepage)
    2. Click the attend button located under the banner to the right
        - You may see your upcoming events in the homepage
- Profile Editing
    1. Once logged in click the portrait icon located in the nav bar to the left of the logout button
    2. Click the edit button right below the logout button to edit your information
    3. Once finished Click the save button
        - If you dont wish to save you may click the cancel button
        - The delete account button has not been fully implemented yet
- Profile Following/Viewing
    1. For the Following demonstration navigate to the event explorer
    2. Locate the "late night hussle" event
    3. scroll down to the attendee's list
    4. click on user2, notice you will now be able to see their profile
    5. click the follow button on the top right
    6. You will now be able to see them in the following list on your profile
    7. If you wish to unfollow, click the unfollow button in the top right
        - You can navigate to anyone you follow via the following list on your profile
    8. You will now see that the user no longer shows up under following
