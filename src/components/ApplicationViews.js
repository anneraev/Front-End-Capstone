import React, { Component } from "react";
//import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

import ApiManager from "./ApiManager";
import stateManager from "./stateManager";
import Home from "./home/Home"
import Profile from "./profile/Profile"
import CheckInList from "./checkIns/CheckInList"
import checkInUpdate from "./checkInUpdate";
import MessagesList from "./messages/MessagesList";
import ChallengeEdit from "./challenges/ChallengesEdit";
import ChallengesAPI from "./challenges/ChallengesAPI";
import MessagesAPI from "./messages/MessagesAPI";
import CheckInsAPI from "./checkIns/CheckInsAPI";

export default class ApplicationViews extends Component {
    //state object. All information for rendering to DOM is pulled from here.
    state = {
        users: [],
        messages: [],
        issues: [],
        checkIns: [],
    }
    //array of messages for the currently selected issue in Profile.

    clearIssueStorage = () => {
        sessionStorage.removeItem("currentContent");
        sessionStorage.removeItem("currentId");
        sessionStorage.removeItem("currentActive");
    }

    createNewMessage = message => {
        MessagesAPI.post(message).then(() => this.updateData())
    }

    postIssue = issue => {
        return ChallengesAPI.post(issue).then(() => this.updateData())
    }

    updateIssue = issue => {
        return ChallengesAPI.patch(issue.id, issue)
    }

    updateMessage = message => {
        MessagesAPI.patch(message.id, message).then(() => this.updateData())
    }

    deleteMessage = id => {
        return MessagesAPI.delete(id)
    }

    deleteIssue = id => {
        return ChallengesAPI.delete(id)
    }

    postCheckIn = alert => {
        return CheckInsAPI.post(alert).then(() => this.updateData())
    }

    updateCheckIn = alert => {
        return CheckInsAPI.patch(alert.id, alert).then(() => this.updateData())
    }

    updateData = () => {
        return ApiManager.updateStateFromAPI().then(() => this.setState(stateManager.newState)).then(() => checkInUpdate.updateState(this.state));
    }

    componentDidMount() {
        this.updateData()
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
                    <Route exact path="/" render={props => { return <Home {...props} checkIns={this.state.checkIns} issues={this.state.issues} messages={this.state.messages} users={this.state.users} /> }} />
                    <Route exact path="/challenge-messages/:issueId(\d+)" render={props => {
                        return <MessagesList {...props} messages={this.state.messages} users={this.state.users} />
                    }} />
                    <Route exact path="/profile" render={props => {
                        return <Profile {...props} issues={this.state.issues} messages={this.state.messages} users={this.state.users} postIssue={this.postIssue} clearIssueStorage={this.clearIssueStorage} />
                    }} />
                    <Route exact path="/profile/challenges/:issueId(\d+)" render={props => {
                        return <ChallengeEdit {...props} issues={this.state.issues} messages={this.state.messages} updateIssue={this.updateIssue} updateData={this.updateData} createNewMessage={this.createNewMessage} updateMessage={this.updateMessage} deleteMessage={this.deleteMessage} deleteIssue={this.deleteIssue} />
                    }} />
                    <Route exact path="/checkins" render={props => {
                        return < CheckInList {...props} checkIns={this.state.checkIns} users={this.state.users} postCheckIn={this.postCheckIn} updateCheckIn={this.updateCheckIn}/>
                    }} />
                </React.Fragment>
            )
        }
    }
}