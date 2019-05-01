import React, { Component } from "react";
import ApiManager from "./ApiManager";
import stateManager from "./stateManager";
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
        //stop timer for state update.
        checkInUpdate.stopUpdate();
        //calls function to pull all data from the API, then sets state. Then start update timer.
        ApiManager.updateStateFromAPI().then(() => this.setState(stateManager.newState)).then(checkInUpdate.startUpdate());
    }

    render() {
        return (
            <React.Fragment>
                <h1>Ohhai, Mark.</h1>
            </React.Fragment>
        )
    }
}