import React, { Component } from "react";
import MessagesList from "./MessagesList";

export default class MessageEditList extends Component {
    render(){
        console.log(this.props)
        return(
            <React.Fragment>
                <section>
                    <MessagesList {...this.props}/>
                </section>
            </React.Fragment>
        )
    }
}