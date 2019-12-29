import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class UserShow extends Component {
    constructor(props) {
        super(props);
        this.check = this.check.bind(this);
        this.state = {
            username: '',
            gender: '',
            dob: new Date(),
            news: '',
            email: '',
            photo: ''
     
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    gender: response.data.gender,
                    dob: new Date(response.data.dob),
                    news: response.data.news,
                    email: response.data.email,
                    photo: response.data.photo == null ? "": response.data.photo
                })
                console.log(this.state)
            })
            .catch(function (error) {
                console.log(error);
            })

    }

  
    check(){
        var checkbox = document.querySelector("#news");
        if(this.state.news == true) checkbox.checked = "aa";
    }


    render() {
        return (
            <div className="text-center">
                <h3>UserInfo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <span className="font-weight-bolder">{this.state.username}</span>
                    </div>
                    <div className="form-group">
                        <label>Gender: </label>
                        <span className="font-weight-bolder">{this.state.gender}</span>
                    </div>
                    <div className="form-group">
                        <label>news: </label>
                        <span className={this.state.news == true ? "text-success font-weight-bold":"text-danger font-weight-bold"}>{this.state.news == true ? "Yes":"No"}</span>
                    </div>
                    <div className="form-group">
                        <label>email: </label>
                        <span className="font-weight-bolder">{this.state.email}</span>
                       
                    </div>
                    <div className="form-group">
                        <label>Photo : </label>
                        <img src={this.state.photo == null ? "/assets/avatar.png":this.state.photo} alt="userpicture" className="w-20"/>
                    </div>
                    <div className="form-group">
                        <label>Date of Birth: </label>
                        <span className="font-weight-bolder">  {new Date(this.state.dob).getDay()}/
                        {new Date(this.state.dob).getMonth()}/
                        {new Date(this.state.dob).getFullYear()}</span>
                      
                    </div>


             
                </form>
         
            </div>
            
        )
    }
}