import React, { Component } from "react";
import MessagesList from "./MessagesList";
import "./MessageEditList.css"
import { Button, Input } from 'reactstrap';


export default class MessageEditList extends Component {
    state = {
        currentFieldText: "",
        currentMessageId: 0
    }


    //resets state back to default after creating message.
    resetState = () => {
        const messageState = {};
        messageState.currentMessageId = 0;
        messageState.currentFieldText = "";
        this.setState(messageState);

    }

    //creteas new message object and returns it. Also resets input fields and state.
    constructNewMessage = () => {
        //content equal to currentFieldText
        const newMessage = {
            content: this.state.currentFieldText,
            issueId: parseInt(this.props.match.params.issueId),
            active: true
        }
        if (newMessage.content === "") {
            newMessage.content = "New Message"
        }
        this.resetState();
        return newMessage;
    }

    //on click, create a new message and immediately post it to the API. Only appears if navigating to message from profile.
    newMessageItem = () => {
        if (this.props.location.pathname.includes("profile/challenges/")) {
            return (
                <React.Fragment>
                    <Button key="0" onClick={() => this.props.createNewMessage(this.constructNewMessage())}>
                        New Message
            </Button>
                </React.Fragment>
            )
        }
    }

    //when a message in MessageList is clicked, this is called to receive the id of that message and set currentFieldText and currentMessageId to that of the selected message. This will give the component a reference to the message being edited, as well as set the contents of the text box to the content of the message.
    getMessageId = (key) => {
        const messageState = {}
        messageState.currentMessageId = parseInt(key)
        if (key !== "0") {
            const currentMessage = this.props.messages.find(message => message.id === messageState.currentMessageId);
            messageState.currentFieldText = currentMessage.content;
            this.setState(messageState);
        } else {
            this.resetState()
        }
    }

    //passes a newly-created message update back to Application Views for posting to the API, updates state as well.
    handleMessageUpdate = () => {
        const messageUpdate = {
            content: this.state.currentFieldText,
            id: this.state.currentMessageId
        }
        this.props.updateMessage(messageUpdate).then(() => this.resetState());
    }

    //renders the edit button only if there is a message Id stored in state, so that there is reference to the message being edited.
    renderEditButton = () => {
        if (this.state.currentMessageId !== 0) {
            return (
                <React.Fragment>
                    <Button onClick={this.handleMessageUpdate}>
                        Update Message
                    </Button>
                </React.Fragment>
            )
        }
    }

    //called when anything changes in the input field. Updates the issue object state internal to this component. The event targets ID becomes the key name and the value becomes the value of the key.
    handleInput = (event) => {
        const messageState = {}
        messageState.currentFieldText = event.target.value
        this.setState(messageState);
    }

    //creates message edit window and sets the value of the box to what is in state.
    createMessageEditWindow = () => {
        return (
            <React.Fragment>
                <Input type="textarea" className="form-control" placeholder="Type a reminder to help you navigate the problem." onChange={this.handleInput} value={this.state.currentFieldText}></Input>
                {this.renderEditButton()}
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <section>
                    <h2>Write messages to help yourself navigate your challenges</h2>
                    {this.createMessageEditWindow()}
                    {this.newMessageItem()}
                    <MessagesList {...this.props} getMessageId={this.getMessageId} />
                    </section>
            </React.Fragment>
        )
    }
}