import React, { Component } from "react";
//import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";
import "./ApplicationViews.css"

import ChallengesAPI from "./challenges/ChallengesAPI";
import MessagesAPI from "./messages/MessagesAPI";
import CheckInsAPI from "./checkIns/CheckInsAPI";
import Login from "./userAuthentication/Login";
import UsersAPI from "./users/UsersAPI";
import MasterUpdateCheckin from "../components/checkIns/MasterUpdateCheckin"

export default class ApplicationViews extends Component {
    //state object. All information for rendering to DOM is pulled from here.
    state = {
        users: [],
        messages: [],
        issues: [],
        checkIns: [],
        stage: null,
    }

    getUser = () => {
        return parseInt(sessionStorage.getItem("userId"))
    }

    //checks to see that a user has logged in.
    isAuthenticated = () => {
        return sessionStorage.getItem("userId") !== null
    }

    //checks to see that the passed data has a userId that matches the current user Id in session storage.
    isUser = (data) => {
        return data.userId === parseInt(sessionStorage.getItem("userId"))
    }
    //API functions call functionst that interract with the API, update the API, fetch the new data from the API, and then generally set State to match the current API and in the case of checkIns, updates the array of alerts that checkInsUpdate.js uses.

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
        return MessagesAPI.patch(message.id, message).then(() => MessagesAPI.getAll().then(messages => newState.messages = messages)).then(() => this.setState(newState))
    }

    deleteSingleMessage = id => {
        const newState = {}
        return MessagesAPI.delete(id).then(() => MessagesAPI.getAll().then(messages => newState.messages = messages)).then(() => this.setState(newState))
    }

    //separate call for deleting all messages associated with an issue (called when deleting an issue).
    deleteMessagesInMessageList = messageList => {
        const newState = {};
        const messageIds = messageList.map(message => message.id)
        return MessagesAPI.deleteMass(messageIds).then(() => MessagesAPI.getAll().then(messages => newState.messages = messages)).then(this.setState(newState));
    }

    //called when a new edit page is opened. Ensures that there are no lingering messages from previously deleted challenge.
    refreshMessagesList = () => {
        const newState = {}
        return MessagesAPI.getAll().then(messages => newState.messages = messages).then(() => this.setState(newState))
    }

    //Issue API
    postIssue = issue => {
        const newState = {}
        return ChallengesAPI.post(issue).then(() => ChallengesAPI.getAll().then(issues => newState.issues = issues)).then(() => this.setState(newState))
    }

    updateIssue = (id, issue) => {
        const newState = {}
        return ChallengesAPI.patch(id, issue).then(() => ChallengesAPI.getAll().then(issues => newState.issues = issues)).then(() => this.setState(newState))
    }

    //deletes an issue. Before updating state, messages are also fetched from the API, as any messages associated with the deleted issue will have been previously deleted.
    deleteIssue = id => {
        const newState = {}
        return ChallengesAPI.delete(id).then(() => ChallengesAPI.getAll().then(issues => newState.issues = issues)).then(() => this.setState(newState))
    }

    //CheckIn API
    postCheckIn = alert => {
        const newState = {}
        return CheckInsAPI.post(alert).then(() => CheckInsAPI.getAll().then(checkIns => newState.checkIns = checkIns)).then(() => this.setState(newState));
    }

    updateCheckIn = (id, alert) => {
        const newState = {}
        return CheckInsAPI.patch(id, alert).then(() => CheckInsAPI.getAll().then(checkIns => newState.checkIns = checkIns)).then(() => this.setState(newState));
    }

    deleteCheckIn = id => {
        const newState = {}
        return CheckInsAPI.delete(id).then(() => CheckInsAPI.getAll().then(checkIns => newState.checkIns = checkIns)).then(() => this.setState(newState));
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
        this.updateData();
    }

    //renders a JSX element.
    render() {
        return (
            <Route exact path="/" render={props => {
                if (this.isAuthenticated()) {
                    //if no stage, go to home.
                    return <MasterUpdateCheckin {...props} checkIns={this.state.checkIns} issues={this.state.issues} messages={this.state.messages} users={this.state.users} isUser={this.isUser} postIssue={this.postIssue} getUser={this.getUser} />
                } else {
                    return < Login {...props} users={this.state.users} createNewUser={this.createNewUser} />
                }
            }} />)
    }
}