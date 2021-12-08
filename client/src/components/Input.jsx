import React, { useReducer, useEffect } from 'react';
import { TextField } from '@mui/material';
import { validate } from '../utils/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        val: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const {
    initialValue,
    initialValidity,
    helperText,
    id,
    label,
    onInput,
    type,
    validators,
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    val: initialValue || '',
    isValid: initialValidity || false,
    isTouched: false,
  });

  useEffect(() => {
    onInput(id, inputState.val, inputState.isValid);
  }, [id, inputState.val, inputState.isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  return (
    <TextField
      cx={{
        width: '70%',
        margin: '5px 0',
      }}
      id={id}
      label={label}
      type={type}
      error={inputState.isTouched && !inputState.isValid}
      helperText={inputState.isTouched && !inputState.isValid && helperText}
      variant="outlined"
      value={inputState.val}
      onChange={changeHandler}
      onBlur={touchHandler}
    />
  );
};

export default Input;
