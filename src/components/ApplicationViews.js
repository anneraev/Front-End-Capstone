import React, { Component } from "react";
import ApiManager from "./ApiManager";

export default class ApplicationViews extends Component {
    //state object. All information for rendering to DOM is pulled from here.
    state =  {
        users: [],
        messages: [],
        challenges: [],
        checkIns: [],
    }

    //All API calls write to newState so that State can be updated with setState in componentDidMount.
    newState = {}

    componentDidMount() {
        //calls function to pull all data from the API, then sets state.
        ApiManager.updateStateFromAPI().then(() => this.setState(this.newState));
        console.log(this.props);
    }
}