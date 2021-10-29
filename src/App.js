import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
  EventDashboard,
  EventsExplorer,
  HomePage,
  Auth,
  StudentDashboard,
} from './views';
import './App.css';
import Navbar from './components/navbar/index';

function App({ isLoggedIn }) {
  return (
    <div className="App">
      {isLoggedIn ? (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={() => <HomePage />} />
            <Route
              exact
              path="/EventDashboard"
              component={() => <EventDashboard />}
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
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(App);
