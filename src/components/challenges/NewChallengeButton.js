import React, { Component } from "react";

export default class NewChallengeButton extends Component {
    //Creates an object from state calls postIssue in ApplicationViews from props. Finally, after the API returns a response, the URL is set back to navigate to the edit page for the newly created challenge.
    constructNewIssue = event => {
        event.preventDefault()
        const issue = {
            content: "New Challenge",
            userId: 1,
            active: false
        }
        const newId = this.props.issues.length + 1
        this.props.postIssue(issue).then(() => this.props.history.push(`profile/challenges/${newId}`));
    }

    render() {
        return(
            <React.Fragment>
            <section>
                <div>
                Is there something else you'd like help with?
                </div>
                <button onClick={event => this.constructNewIssue(event)}>
                New Challenge
                </button>
            </section>
            </React.Fragment>
        )
    }
}