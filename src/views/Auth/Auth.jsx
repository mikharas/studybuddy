import React, { useState } from 'react';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { css } from '@emotion/css';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup
    .string('Enter a username')
    .min(5, 'Username should be of minimum 5 characters length')
    .required('Username is required'),
  password: yup
    .string('Enter a password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

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

  const handleFormSubmit = (username, password, isAdmin) => {
    if (isLoginMode) {
      login(username.val, password.val);
    } else {
      register(username.val, password.val, isAdmin);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      isAdmin: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const { username, password, isAdmin } = values;
      handleFormSubmit(username, password, isAdmin);
    },
  });

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
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="username"
            name="username"
            margin="dense"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            name="password"
            margin="dense"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type="password"
          />
          {!isLoginMode && (
            <FormControlLabel
              control={
                <Checkbox
                  id="isAdmin"
                  value={formik.values.isAdmin}
                  onClick={formik.handleChange}
                />
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
              type="submit"
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

export default Auth;
