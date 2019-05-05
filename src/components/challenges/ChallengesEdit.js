import React, { Component } from "react";
import ChallengesSubmitButton from "./ChallengesSubmitButton";

//challengeEdit/new
//challengeEdit/num

//Change post/patch feature based on whether or not there's a /new at the end of the URL.

export default class ChallengeEdit extends Component {
    //issue object state
    state = {
        content: "",
        userId: 1,
        active: true
    }

    //called when anything changes in the input field. Updates the issue object state internal to this component. The event targets ID becomes the key name and the value becomes the value of the key.
    handleInput = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //conditional checks if there is content to post, then creates an object from state calls postIssue in ApplicationViews from props. Sets the value of the input to blank. The reference challengeInput is defined as an attribute of the JSX element (ref=). Finally, after the API returns a response, the URL is set back to /profile.
    constructNewIssue = event => {
        event.preventDefault()
        if (this.state.content === "") {
            window.alert("It's empty.")
        } else {
            const issue = {
                content: this.state.content,
                userId: this.state.userId,
                active: this.state.active,
            }
            this.challengeInput.value = ""
            this.props.postIssue(issue).then(() => this.props.history.push("/profile"));
        }
    }

    //on Change takes a reference to a function that runs when something changes in the input field. Ref takes an anonymous callback function, in this case it creates a key/value pair belonging to this object, and passes a reference to that function to set the value to a reference to the element.
    render () {
        console.log(this.props)
        return(
            <React.Fragment>
            <section className="form-group">
            <input type="text" required className="form-control" onChange={this.handleInput} id="content" placeholder="What would you like help with?" ref={(element) => this.challengeInput = element}>
            </input>
            </section>
            <ChallengesSubmitButton {...this.props} constructNewIssue={this.constructNewIssue}/>
            </React.Fragment>
        )
    }
}