import React, { Component } from "react";
import ChallengesSubmitButton from "./ChallengesSubmitButton";
import MessageEditList from "../messages/MessageEditList";

export default class ChallengeEdit extends Component {
    //finds the current issue from Id and returns it.
    getIssue = () => {
        return this.props.issues.find(issue => issue.id === parseInt(this.props.match.params.issueId))
    }

    //session storage prevents problems with reloading page. A lot of data needs to remain persistent because messages are tied to issues and not to user.
    loadContent = (type) => {
        if (sessionStorage.getItem(`current${type}`)) {
            return sessionStorage.getItem(`current${type}`)
        }
        else {
            const issue = this.getIssue()
            if (issue) {
            sessionStorage.setItem(`current${type}`, issue[type]);
            console.log(issue[type])
            } else {
                sessionStorage.setItem(`current${type}`, () => {
                    if (type === "active"){
                        return true
                    } else {
                        return ""
                    }
                })
            }
            const storedItem = sessionStorage.getItem(`current${type}`)
            if (storedItem === "true") {
                return true
            }
            else if (storedItem === "false"){
                return false
            } else {
                return storedItem
            }
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
        content: this.loadContent("content"),
        id: this.loadIdState(),
        active: this.loadContent("active"),
    }

    //current component state.
    state = {
        content: this.issueState.content,
        active: this.issueState.active,
        id: this.issueState.id,
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
    }

    //on Change takes a reference to a function that runs when something changes in the input field. In this case it creates a key/value pair belonging to this object, and passes a reference to that function to set the value to a reference to the element.
    render() {
        console.log(this.state)
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