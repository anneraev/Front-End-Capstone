import React, { Component } from "react";

export default class MessagesList extends Component {
    showApplicableMessages = (message) => {
        //uses a conditional to see if the message's issueId matches the issueId passed through URL parameter when this page was routed to. The URL parameter is the same as the ID of the issue topic that was clicked on. If it does match, this returns the content of that message as a result, and since it was called within the render function, that message's content will be rendered. Also creates an array of each applicable message for the updateIssue funciton to use if rendered from the ChallengesEdit component.
        this.props.clearIssuesArray();
        if (message.issueId === Number(this.props.match.params.issueId) && message.active === true) {
            if (this.props.location.pathname.includes("profile/challenges/")) {
            this.props.currentIssueMessageArray.push(message);
            }
            console.log(this.props.currentIssueMessageArray)
            return (
                <li key={message.id}>
                    {message.content}
                </li>
            )
        }
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <section>
                    <ul>
                        {
                            this.props.messages.map(message => this.showApplicableMessages(message)
                            )
                        }
                    </ul>
                </section>
            </React.Fragment>
        )
    }
}