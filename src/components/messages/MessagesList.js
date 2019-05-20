import React, { Component } from "react";
import MessageCarousel from "./MessageCarousel";

export default class MessagesList extends Component {

    state = {
        currentIssueId: this.props.currentIssueId
    }

    handleMessageClick = (event) => {
        if (this.props.getMessageId) {
            this.props.getMessageId(event.target.id)
        }
    }

    handleDelete = (event) => {
        this.props.deleteSingleMessage(event.target.id);
    }

    //toggles message active property when button is clicked.
    activate = (event) => {
        const messageUpdate = {
            active: true,
            id: event.target.id
        }
        this.props.updateMessage(messageUpdate)
    }

    deactivate = (event) => {
        const messageUpdate = {
            active: false,
            id: event.target.id
        }
        this.props.updateMessage(messageUpdate)
    }

    //displays a button that, when clicked, toggles active/inactive flag for the message in the data. The appearance of the button changes based on the status of the message.
    renderActiveButton = (message) => {
        if (message.active === true) {
            return (
                <React.Fragment>
                    <button key={message.id} id={message.id} onClick={this.deactivate}>
                        Active
                    </button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <button key={message.id} id={message.id} onClick={this.activate}>
                        Inactive
                    </button>
                </React.Fragment>
            )
        }
    }

    renderDeleteButton = (message) => {
        if (this.props.location.pathname.includes("/profile/challenges/")) {
            return (
                <React.Fragment>
                    <button key={message.id} id={message.id} onClick={this.handleDelete}>
                        Clear
                    </button>
                </React.Fragment>
            )
        }
    }

    showApplicableMessages = (message) => {
        //uses a conditional to see if the message's issueId matches the issueId passed through URL parameter when this page was routed to. The URL parameter is the same as the ID of the issue topic that was clicked on. If it does match, this returns the content of that message as a result, creates an elemement containing it, and passes that to the render function. If called from "/home", filters out inactive messages.
        if (message.issueId === Number(this.props.match.params.issueId)) {
            return (
                <li key={message.id} id={message.id}>
                    <span key={message.id} id={message.id} onClick={this.handleMessageClick}>{message.content}</span>
                    {this.renderDeleteButton(message)}
                    {this.renderActiveButton(message)}
                </li>
            )
        }
    }

    messageCarousel = () => {
        return (
            <MessageCarousel {...this.props} currentIssueId={this.props.currentIssueId} />
        )
    }

    render() {
        if (this.props.location.pathname.includes("profile/challenges/")) {
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
        } else {
            return (
                <React.Fragment>
                    <section>
                        {this.messageCarousel()}
                    </section>
                </React.Fragment>
            )
        }
    }
}