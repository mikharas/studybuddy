import React, { useState } from 'react';
import {
  EventDashboard,
  EventsExplorer,
  HomePage,
  Login,
  StudentDashboard,
} from './views';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <HomePage />
          <EventsExplorer />
        </>
      ) : (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
