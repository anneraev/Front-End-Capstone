import React, { Component } from "react";
import ApiManager from "./ApiManager";
import stateManager from "./stateManager";

export default class ApplicationViews extends Component {
    //state object. All information for rendering to DOM is pulled from here.
    state =  {
        users: [],
        messages: [],
        challenges: [],
        checkIns: [],
    }

    componentDidMount() {
        //calls function to pull all data from the API, then sets state.
        ApiManager.updateStateFromAPI().then(() => this.setState(stateManager.newState));
    }

    render(){
        return(
            <React.Fragment>
                <h1>Ohhai, Mark.</h1>
            </React.Fragment>
        )
    }
}