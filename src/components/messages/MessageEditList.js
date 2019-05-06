import React, { Component } from "react";
import MessagesList from "./MessagesList";

//get messageId when clicking message in messageList.

export default class MessageEditList extends Component {
    //referened by state and handleInput to alter messages and text input.
    messageState = {
        currentFieldText: "",
        currentMessageId: 0
    }

    state = {
        currentFieldText: this.messageState.currentFieldText,
        currentMessageId: this.messageState.currentMessageId
    }

    //when a message in MessageList is clicked, this is called to receive the id of that message and set currentFieldText and currentMessageId to that of the selected message. This will give the component a reference to the message being edited, as well as set the contents of the text box to the content of the message.
    getMessageId = (key) => {
        this.messageState.currentMessageId = parseInt(key)
        const currentMessage = this.props.messages.find(message => message.id === parseInt(key));
        this.messageState.currentFieldText = currentMessage.content;
        this.setState(this.messageState);
    }

    //called when anything changes in the input field. Updates the issue object state internal to this component. The event targets ID becomes the key name and the value becomes the value of the key.
    handleInput = (event) => {
        this.messageState.currentFieldText = event.target.value
        console.log(this.messageState.currentFieldText);
        this.setState(this.messageState);
    }

    //sets the text value. Called from within render function so that it updates whenever state changes.
    setTextValue = () => {
        return this.state.currentFieldText;
    }

    renderEditButton = () => {
        if (this.state.currentMessageId !== 0) {
            return (
                <React.Fragment>
                    <button >
                        Update Message
                </button>
                </React.Fragment>
            )
        }
    }

    createMessageEditWindow = () => {
        return (
            <React.Fragment>
                <textarea className="form-control" placeholder="Type a reminder to help you navigate the problem." onChange={this.handleInput} value={this.setTextValue()}></textarea>
                {this.renderEditButton()}
            </React.Fragment>
        )
    }

    constructNewMessage = () => {
        //content equal to currentFieldText
        const newMessage = {
            content: this.messageState.currentFieldText,
            issueId: parseInt(this.props.match.params.issueId),
            active: true
        }
        if (newMessage.content === "") {
            newMessage.content = "New Message"
        }
        this.messageState.currentMessageId = 0;
        this.messageState.currentFieldText = "";
        this.setState(this.messageState);
        return newMessage;
    }

    //on click, create a new message and immediately post it to the API. Only appears if navigating to message from profile.
    newMessageItem = () => {
        if (this.props.location.pathname.includes("profile/challenges/")) {
            return (
                <React.Fragment>
                    <button key="0" onClick={() => this.props.createNewMessage(this.constructNewMessage())}>
                        New Message
            </button>
                </React.Fragment>
            )
        }
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <section>
                    <h2>Write messages to help yourself navigate your challenges</h2>
                    {this.createMessageEditWindow()}
                    <MessagesList {...this.props} getMessageId={this.getMessageId} />
                    {this.newMessageItem()}
                </section>
            </React.Fragment>
        )
    }
}