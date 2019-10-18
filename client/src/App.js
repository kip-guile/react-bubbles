import React, { useState } from "react";
import {Route, NavLink, withRouter, Redirect } from "react-router-dom";
import BubblePage from './components/BubblePage';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Route exact path="/" component={Login} />
    //     {/* 
    //       Build a PrivateRoute component that will 
    //       display BubblePage when you're authenticated 
    //     */}
    //   </div>
    // </Router>

    <div>
    <div>
    <nav>
      <span>
          <NavLink exact to='/'>Bubbles</NavLink>
          <NavLink to='/login'>Login</NavLink>
      </span>
    </nav>
    </div>


    <div className="App">
    <Route
        exact path = '/'
        render= {props => protectedRoute(BubblePage, props)}
      />

      <Route path="/login"
        render={props => <Login {...props}/>}
      />
      {/* 
        Build a PrivateRoute component that will 
        display BubblePage when you're authenticated 
      */}
    </div>
  </div>

  );
}

function protectedRoute(Component, props) {
  if (localStorage.getItem('token')){
      return <Component {...props}/>;
  }
  return <Redirect to='login' />;
}

export default withRouter(App);
