import React, { Component } from "react";

export default class ChallengesSubmitButton extends Component {
    //requires a reference to the current issue being edited, and an array of all messages associated with that issue.
    render() {
        console.log(this.props);
        return(
            <React.Fragment>
            <section>
                <button onClick={() => this.props.updateIssue(this.props.issue).then(()=> this.props.updateData().then(() => this.props.history.push("/profile")))}>
                Update Challenge
                </button>
            </section>
            </React.Fragment>
        )
    }
}