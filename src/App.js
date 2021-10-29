import React, { useState } from 'react';
import AuthContext from './authContext';
import {
  EventDashboard,
  EventsExplorer,
  HomePage,
  Login,
  StudentDashboard,
} from './views';
import './App.css';

function App() {
  const [auth, setAuth] = useState({
    userId: null,
    isAdmin: false,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <div className="App">
        {auth.userId ? (
          <>
            <HomePage />
            <EventsExplorer />
          </>
        ) : (
          <Login />
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
