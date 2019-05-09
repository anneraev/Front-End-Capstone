import React, { Component } from "react";

export default class LogOut extends Component {
    authenticationRevoke = () => {
        if (this.props.isAuthenticated()) {
            alert("Logging Out...")
            sessionStorage.removeItem("userId");
        } else {
            alert("You are not logged in.")
        }
        this.props.history.push("/")
    }

    render () {
        return (
            <React.Fragment>
                {this.authenticationRevoke()}
            </React.Fragment>
        )
    }
}