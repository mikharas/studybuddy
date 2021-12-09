Our application, StudyBuddy, aims to connect students who don't want to be alone in their stuggle for academic greatness.

- [Heroku Deployed Link:](#heroku-deployed-link)
- [How to use (for development purposes):](#how-to-use-for-development-purposes)
- [Features:](#features)
- [- Admins currently have the ability to edit any event they wish (while normal users can only edit if they are the host)](#--admins-currently-have-the-ability-to-edit-any-event-they-wish-while-normal-users-can-only-edit-if-they-are-the-host)
- [Roles of Users](#roles-of-users)
- [Third Party Libraries Used:](#third-party-libraries-used)
- [Routes Overview](#routes-overview)
- [- /event-dashboard/:eventid DELETE/GET/PATCH](#--event-dashboardeventid-deletegetpatch)
- [(OLD!) Detailed Features Instructions:](#old-detailed-features-instructions)

========================================

# Heroku Deployed Link: 
https://secure-badlands-91737.herokuapp.com/

========================================
# How to use (for development purposes):
First clone the our repo onto your local machine
then run the following commands in the terminal:

    yarn install

    node server.js

    yarn start

Then you should be able to navigate to https://localhost:3000 to see our application

========================================

# Features:
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

Usage of the features should be self explanatory but for more detailed instructions
see below.

- Admins currently have the ability to edit any event they wish (while normal users can only edit if they are the host)
========================================

# Roles of Users
The role of the users is to able to host or attend any events that they find interesting nearby. They would preform the features of the websites as follows:

- Login System
  - They would need to login in order to make their own profile to attend or create events (although you can still look at events if you aren't logged in)
- Event Navigation
  - Should they want to find more details of the event they can simply click on any event they find interesting and find out more detailed information
- Event Creation
  - Should they desire to create an event of their own they can click the "create event" button on the navigation bar and fill in the details to create their own event
- Event Editing
  - When looking at the event details, if you are the host or an Admin you can edit the details of the event at your leisure (in case plans change)
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

# Third Party Libraries Used:
- emotion
- material ui
- react-router-dom
- redux
- formik
- google-map-react
- yup
For detailed list see "package.json" file

========================================
# Routes Overview
- /login POST
- /logout GET
- /check-session GET
- /user POST
- /profile/:userid DELETE/GET/PATCH
- /users GET
- /profile/:follower/:following POST/DELETE
- /event-dashboard POST/GET
- /event-dashboard/:eventid DELETE/GET/PATCH
========================================

# (OLD!) Detailed Features Instructions:
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
