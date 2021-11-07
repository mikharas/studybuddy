Our application, StudyBuddy, aims to connect students who don't want to be alone in their stuggle for academic greatness.

How to use:
First clone the our repo onto your local machine
then run the following commands in the terminal:

    yarn install

    yarn start

Then you should be able to navigate to https://localhost:3000 to see our application


Login-Credentials:
You may login by clicking the button on the top right.
The currently configured login credentials are {admin;admin} and {user;user}
but you may create your own if you wish.

Features:
Our current features include:
- Event Navigation
- Event creation
- Event Editing
- Event Map/location navigation
- Event joining/leaving
- Profile editing

Admins currently have the ability to edit their special
admin event meetings, more features for them coming soon.

IMPORTANT:
As our backend is not yet fully constructed, we have a 
save state function in the frontend that keeps track of the user.
As such refreshing the page will remove this state needing
the user to log back in.

Third Party Libraries Used:
    "@babel/core": "^7.15.8",
    "cz-conventional-changelog": "^3.3.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-import": "^2.25.2",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-react": "^7.26.1",
    "eslint-plugin-react-hooks": "^4.2.0",
    "husky": "^7.0.4",
    "lint-staged": "^11.2.4",
    "override-material-ui-css": "^1.1.4",
    "prettier": "^2.4.1"
For detailed list see package.json