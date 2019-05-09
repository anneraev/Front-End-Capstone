import React, { Component } from "react";

export default class NewChallengeButton extends Component {
    //Creates an object from state calls postIssue in ApplicationViews from props. Finally, after the API returns a response, the URL is set back to navigate to the edit page for the newly created challenge.
    constructNewIssue = event => {
        event.preventDefault()
        const issue = {
            content: "New Challenge",
            userId: parseInt(sessionStorage.getItem("userId")),
            active: false
        }
        let newId = this.props.issues.map(issue => {
            return issue.id
        })
        newId = Math.max.apply(null, newId)
        if (newId.toString() === "-Infinity") {
            newId = 1
        } else if (newId !== 0) {
            newId += 1
        }
        this.props.postIssue(issue).then(() => this.props.history.push(`profile/challenges/${newId}`));
    }

    render() {
        return (
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