import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import CreatePost from "./components/Posts/Create";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={CreatePost} path="/posts/create" />
      <Route exact component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;
