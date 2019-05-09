import React, { Component } from "react";

export default class NewChallengeButton extends Component {
    newChallengeState = {
        createMode: false,
        content: ""
    }

    state = {
        createMode: this.newChallengeState.createMode,
        content: this.newChallengeState.content
    }

    getNewlyCreatedIssue = (content, userId) => {
        const issues = this.props.issues
        return issues.filter(issue => issue.content === content && issue.userId === userId)
    }

    //the URL is set to the navigation page for the issue.
    goToChallengeCreation = event => {
        event.preventDefault()
        const newChallenge = {
            content: this.state.content,
            active: false,
            userId: parseInt(sessionStorage.getItem("userId"))
        }
        this.newChallengeState.createMode = true;
        this.props.postIssue(newChallenge).then(() => this.getNewlyCreatedIssue(newChallenge.content, newChallenge.userId))
    }

    handleChange = event => {
        const value = event.target.value;
        this.newChallengeState.content = value;
        this.newChallengeState.createMode = true;
        this.setState(this.newChallengeState);
    }

    newButton = () => {
        if (this.state.createMode === false) {
            return (
                <React.Fragment>
                    <button onClick={event => this.openChallengeDialogue(event)}>
                        New Challenge
                </button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <button onClick={event => this.goToChallengeCreation(event)}>
                        Create New Challenge
                </button>
                </React.Fragment>
            )

        }
    }

    challengeDialogue = () => {
        if (this.state.createMode === true) {
            return (
                <React.Fragment>
                    <input type="text" value={this.state.content} placeholder="What would you like help with?" onChange={event => this.handleChange(event)}></input>
                </React.Fragment>
            )
        }
    }

    openChallengeDialogue = () => {
        const create = {}
        create.createMode = true
        this.setState(create)
    }

    render() {
        return (
            <React.Fragment>
                <section>
                    <div>
                        Is there something else you'd like help with?
                </div>
                    {this.newButton()}
                    {this.challengeDialogue()}
                </section>
            </React.Fragment>
        )
    }
}