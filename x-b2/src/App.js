import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import { PrivateRoute, ProvideAuth } from "./Auth";
import { HomePage } from "./HomePage";
import { UserLogin } from "./UserLogin";
import { UserRegistration } from "./UserRegistration";


function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={UserLogin} />
            <Route path="/signup" component={UserRegistration} />
            {/* <Route path="/home" component={HomePage} /> */}
            <PrivateRoute path="/home">
              <HomePage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
