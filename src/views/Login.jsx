import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { css } from '@emotion/css';

const InputBox = ({ label, value, handleChange }) => (
  <TextField
    id="outlined-name"
    margin="dense"
    label={label}
    value={value}
    onChange={(e) => handleChange(e, label)}
  />
);

const Login = ({ isLoggedIn }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [users, setUsers] = useState([
    {
      username: 'sarah',
      password: 'sarah',
    },
  ]);
  const [input, setInput] = useState([
    { name: 'Username', value: 'sds' },
    { name: 'Password', value: 'asd' },
  ]);

  const handleChange = (e, name) =>
    setInput(
      input.map((item) => {
        if (item.name === name) {
          item.value = e.target.value;
        }
        return item;
      }),
    );

  const isValidUser = () => {
    const usernameInput = input.find((item) => item.name === 'Username');
    const passwordInput = input.find((item) => item.name === 'Password');
    const user = users.find((u) => u.username === usernameInput.value);
    if (!user) return false;
    return user.password === passwordInput.value;
  };

  const authenticateUser = () => {
    if (isValidUser()) {
      console.log('valid!');
    } else {
      console.log('invalid!');
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
          {input.map((item) => (
            <InputBox
              label={item.name}
              value={item.value}
              handleChange={handleChange}
            />
          ))}
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
              onClick={authenticateUser}
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
