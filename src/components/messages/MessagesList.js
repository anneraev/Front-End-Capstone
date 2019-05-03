import React, { Component } from "react";

export default class MessagesList extends Component {
showApplicableMessages = (message) => {
        //uses a conditional to see if the message's challengeId matches the challengeId passed through URL parameter when this page was routed to. The URL parameter is the same as the ID of the challenge topic that was clicked on. If it does match, this returns the content of that message as a result, and since it was called within the render function, that message's content will be rendered.
        if (message.issueId === Number(this.props.match.params.issueId)){
            return message.content
        }
    }

    render(){
        return(
            <React.Fragment>
                <section>
                    {
                        this.props.messages.map(message =>
                            <div key={message.id}>
                                {this.showApplicableMessages(message)}
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}