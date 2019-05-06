import React, { Component } from "react";
import MessagesList from "./MessagesList";

//create new message, open edit window. Track message change and add it to state. Update message state when clickign "add/edit" The window needs a reference to the id of the message.


export default class MessageEditList extends Component {
    //issue object state

    messageState = {
        messages: this.props.currentIssueMessageArray,
        currentFieldText: "Blank Message"
    }

    state = {
        messages: this.messageState.messages
    }

    //called when anything changes in the input field. Updates the issue object state internal to this component. The event targets ID becomes the key name and the value becomes the value of the key.
    handleInput = (event) => {
        this.messageState.currentFieldText = event.target.value
        console.log(this.messageState.currentFieldText);
        // this.setState(stateToChange)
        // this.props.clearIssueStorage()
    }

    //when editing in handle input, get messageArray, find message being edited, update messgae, update state with new messageArray.

    createMessageEditWindow = () => {
        return (
            <React.Fragment>
                <textarea className="form-control" placeholder="Type a reminder to help you navigate the problem." onChange={this.handleInput}></textarea>
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
                    <MessagesList {...this.props} />
                    {this.newMessageItem()}
                </section>
            </React.Fragment>
        )
    }
}