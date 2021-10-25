import React from 'react';
import {
  EventDashboard,
  EventsExplorer,
  HomePage,
  Login,
  StudentDashboard,
} from './views';
import './App.css';

function App() {
  return (
    <div className="App">
      <EventsExplorer />
      <EventDashboard />
      <HomePage />
      <Login />
      <StudentDashboard />
    </div>
  );
}

export default App;
