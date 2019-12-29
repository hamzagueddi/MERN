import React, { Component } from 'react';
import axios from 'axios';

export default class ShowUser extends Component {
    constructor(props) {
        super(props);
        this.disable = this.disable.bind(this);
        this.onClickAddUsers = this.onClickAddUsers.bind(this);
        this.state = {
            countUsers:0
        }
    
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/count')
            .then(response => {
                this.setState({
                    countUsers:response.data
                })
                console.log(this.state)
            })
            .catch(function (error) {
                console.log(error);
            })    
        }
    

      onClickAddUsers(){
          const promise = fetch('https://randomuser.me/api/?results=' + (100 - this.state.countUsers)).then(res => res.json()).then(myjson => {
              myjson.results.forEach(user => {
                  let newUser = {
                            username:user.login.username,
                            gender:user.gender,
                            dob:user.dob.date,
                            email:user.email,
                            photo:user.picture.medium,
                            news: Math.random() > 0.5 ? true:false
                  }
                  console.log(newUser);
                  axios.post("http://localhost:5000/users/", newUser)
                      .then(res => console.log(res.data))
                      .catch((error) => console.log(error));
              })

          });
          Promise.all([promise]).then(() => {
                window.location.href = "/";
          }).catch(err => console.log(err));
      } 
    disable(){
        let element = document.querySelector("#fetchUsersButton");
    if(this.state.countUsers == 100) element.disabled = true;
    }
    render() {
        return (
            <div>
        <div className="row m-1">
                    <span className="btn btn-light mr-1"> <span id="countusers">{this.state.countUsers}</span> users </span>
                    <button id="fetchUsersButton" className="btn btn-info text-light" onLoad={this.disable()} onClick={this.onClickAddUsers} >Fetch {100 - this.state.countUsers} more users from RandomUser</button>    
        </div>
            </div>

        )
    }
}