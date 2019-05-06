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

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <section>
                    <h2>Write messages to help yourself navigate your challenges</h2>
                    {this.createMessageEditWindow()}
                    <MessagesList {...this.props} />
                </section>
            </React.Fragment>
        )
    }
}