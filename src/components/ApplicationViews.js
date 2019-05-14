import React, { Component } from "react";
//import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

import Home from "./home/Home";
import Profile from "./profile/Profile";
import CheckInList from "./checkIns/CheckInList";
import MessagesList from "./messages/MessagesList";
import ChallengeEdit from "./challenges/ChallengesEdit";
import ChallengesAPI from "./challenges/ChallengesAPI";
import MessagesAPI from "./messages/MessagesAPI";
import CheckInsAPI from "./checkIns/CheckInsAPI";
import Login from "./userAuthentication/Login";
import LogOut from "./userAuthentication/LogOut";
import UsersAPI from "./users/UsersAPI";
import checkInUpdate from "./checkInUpdate";

export default class ApplicationViews extends Component {
    //state object. All information for rendering to DOM is pulled from here.
    state = {
        users: [],
        messages: [],
        issues: [],
        checkIns: [],
    }

    //checks to see that a user has logged in.
    isAuthenticated = () => {
        return sessionStorage.getItem("userId") !== null
    }

    //checks to see that the passed data has a userId that matches the current user Id in session storage.
    isUser = (data) => {
        return data.userId === parseInt(sessionStorage.getItem("userId"))
    }

    //user API
    createNewUser = user => {
        const newState = {}
        return UsersAPI.post(user).then(() => UsersAPI.getAll().then(users => newState.users = users)).then(() => this.setState(newState))
    }

    //message API
    createNewMessage = message => {
        const newState = {}
        return MessagesAPI.post(message).then(() => MessagesAPI.getAll().then(messages => newState.messages = messages)).then(() => this.setState(newState))
    }

    updateMessage = message => {
        const newState = {}
        return MessagesAPI.patch(message.id, message).then(() => this.updateData()).then(() => MessagesAPI.getAll().then(messages => newState.messages = messages)).then(() => this.setState(newState))
    }

    deleteMessage = id => {
        return MessagesAPI.delete(id)
    }

    //Issue API
    postIssue = issue => {
        const newState = {}
        return ChallengesAPI.post(issue).then(() => ChallengesAPI.getAll().then(issues => newState.issues = issues)).then(() => this.setState(newState))
    }

    updateIssue = issue => {
        const newState = {}
        return ChallengesAPI.patch(issue.id, issue).then(() => ChallengesAPI.getAll().then(issues => newState.issues = issues)).then(() => this.setState(newState))
    }

    deleteIssue = id => {
        const newState = {}
        return ChallengesAPI.delete(id).then(() => ChallengesAPI.getAll().then(issues => newState.issues = issues)).then(() => this.setState(newState))
    }

    //CheckIn API
    postCheckIn = alert => {
        const newState = {}
        return CheckInsAPI.post(alert).then(() => CheckInsAPI.getAll().then(checkIns => newState.checkIns = checkIns)).then(() => this.setState(newState))
    }

    updateCheckIn = alert => {
        const newState = {}
        return CheckInsAPI.patch(alert.id, alert).then(() => CheckInsAPI.getAll().then(checkIns => newState.checkIns = checkIns)).then(() => this.setState(newState))
    }

    deleteCheckIn = id => {
        const newState = {}
        return CheckInsAPI.delete(id).then(() => CheckInsAPI.getAll().then(checkIns => newState.checkIns = checkIns)).then(() => this.setState(newState))
    }

    //Updates all data.
    updateData = () => {
        const newState = {}
        return UsersAPI.getAll().then(users => newState.users = users)
        .then(() => MessagesAPI.getAll().then(messages => newState.messages = messages))
        .then(() => ChallengesAPI.getAll().then(issues => newState.issues = issues))
        .then(() => CheckInsAPI.getAll().then(checkIns => newState.checkIns = checkIns)).then(() => this.setState(newState))
    }

    componentDidMount() {
        this.updateData().then(() => checkInUpdate.updateState(this.state));
    }

    //renders a JSX element.
    render() {
        //failsafe in case render loads before there is data.
        if (this.state.checkIns === []) {
            window.location.reload();
        } else {
            return (
                <React.Fragment>
                    <Route exact path="/dashboard" render={props => {
                        return < Redirect to="/" />
                    }} />
                    <Route exact path="/" render={props => {
                        if (this.isAuthenticated()) {
                            return <Home {...props} checkIns={this.state.checkIns} issues={this.state.issues} messages={this.state.messages} users={this.state.users} isUser={this.isUser}/>
                        } else {
                            return < Login {...props} users={this.state.users} createNewUser={this.createNewUser}/>
                        }
                    }} />
                    <Route exact path="/challenge-messages/:issueId(\d+)" render={props => {
                        if (this.isAuthenticated()) {
                            return <MessagesList {...props} messages={this.state.messages} users={this.state.users} isUser={this.isUser}/>
                        } else {
                            return < Login {...props} users={this.state.users} createNewUser={this.createNewUser}/>
                        }
                    }} />
                    <Route exact path="/profile" render={props => {
                        if (this.isAuthenticated()) {
                            return <Profile {...props} issues={this.state.issues} messages={this.state.messages} users={this.state.users} postIssue={this.postIssue} clearIssueStorage={this.clearIssueStorage} isUser={this.isUser}/>
                        }
                        else {
                            return < Login {...props} users={this.state.users} createNewUser={this.createNewUser}/>
                        }
                    }} />
                    <Route exact path="/profile/challenges/:issueId(\d+)" render={props => {
                        if (this.isAuthenticated()) {

                            return <ChallengeEdit {...props} issues={this.state.issues} messages={this.state.messages} updateIssue={this.updateIssue} updateData={this.updateData} createNewMessage={this.createNewMessage} updateMessage={this.updateMessage} deleteMessage={this.deleteMessage} deleteIssue={this.deleteIssue} isUser={this.isUser}/>
                        }
                        else {
                            return < Login {...props} users={this.state.users} createNewUser={this.createNewUser}/>
                        }
                    }} />
                    <Route exact path="/checkins" render={props => {
                        if (this.isAuthenticated()) {
                            return < CheckInList {...props} checkIns={this.state.checkIns} users={this.state.users} postCheckIn={this.postCheckIn} updateCheckIn={this.updateCheckIn} deleteCheckIn={this.deleteCheckIn} isUser={this.isUser}/>
                        }
                        else {
                            return < Login {...props} users={this.state.users} createNewUser={this.createNewUser}/>
                        }
                    }} />
                    <Route exact path="/logOut" render={props => {
                        return < LogOut {...props} isAuthenticated={this.isAuthenticated}/>
                    }} />
                </React.Fragment>
            )
        }
    }
}