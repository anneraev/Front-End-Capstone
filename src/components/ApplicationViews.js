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

export default class ApplicationViews extends Component {
    //state object. All information for rendering to DOM is pulled from here.
    state = {
        users: [],
        messages: [],
        issues: [],
        checkIns: [],
    }

    postIssue = issue => {
        ChallengesAPI.post(issue).then(() => this.updateData())
    }

    updateData = () => {
        ApiManager.updateStateFromAPI().then(() => this.setState(stateManager.newState)).then(() => checkInUpdate.updateState(this.state));
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
                <Route exact path ="/dashboard" render={props => {
                    return < Redirect to = "/" />
                }} />
                <Route exact path="/" render={props => { return <Home {...props} checkIns={this.state.checkIns} issues={this.state.issues} messages={this.state.messages} users={this.state.users}/> }} />
                <Route exact path ="/challenge-messages/:issueId(\d+)" render={props => {
                    return <MessagesList {...props} messages={this.state.messages} users={this.state.users}/>
                }}/>
                <Route exact path="/profile" render={props => {
                    return <Profile {...props} issues={this.state.issues} messages={this.state.messages} users={this.state.users}/>
                }}/>
                <Route exact path="/profile/challenges/new" render={props => {
                    return  <ChallengeEdit {...props} postIssue={this.postIssue}/>
                }} />
                <Route exact path="/checkins" render={props => {
                    return < CheckInList {...props} checkIns={this.state.checkIns} users={this.state.users}/>
                }}/>
            </React.Fragment>
        )
            }
    }
}