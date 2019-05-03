import React, { Component } from "react";
//import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

import ApiManager from "./ApiManager";
import stateManager from "./stateManager";
import Home from "./home/Home"
import Profile from "./profile/Profile"
import CheckInList from "./checkIns/CheckInList"
import checkInUpdate from "./checkInUpdate";

export default class ApplicationViews extends Component {
    //state object. All information for rendering to DOM is pulled from here.
    state = {
        users: [],
        messages: [],
        challenges: [],
        checkIns: [],
    }

    componentDidMount() {
        ApiManager.updateStateFromAPI().then(() => this.setState(stateManager.newState)).then(() => checkInUpdate.updateState(this.state));
    }

    //renders a JSX element.
    render() {
        if (this.state.checkIns === []) {
            window.location.reload();
        } else {
        return (
            <React.Fragment>
                <Route exact path ="/dashboard" render={props => {
                    return < Redirect to = "/" />
                }} />
                <Route exact path="/" render={props => { return <Home {...props} checkIns={this.state.checkIns} challenges={this.state.challenges} messages={this.state.messages} /> }} />
                <Route exact path="/profile" render={props => {
                    return <Profile {...props} challenges={this.state.challenge} messages={this.state.messages} />
                }}/>
                <Route exact path="/checkins" render={props => {
                    return < CheckInList {...props} checkIns={this.state.checkIns} />
                }}/>
            </React.Fragment>
        )
            }
    }
}