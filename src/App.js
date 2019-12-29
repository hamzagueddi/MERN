import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar"
import UsersList from "./components/users/UsersTable"
import UserUpdate from "./components/users/UsersUpdateForm"
import UserCreate from "./components/users/UsersCreateForm"
import UserShow from "./components/users/UserShow"
function App() {
    
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route exact path="/"  component={UsersList} />
        <Route exact path="/edit/:id"  component={UserUpdate} />
        <Route exact path="/add"  component={UserCreate}/>
        <Route exact path="/info/:id"  component={UserShow} />
        <Route exact path="/users/:page/:size"  component={UsersList} />
      </div>
    </Router>
  )
}
export default App;