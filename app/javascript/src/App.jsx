import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import { getFromLocalStorage } from "utils/storage";

import Dashboard from "./components/Dashboard";
import CreatePost from "./components/Posts/Create";
import EditPost from "./components/Posts/Edit";
import Show from "./components/Posts/Show";
import UserPosts from "./components/UserPosts";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <Route exact component={Show} path="/posts/:slug/show" />
        <Route exact component={CreatePost} path="/posts/create" />
        <Route exact component={EditPost} path="/posts/:slug/edit" />
        <Route exact component={UserPosts} path="/posts/user" />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
