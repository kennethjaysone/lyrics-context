import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { Provider } from "./context";

import Navbar from "./components/layouts/Navbar";
import Index from "./components/layouts/Index";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
