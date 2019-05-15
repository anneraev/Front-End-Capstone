import React, { Component } from "react";

export default class NewChallengeButton extends Component {
    state = {
        createMode: false,
        content: "",
        userId: parseInt(sessionStorage.getItem("userId"))
    }

    helpMessage = () => {
        if (this.props.issues && this.props.issues.find(issue => issue.userId === this.state.userId)){
            return (
                <React.Fragment>
                <div>
                    Is there something else you'd like help with?
                </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                <div>
                    Is there something you'd like help with?
                </div>
                </React.Fragment>
            )

        }
    }

    //redirects to the newly-created issue.
    goToCreatedIssue = () => {
        console.log("props", this.props)
        console.log("all issues", this.props.issues)
        const issues = this.props.issues.filter(issue => issue.userId === this.state.userId);
        console.log("user issues", issues);
        const issueIds = issues.map(issue => issue.id);
        console.log("issueIds", issueIds);
        let newestIssue = Math.max(...issueIds);
        console.log("issue number", newestIssue)
        if (newestIssue === -Infinity) {
            newestIssue = 1
        }
        this.props.history.push(`/profile/challenges/${newestIssue}`)
    }

    //a new challenge is created, then redirects to that challenge's edit page.
    createNewChallenge = event => {
        event.preventDefault()
        const newChallenge = {
            content: this.state.content,
            active: true,
            userId: this.state.userId
        }
        if (this.state.content !== "") {
            this.props.postIssue(newChallenge).then(() => this.goToCreatedIssue())
        } else {
            alert("Try typing a phrase that explains your problem in the first person.")
        }
    }

    handleChange = event => {
        const value = event.target.value;
        const newChallengeState = {
            content: value,
            createMode: true
        }
        this.setState(newChallengeState);
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

    //sets state to create mode, meaning a challenge can be created. Signals rerendering so the dialogue box appears along with the appropriate button.
    openChallengeDialogue = () => {
        const create = {}
        create.createMode = true
        this.setState(create)
    }

    //if not creating a new challenge, opens challenge dialogue. If creating a new challenge, creates new challenge.
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
                    <button onClick={event => this.createNewChallenge(event)}>
                        Create New Challenge
                </button>
                </React.Fragment>
            )

        }
    }

    render() {
        return (
            <React.Fragment>
                <section>
                    {this.helpMessage()}
                    {this.newButton()}
                    {this.challengeDialogue()}
                </section>
            </React.Fragment>
        )
    }
}