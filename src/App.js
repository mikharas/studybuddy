import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import {
  EventDashboard,
  EventsExplorer,
  HomePage,
  Auth,
  StudentDashboard,
} from './views';
import './App.css';
import Navbar from './components/navbar/index';
import NotFound from './views/NotFound';
import theme from './theme';

function App({ isLoggedIn }) {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <div className="App">
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/login" component={() => <Auth />} />
                <Route exact path="/" component={() => <HomePage />} />
                <Route
                  exact
                  path="/events-explorer"
                  component={() => <EventsExplorer />}
                />
                <Route
                  exact
                  path="/event-dashboard/:eventID"
                  render={({ match }) => (
                    <EventDashboard eventID={match.params.eventID} />
                  )}
                />
                <Route
                  exact
                  path="/profile/:userID"
                  render={({ match }) => (
                    <StudentDashboard userID={match.params.userID} />
                  )}
                />
                <Route exact path="/404" component={() => <NotFound />} />
                <Redirect from="*" to="/404" />
              </Switch>
            </Router>
          </div>
        </StylesProvider>
      </ThemeProvider>
    </CssBaseline>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(App);
