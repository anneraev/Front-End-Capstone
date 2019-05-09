import React, { Component } from "react";

export default class NewChallengeButton extends Component {
    //the URL is set to the navigation page for the issue.
    goToChallengeCreation = event => {
        event.preventDefault()
        let newId = this.props.issues.map(issue => {
                return issue.id
        })
        newId = Math.max.apply(null, newId)
        if (newId.toString() === "-Infinity") {
            newId = 1
        } else if (newId !== 0) {
            newId += 1
        }
        this.props.history.push(`profile/challenges/${newId}`);
    }

    render() {
        return (
            <React.Fragment>
                <section>
                    <div>
                        Is there something else you'd like help with?
                </div>
                    <button onClick={event => this.goToChallengeCreation(event)}>
                        New Challenge
                </button>
                </section>
            </React.Fragment>
        )
    }
}