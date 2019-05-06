import React, { Component } from "react";
import ChallengesSubmitButton from "./ChallengesSubmitButton";
import MessageEditList from "../messages/MessageEditList";

//challengeEdit/new
//challengeEdit/num

//Change post/patch feature based on whether or not there's a /new at the end of the URL.

export default class ChallengeEdit extends Component {
    //issue object state
    state = {
        content: this.props.issues[this.props.match.params.issueId - 1].content,
        userId: 1,
        active: true,
        id: this.props.match.params.issueId
    }

    //called when anything changes in the input field. Updates the issue object state internal to this component. The event targets ID becomes the key name and the value becomes the value of the key.
    handleInput = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //on Change takes a reference to a function that runs when something changes in the input field. Ref takes an anonymous callback function, in this case it creates a key/value pair belonging to this object, and passes a reference to that function to set the value to a reference to the element.
    render() {
        console.log(this.props)
        console.log("issues", this.props.issues);
        return (
            <React.Fragment>
                <section className="form-group">
                    <input type="text" required className="form-control" onChange={this.handleInput} id="content" placeholder="What would you like help with?" ref={(element) => this.challengeInput = element} value={this.state.content}>
                    </input>
                </section>
                <MessageEditList {...this.props} />
                <ChallengesSubmitButton {...this.props} issue={this.state}/>
            </React.Fragment>
        )
    }
}