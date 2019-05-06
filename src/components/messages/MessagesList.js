import React, { Component } from "react";

export default class MessagesList extends Component {

    handleMessageClick = (event) => {
        if (this.props.getMessageId) {
            this.props.getMessageId(event.target.id)
        }
    }

    showApplicableMessages = (message) => {
        //uses a conditional to see if the message's issueId matches the issueId passed through URL parameter when this page was routed to. The URL parameter is the same as the ID of the issue topic that was clicked on. If it does match, this returns the content of that message as a result, creates an elemement containing it, and passes that to the render function.
        if (message.issueId === Number(this.props.match.params.issueId) && message.active === true) {
            return (
                <li key={message.id} id = {message.id} onClick={this.handleMessageClick}>
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