import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Mock from './users/Mock'
export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/users/1/10" className="navbar-brand">Users</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">Create User</Link>
                        </li>
                        <li>
                            <Mock/>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}