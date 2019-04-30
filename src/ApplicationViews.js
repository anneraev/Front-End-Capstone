import React, { Component } from "react";
import ApiManager from "./modules/api/ApiManager";

export default class ApplicationViews extends Component {
    state =  {
        users: [],
        messages: [],
        challenges: [],
        checkIns: [],
    }

    newState = {}

    componentDidMount() {
        ApiManager.updateStateFromAPI().then(() => this.setState(this.newState));
        console.log(this.props);
    }
}