import React from "react";
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const onLogin = ({username, password}) => {
    axios.post('http://localhost:5000/api/login', {username, password})
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            props.history.push('/')
        })
        .catch(error => {
            localStorage.clear();
            alert(error.message);
        });
  };

  var styles2 = {
    margin: '5px',
    width: '200px',
    height: '50px',
    borderRadius: '10px',
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
              <div>
                <Field style={styles2} name='username' type="text" placeholder='username' />
              </div>
              <div>
                <Field style={styles2} name='password' type="text" placeholder='password' />
              </div>
               <div>
                <input type='submit' />
              </div>
            </Form>
        )}
      />
    </>
  );
};

export default Login;
