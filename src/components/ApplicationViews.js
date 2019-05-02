import React, { Component } from "react";
import ApiManager from "./ApiManager";
import stateManager from "./stateManager";
//import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

import Home from "./home/Home"
import Profile from "./profile/Profile"
import CheckInList from "./checkIns/CheckInList"

export default class ApplicationViews extends Component {
    //state object. All information for rendering to DOM is pulled from here.
    state = {
        users: [],
        messages: [],
        challenges: [],
        checkIns: [],
    }

    componentDidMount() {
        ApiManager.updateStateFromAPI().then(() => this.setState(stateManager.newState));
    }
    //renders a JSX element.
    render() {
        return (
            <React.Fragment>
                <Route exact path ="/dashboard" render={props => {
                    return < Redirect to = "/" />
                }} />
                <Route exact path="/" render={props => { return <Home {...props} checkIns={this.state.checkIns} challenges={this.state.challenges} messages={this.state.messages} /> }} />
                <Route exact path="/profile" render={props => {
                    return <Profile {...props} challenges={this.state.challenge} messages={this.state.messages}/>
                }}/>
                <Route exact path="/checkins" render={props => {
                    return < CheckInList {...props} checkIns={this.state.checkIns}/>
                }}/>
            </React.Fragment>
        )
    }
}