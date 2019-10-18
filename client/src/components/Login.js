import React from "react";
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const onLogin = ({username, password}) => {
    axios.post('http://localhost:5000/api/login', {username, password})
        .then(res => {
          debugger
            localStorage.setItem('token', res.data.payload);
            props.history.push('/')
        })
        .catch(error => {
            localStorage.clear();
            alert(error.message);
        });
  };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={onLogin}
        render={() => (
            <Form>
                <Field name='username' type="text" placeholder='username' />
                <Field name='password' type="text" placeholder='password' />
                <input type='submit' />
            </Form>
        )}
      />
    </>
  );
};

export default Login;
