import React, { useState, useContext } from 'react';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { css } from '@emotion/css';
import authContext from '../contexts/authContext';

const InputBox = ({ label, value, handleChange }) => (
  <TextField
    id="outlined-name"
    margin="dense"
    label={label}
    value={value}
    onChange={(e) => handleChange(e, label)}
  />
);

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { setAuth } = useContext(authContext);
  const [users, setUsers] = useState([
    {
      username: 'sarah',
      password: 'sarah',
      isAdmin: true,
    },
  ]);
  const [input, setInput] = useState({
    username: '',
    password: '',
    isAdmin: false,
  });

  const addUser = (username, password, isAdmin) => {
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
      alert('Username taken');
    } else {
      setUsers([
        ...users,
        {
          username,
          password,
          isAdmin,
        },
      ]);
      alert('Successfully created user, please log in!');
    }
  };

  const authenticateUser = (username, password) => {
    const user = users.find((u) => u.username === username);
    if (!user) {
      alert('no such user');
    } else if (user.password !== password) {
      alert('incorrect password');
    } else {
      alert('successfully logged in!');
      setAuth({
        userId: user.username,
        isAdmin: user.isAdmin,
      });
    }
  };

  const changeUsernameInput = (e) =>
    setInput({ ...input, username: e.target.value });

  const changePasswordInput = (e) =>
    setInput({ ...input, password: e.target.value });

  const toggleAdminInput = () => {
    setInput({ ...input, isAdmin: !input.isAdmin });
  };

  const handleFormSubmit = () => {
    const { username, password, admin } = input;

    if (isLoginMode) {
      authenticateUser(username, password);
    } else {
      addUser(username, password, admin);
    }
  };

  return (
    <div
      className={css`
        width: 100%;
        height: calc(100vh - 50px);
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        className={css`
          border: solid 1px grey;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          margin: 50px;
          padding: 50px;
          width: 500px;
        `}
      >
        <h1 className="title">{isLoginMode ? 'Welcome back!' : 'New user!'}</h1>
        <form
          className={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <InputBox
            label="Username"
            value={input.username}
            handleChange={changeUsernameInput}
          />
          <InputBox
            label="Password"
            value={input.password}
            handleChange={changePasswordInput}
          />
          {!isLoginMode && (
            <FormControlLabel
              control={
                <Checkbox value={input.isAdmin} onClick={toggleAdminInput} />
              }
              label="Admin"
            />
          )}
          <div
            className={css`
              display: flex;
              gap: 10px;
              margin-top: 30px;
              justify-content: center;
            `}
          >
            <Button
              className={css`
                box-shadow: none;
              `}
              variant="contained"
              onClick={handleFormSubmit}
            >
              {isLoginMode ? 'Login' : 'Signup'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsLoginMode(!isLoginMode)}
              type="Button"
            >
              {`Switch to ${isLoginMode ? 'Sign up' : 'Log in'}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
