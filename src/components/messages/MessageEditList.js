import React, { Component } from "react";
import MessagesList from "./MessagesList";

//create new message, open edit window. Track message change and add it to state. Update message state when clickign "add/edit" The window needs a reference to the id of the message.


export default class MessageEditList extends Component {
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