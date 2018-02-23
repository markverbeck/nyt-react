import React from 'react';
import{BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";

const App = () =>
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/articles" component={Home} />
      <Route exact path="/saved" component={Saved} />
    </Switch>
  </Router>

export default App;
