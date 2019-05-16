import React, { Component } from "react";
import MessagesList from "../messages/MessagesList"

export default class ChallengesList extends Component {
    state = {
        currentIssueId: 0
    }

    showMessages = event => {
        console.log("run")
        const newState = {
            currentIssueId: event.target.id
        }
        console.log("issue id", newState.currentIssueId);
        this.setState(newState);
    }

    challengeListButtonHandler = (issue) => {
        console.log(this.props);
        if (this.props.history.location.pathname === "/profile" && this.props.isUser(issue)) {
            return (<button key={issue.id} onClick={() => this.props.history.push(`profile/challenges/${issue.id}`)}>
            {issue.content}
        </button>)
        } else {
            if (this.props.isUser(issue) && issue.active === true) {
        return (<button key={issue.id} id={issue.id} onClick={event => this.showMessages(event)}>
            {issue.content}
        </button>)
            }
        }
    }

    messages = () => {
        if (this.props.history.location.pathname === "/" && this.state.currentIssueId !== 0) {
            return (
                <React.Fragment>
                    < MessagesList {...this.props} currentIssueId={this.state.currentIssueId}/>
                </React.Fragment>
            )
        }
    }

    // renders section with .map function that creates an array of items with JSX wrappers from the items inside the array of objects specified.
    render() {
        return (
            <React.Fragment>
                <section>
                    {this.messages()}
                    {
                        this.props.issues.map(issue => this.challengeListButtonHandler(issue))
                    }
                </section>
            </React.Fragment>
        )
    }
}