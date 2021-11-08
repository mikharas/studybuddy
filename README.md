Our application, StudyBuddy, aims to connect students who don't want to be alone in their stuggle for academic greatness.

========================================

How to use:
First clone the our repo onto your local machine
then run the following commands in the terminal:

    yarn install

    yarn start

Then you should be able to navigate to https://localhost:3000 to see our application

========================================


Login-Credentials:
You may login by clicking the button on the top right.
The currently configured login credentials are {admin;admin} and {user;user}
but you may create your own if you wish.

========================================

Features:
Our current features include:
- Login System
- Event Navigation
- Event Creation
- Event Editing
- Event Map/location navigation
- Event Joining/Leaving
- Profile Editing
- Profile Following/Unfollowing/Viewing

Usage of the features should be self explanatory but for more detailed instructions
see below.

Admins currently have the ability to edit/create their special
admin event meetings, edit any user event, view other users and ban users.
The ban users is not fully implemented as it requires backend support.

========================================

IMPORTANT:
As our backend is not yet fully constructed, we have a 
save state function in the frontend that keeps track of the user.
As such refreshing the page will remove this state needing
the user to log back in. The other features that still are incomplete
due to lack of backend support are as follows:
    - Event Creation: image uploading
    - Google Map API: calls backend

========================================

Third Party Libraries Used:
- emotion
- material ui
- react-router-dom
- redux
- formik
- google-map-react
- yup
For detailed list see "package.json" file

========================================

Detailed Features Instructions:
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
    2. Click the attend button located to the right of the info
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
