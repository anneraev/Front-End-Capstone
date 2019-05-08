import React, { Component } from "react";
import ChallengesSubmitButton from "./ChallengesSubmitButton";
import MessageEditList from "../messages/MessageEditList";

export default class ChallengeEdit extends Component {
    loadActiveState = () => {
        if (!sessionStorage.getItem("currentActive")) {
            sessionStorage.setItem("currentActive", this.props.issues.find(issue => issue.id === parseInt(this.props.match.params.issueId)).active);
        }
        if (sessionStorage.getItem("currentActive") === "true") {
            return true
        } else {
            return false
        }
    }

    loadContentState = () => {
        if (sessionStorage.getItem("currentContent")) {
            return sessionStorage.getItem("currentContent")
        }
        else {
            console.log("fucking props", this.props)
            sessionStorage.setItem("currentContent", this.props.issues.find(issue => issue.id === parseInt(this.props.match.params.issueId)).content);
            return sessionStorage.getItem("currentContent")
        }
    }

    loadIdState = () => {
        if (sessionStorage.getItem("currentId")) {
            return sessionStorage.getItem("currentId")
        }
        else {
            sessionStorage.setItem("currentId", parseInt(this.props.match.params.issueId));
            return sessionStorage.getItem("currentId")
        }
    }

    //state references this object.
    issueState = {
        content: this.loadContentState(),
        id: this.loadIdState(),
        active: this.loadActiveState()
    }

    //current component state.
    state = {
        content: this.issueState.content,
        userId: 1,
        active: this.issueState.active,
        id: this.issueState.id
    }

    //called when anything changes in the input field. Updates the issue object state internal to this, then loads the sets the actual state to that object, then sets item in session storage for retrieval in case the page reloads for whatever reason (storage is deleted when navigating to profile page).
    handleInput = (event) => {
        this.issueState.content = event.target.value;
        this.setState(this.issueState);
        sessionStorage.setItem("currentContent", this.issueState.cotent);
    }

    //delete issue and all associated messages.
    handleDelete = () => {
        const id = this.issueState.id;
        const associatedMessagesArray = this.props.messages.filter(message => message.issueId === id)
        this.props.deleteIssue(id).then(() => this.props.updateData()).then(() => this.props.history.push("/profile"))
        associatedMessagesArray.forEach(message => {
            this.props.deleteMessage(message.id);
        })
    }

    //changes active flag in state so that it will be udpated when the user clicks "update".
    toggleActive = (event) => {
        this.issueState.active = event.target.checked;
        sessionStorage.setItem("currentActive", this.issueState.active)
        this.setState(this.issueState);
        console.log("issueState", this.issueState.active)
        console.log("state", this.state)
        console.log("storage", sessionStorage.getItem("currentActive"))
    }

    //on Change takes a reference to a function that runs when something changes in the input field. Ref takes an anonymous callback function, in this case it creates a key/value pair belonging to this object, and passes a reference to that function to set the value to a reference to the element.
    render() {
        return (
            <React.Fragment>
                <div>
                    <span>Active?</span>
                    <input type="checkbox" id={this.props.match.params.issueId} checked={this.state.active} onChange={this.toggleActive}></input>
                </div>
                <section className="form-group">
                    <input type="text" required className="form-control" onChange={this.handleInput} id="content" placeholder="What would you like help with?" value={this.state.content}>
                    </input>
                </section>
                <MessageEditList {...this.props} />
                <ChallengesSubmitButton {...this.props} issue={this.state} />
                <button onClick={this.handleDelete}>
                    Delete Challenge
                </button>
            </React.Fragment>
        )
    }
}