import React, { Component } from "react";

export default class NewChallengeButton extends Component {
    openIssueDialogue = () => {
        this.props.history.push("profile/challenges/new")
    }

    render() {
        return(
            <React.Fragment>
            <section>
                <div>
                Is there something else you'd like help with?
                </div>
                <button onClick={() => this.openIssueDialogue()}>
                New Challenge
                </button>
            </section>
            </React.Fragment>
        )
    }
}