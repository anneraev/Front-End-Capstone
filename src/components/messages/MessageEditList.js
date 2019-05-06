import React, { Component } from "react";
import MessagesList from "./MessagesList";

//create new message, open edit window. Track message change and add it to state. Update message state when clickign "add/edit" The window needs a reference to the id of the message.


export default class MessageEditList extends Component {
    //issue object state
    state = {
        messages: this.props.currentIssueMessageArray
    }

    //called when anything changes in the input field. Updates the issue object state internal to this component. The event targets ID becomes the key name and the value becomes the value of the key.
    handleInput = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    createMessageEditWindow = () => {
        console.log("messageEditWindow", this.props.currentIssueMessageArray)
            return (
                <React.Fragment>
                    <textarea></textarea>
                </React.Fragment>
            )
    }

        //on click, create a new message and immediately post it to the API. Only appears if navigating to message from profile.
        newMessageItem = () => {
            if (this.props.location.pathname.includes("profile/challenges/")) {
                const newMessage = {
                    content: "New Message",
                    active: true,
                    issueId: parseInt(this.props.match.params.issueId)
                }
                return (
                    <React.Fragment>
                    <button key="0" onClick={() => this.props.createNewMessage(newMessage)}>
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