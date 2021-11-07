import React, { useState } from 'react';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import { useForm } from '../../utils/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';

const InputBox = ({ label, value, handleChange }) => (
  <TextField
    id="outlined-name"
    margin="dense"
    label={label}
    value={value}
    onChange={(e) => handleChange(e, label)}
  />
);

const Auth = ({ isLoggedIn, login, register }) => {
  const history = useHistory();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [input, setInput] = useState({
    isAdmin: false,
  });

  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        val: '',
        helperText: '',
        isValid: false,
      },
      password: {
        val: '',
        helperText: '',
        isValid: false,
      },
    },
    false,
  );

  const switchModeHandler = () => {
    setFormData(
      {
        ...formState.inputs,
      },
      formState.inputs.username.isValid && formState.inputs.password.isValid,
    );
    setIsLoginMode(!isLoginMode);
  };

  const toggleAdminInput = () => {
    setInput({ ...input, isAdmin: !input.isAdmin });
  };

  const handleFormSubmit = () => {
    const { isAdmin } = input;
    const { username, password } = formState.inputs;
    if (isLoginMode) {
      login(username.val, password.val);
    } else {
      register(username.val, password.val, isAdmin);
    }
  };

  if (isLoggedIn) {
    history.goBack();
  }

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
            gap: 10px;
          `}
        >
          <Input
            id="username"
            label="User name"
            helperText="Username must be atleast 5 characters."
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            helperText="Please enter a password of atleast 8 characters."
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
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
              disabled={!formState.isValid}
            >
              {isLoginMode ? 'Login' : 'Signup'}
            </Button>
            <Button
              variant="outlined"
              onClick={switchModeHandler}
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

export default Auth;
