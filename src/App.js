import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  EventDashboard,
  EventsExplorer,
  HomePage,
  Auth,
  StudentDashboard,
} from './views';
import './App.css';

function App({ isLoggedIn }) {
  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <HomePage />
          <EventsExplorer />
        </>
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
