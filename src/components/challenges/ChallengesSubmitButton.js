import React, { Component } from "react";

export default class ChallengesSubmitButton extends Component {
    //renders a different button with a different onClick depending on the current location.
    render() {
        console.log(this.props);
        if (this.props.location.pathname === "/profile/challenges/new") {
        return(
            <React.Fragment>
            <section>
                <button onClick={(event) => this.props.constructNewIssue(event)}>
                Add Challenge
                </button>
            </section>
            </React.Fragment>
        )
    } else {

        }
    }
}