import React, { Component } from "react";
import ChallengesSubmitButton from "./ChallengesSubmitButton";
import MessageEditList from "../messages/MessageEditList";

export default class ChallengeEdit extends Component {
    //issue object state

    loadContentState = () => {
        console.log("running");
        if (sessionStorage.getItem("currentContent")) {
            return sessionStorage.getItem("currentContent")
        }
        else {
            sessionStorage.setItem("currentContent", this.props.issues[this.props.match.params.issueId - 1].content);
            return sessionStorage.getItem("currentContent")
        }
    }

    loadIdState = () => {
        if (sessionStorage.getItem("currentId")) {
            return sessionStorage.getItem("currentId")
        }
        else {
            sessionStorage.setItem("currentId", this.props.match.params.issueId);
            return sessionStorage.getItem("currentId")
        }
    }

    issueState = {
        content: this.loadContentState(),
        id: this.loadIdState()
    }

    state = {
        content: this.issueState.content,
        userId: 1,
        active: true,
        id: this.issueState.id
    }

    //called when anything changes in the input field. Updates the issue object state internal to this, then loads the sets the actual state to that object, then sets item in session storage for retrieval in case the page reloads for whatever reason (storage is deleted when navigating to profile page).
    handleInput = (event) => {
        this.issueState.content = event.target.value;
        this.setState(this.issueState);
        sessionStorage.setItem("currentContent", this.issueState.cotent);
        console.log("currentEditStat", this.state);
    }

    //on Change takes a reference to a function that runs when something changes in the input field. Ref takes an anonymous callback function, in this case it creates a key/value pair belonging to this object, and passes a reference to that function to set the value to a reference to the element.
    render() {
        return (
            <React.Fragment>
                <section className="form-group">
                    <input type="text" required className="form-control" onChange={this.handleInput} id="content" placeholder="What would you like help with?" value={this.state.content}>
                    </input>
                </section>
                <MessageEditList {...this.props} />
                <ChallengesSubmitButton {...this.props} issue={this.state} />
            </React.Fragment>
        )
    }
}