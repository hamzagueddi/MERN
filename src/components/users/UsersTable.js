import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UsersDelete from "./UsersDelete";
export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
        this.onClickDob = this.onClickDob.bind(this);
        this.onClickGender = this.onClickGender.bind(this);
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.state = { users: [],pages:[],noPages:1,searchText:'',genderSort:'',dobSort:''};
        console.log(props.match);
    }
    componentDidMount() {
        let searchString = "";
        let searchCount = "";
        let page = this.props.match.params.page;
        let size = this.props.match.params.size;
        let url = this.props.match.url;
        let href = window.location.href;
        if(url=="/"){
            page = 1;
            size = 10;
        }
        if(href.indexOf("?search=") != -1){
            if (href.indexOf("&dob=") != -1 || href.indexOf("&gender=") != -1  )
            searchString = "/username/"+href.substring(href.indexOf("?search=") + 8,href.indexOf("&"));
            else 
            searchString = "/username/"+href.substring(href.indexOf("?search=") + 8,href.length);
            searchCount = searchString;
         
        }
        if (href.indexOf("?dob=") != -1 || href.indexOf("&dob=") != -1){
                // console.log();
            let str = href.substr(href.search(/(\?|&)dob=/), 6);
            if(str.indexOf("-") !=-1) {
                searchString += "/dob/-1";
                this.setState({
                    dobSort:-1
                });
            }
            else{
                searchString += "/dob/1";
                this.setState({
                    dobSort:1
                })
            }
            console.log("dob-->" + str);
        }
        if (href.indexOf("?gender=") != -1 || href.indexOf("&gender=") != -1){
            // console.log();
            let str = href.substr(href.search(/(\?|&)gender=/), 9);
            if(str.indexOf("-") !=-1) {
                searchString += "/gender/-1";
                this.setState({
                    genderSort:-1
                })
            }
            else{
                searchString += "/gender/1";
                this.setState({
                    genderSort:1
                })
            };
            console.log("gender-->" + str);
        }
        console.log("SearchString->" + searchString);
        console.log("searchCount->" + searchCount);
         axios.get('http://localhost:5000/users/' + page + "/" + size + searchString)
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
        
        // axios.get('http://localhost:5000/users/count' )
        axios.get('http://localhost:5000/users/count' + searchCount)
            .then(response => {
                this.setState({ noPages: (Math.ceil(response.data / 10)) });
                console.log("Nopages" + this.state.noPages);
                var tab = [];
                var i;
                for (i = this.state.noPages; i >= 1; i--) {
                    tab.unshift(i);
                    console.log("i" + i);
                }
                console.log(tab);
                this.setState({
                    pages: tab
                })
            })
            .catch((error) => {
                console.log(error);
            })
       
            
    }       
    deleteUser(id) {
        axios.delete('http://localhost:5000/users/' + id)
            .then(res => console.log(res.data));
        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }
    usersList() {
        return this.state.users.map(currentuser => {
            return <UsersDelete user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />;
        })
    }
    onSubmitSearch(e){
        e.preventDefault();
        if(this.state.searchText == '') return;
        console.log(this.state.searchText);
        // let href = window.location.href;
        // console.log(typeof href)
        // if(href.indexOf("?search=") == -1){
        //     if(href.indexOf("?") != -1){
        //         console.log("before->"+ href);
        //         href=href.replace("?","?search="+this.state.searchText + "&");
        //         console.log("after->"+ href);
                
        //     }
        //     else{
        //         href += "?search=" + this.state.searchText;
        //     }
        // }
        // else  
        //      href = href.substring(0, href.indexOf("?search=")) + "?search=" + this.state.searchText;
        //     console.log(href);
        window.location.href = this.props.match.url + "?search=" + this.state.searchText;
        }
    onChangeSearchInput(e){
        this.setState({
            searchText:e.target.value
        });
    }
    onClickDob(){
        let href = window.location.href;
        if(href.indexOf("&dob") != -1 || href.indexOf("?dob")!=-1){
            let t = href.substr(href.search(/(\?|&)dob=/),6);
            // console.log(t);
            console.log("t -->" + t)
            if(t.indexOf("-")!= -1){
                if(href.indexOf("&dob") != -1)
                href = href.replace("&dob=-1","&dob=1");
                else 
                href = href.replace("?dob=-1","?dob=1");
            }
            else {
                
                if(href.indexOf("&dob") != -1)
                href = href.replace("&dob=1","&dob=-1");
                else
                href = href.replace("?dob=1","?dob=-1");
            }
        }
        else {
            if(href.indexOf("?") != -1)
                href +="&dob=1";
            else 
                href +="?dob=1";
        }
        console.log(href);
        window.location.href = href;
    }  
    onClickGender() {
        let href = window.location.href;
        if (href.indexOf("&gender") != -1 || href.indexOf("?gender") != -1) {
            let t = href.substr(href.search(/(\?|&)gender=/), 9);
            // console.log(t);
            console.log("t -->" + t)
            if (t.indexOf("-") != -1) {
                if (href.indexOf("&gender") != -1)
                    href = href.replace("&gender=-1", "&gender=1");
                else
                    href = href.replace("?gender=-1", "?gender=1");
            }
            else {

                if (href.indexOf("&gender") != -1)
                    href = href.replace("&gender=1", "&gender=-1");
                else
                    href = href.replace("?gender=1", "?gender=-1");
            }
        }
        else {
            if (href.indexOf("?") != -1)
                href += "&gender=1";
            else
                href += "?gender=1";
        }
        console.log(href);
        window.location.href = href;
    }  
    render() {
        return (
            <div>
                <h3>Users List</h3>
                <form onSubmit={this.onSubmitSearch}>
                    <div className="form-group row">
                        <span className="ml-3 form-control col-md-1 mr-1">Search:</span>
                        <input type="text" name="search" id="searchinput"  className="form-control col-md-4" onChange={this.onChangeSearchInput}/>
                        <input type="submit" value="Search" name="submitSearch" id="submitSearch"
                            className="form-control btn text-light btn-primary offset-md-1 col-md-1"/>
                    </div>

                </form>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th><button onClick={this.onClickGender}>gender {this.state.genderSort == 1 ? "˅" :"^"}</button></th>
                            <th><button onClick={this.onClickDob}>dob {this.state.dobSort == "1" ? "˅" :"^" }</button></th>
                            <th>news</th>
                            <th>email</th>
                            <th>photo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.usersList()}
                    </tbody>
                </table>
                {this.state.pages.map(page => {
                    return <a className="btn btn-info text-light mr-1" key={page} href={"/users/" + page + "/10" + (window.location.href.indexOf("?") != -1 ? window.location.href.substring(window.location.href.indexOf("?"),window.location.href.length):"")}>{page}</a>
                })}
            </div>
        )
    }
}