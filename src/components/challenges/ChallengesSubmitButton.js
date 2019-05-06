import React, { Component } from "react";

export default class ChallengesSubmitButton extends Component {
    //this.props.issue supplies a reference to the current issue and is passed from its parent component, ChallengeEdit. props.messageArray is also passed from its parent and is an array of all messages associated with the current issue.
    render() {
        return(
            <React.Fragment>
            <section>
                <button onClick={() => this.props.updateIssue(this.props.issue, this.props.messagesArray).then(()=> this.props.updateData().then(() => this.props.history.push("/profile")))}>
                Update Challenge
                </button>
            </section>
            </React.Fragment>
        )
    }
}