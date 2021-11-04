import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  EventDashboard,
  EventsExplorer,
  HomePage,
  Auth,
  StudentDashboard,
} from './views';
import './App.css';
import Navbar from './components/navbar/index';
import theme from './theme';

function App({ isLoggedIn }) {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <div className="App">
          {isLoggedIn ? (
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/" component={() => <HomePage />} />
                <Route
                  exact
                  path="/EventDashboard/:eventID"
                  render={({ match }) => (
                    <EventDashboard eventID={match.params.eventID} />
                  )}
                />
                <Route
                  exact
                  path="/Profile"
                  component={() => <StudentDashboard />}
                />
              </Switch>
            </Router>
          ) : (
            <Auth />
          )}
        </div>
      </ThemeProvider>
    </CssBaseline>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(App);
