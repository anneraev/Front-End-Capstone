import React, { Component } from "react";

export default class ChallengesSubmitButton extends Component {
    //this.props.issue supplies a reference to the current issue and is passed from its parent component, ChallengeEdit.
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