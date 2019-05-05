import React, { Component } from "react";

export default class MessagesList extends Component {
showApplicableMessages = (message) => {
        //uses a conditional to see if the message's issueId matches the issueId passed through URL parameter when this page was routed to. The URL parameter is the same as the ID of the issue topic that was clicked on. If it does match, this returns the content of that message as a result, and since it was called within the render function, that message's content will be rendered. Another conditional determines that the list was called from the edit function, and whether or not there are any messages to edit. If not, it renders a button for creating a new message instead.
        if (message.issueId === Number(this.props.match.params.issueId) && message.active === true){
            return(
                <li key={message.id}>
                {message.content}
                </li>
                )
        }
    }

    //on click, create a new message and immediately post it to the API.
    newMessageItem = () => {
        if (this.props.location.pathname === "/profile/challenges/new") {
        return (
        <li key="0" onClick={() => this.createNewMessage()}>
        New Message
        </li>
        )
        }
    }

    render(){
        console.log(this.props)
        return(
            <React.Fragment>
                <section>
                    <ul>
                    {
                        this.props.messages.map(message => this.showApplicableMessages(message)
                        )
                    }
                    {this.newMessageItem()}
                    </ul>
                </section>
            </React.Fragment>
        )
    }
}