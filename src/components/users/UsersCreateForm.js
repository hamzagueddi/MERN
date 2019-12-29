import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class UserCreate extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeNews = this.onChangeNews.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            gender: 'male',
            dob: new Date(),
            news: '',
            email: '',
            photo: ''

        }
    }



    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeNews(e) {
        this.setState({
            news: e.target.checked
        });
    }
    onChangePhoto(e) {
        this.setState({
            photo: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            dob: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        var photo = this.state.photo;
        // if (!photo) photo = null;
        if(photo == '') photo = null;
        const user = {
            username: this.state.username,
            gender: this.state.gender,
            dob: this.state.dob,
            news: this.state.news,
            email: this.state.email,
            photo: photo
        };
        console.log(user);
        axios.post('http://localhost:5000/users/', user)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender: </label>
                        <select ref="userInput"
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeGender}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>news: </label>
                        <input type="checkbox"
                            className="form-control"
                            onChange={this.onChangeNews}
                        />
                    </div>
                    <div className="form-group">
                        <label>email: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Photo link: </label>
                        <input type="text"

                            className="form-control"
                            value={this.state.photo}
                            onChange={this.onChangePhoto}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date dob: </label>
                        <DatePicker
                            selected={this.state.dob}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}