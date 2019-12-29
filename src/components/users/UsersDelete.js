import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit,faEye } from '@fortawesome/free-solid-svg-icons'
export default class UsersDelete extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = { user: props.user };

    }
    componentDidMount(){

    }
    deleteUser() {
        axios.delete('http://localhost:5000/users/' + this.state.user._id)
            .then(res => console.log(res.data));
    window.location = "/users/1/10";
    }
    render() {
        return (
            <tr>
                <td>{this.state.user.username}</td>
                <td>{this.state.user.gender}</td>
                <td>{this.state.user.dob.substring(0,10)}</td>
                <td>{this.state.user.news == true ? "Yes" : "No"}</td>
                <td>{this.state.user.email}</td>
                <td><img src={this.state.user.photo == null ? "/assets/avatar.png" : this.state.user.photo} alt="nullpic" width="60"/></td>
                <td>
                    <a href={"/edit/" + this.state.user._id + "/"} ><FontAwesomeIcon icon={faEdit} /></a> | <a href="#" onClick={() => { this.deleteUser() }}><FontAwesomeIcon icon={faTrash} /></a> | 
                     <a href={"/info/" + this.state.user._id}><FontAwesomeIcon icon={faEye}/></a>
                </td>
            </tr>
        )
    }
}