import React, { Component } from "react";

export default class MessagesList extends Component {
showApplicableMessages = (message) => {
        //uses a conditional to see if the message's issueId matches the issueId passed through URL parameter when this page was routed to. The URL parameter is the same as the ID of the issue topic that was clicked on. If it does match, this returns the content of that message as a result, and since it was called within the render function, that message's content will be rendered.
        if (message.issueId === Number(this.props.match.params.issueId)){
            return(
                <div key={message.id}>
                {message.content}
                </div>
                )
        }
    }

    render(){
        return(
            <React.Fragment>
                <section>
                    {
                        this.props.messages.map(message => this.showApplicableMessages(message)
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}