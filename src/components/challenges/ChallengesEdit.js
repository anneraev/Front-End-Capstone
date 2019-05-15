import React, { Component } from "react";
import MessageEditList from "../messages/MessageEditList";
import checkInUpdate from "../../modules/checkInUpdate";

export default class ChallengeEdit extends Component {
    //gets Id.
    getId = () => {
        //id passed from Issue id.
        let id = parseInt(this.props.match.params.issueId);
        return id
    }

    //finds the current issue from Id and returns it.
    getIssue = () => {
        if (this.props.issues.length > 0) {
            const id = this.getId()
            return this.props.issues.find(issue => issue.id === id);
        } else {
            return 0
        }
    }

    //gets a list of messages associated with the current issue.
    getIssueMessages = () => {
        this.props.refreshMessagesList().then(() => {
            if (this.props.messages.length > 0) {
                const id = this.getId();
                return this.props.messages.filter(message => message.issueId === id)
            } else {
                return []
            }
        })
    }

    //current component state.
    state = {
        //reference to current issue object..
        issue: this.getIssue(),
        //reference to content of issue
        content: this.getIssue().content,
        //reference to active status of issue
        active: this.getIssue().active,
        //reference to the mssages associated with the current issue.
        messages: this.getIssueMessages(),
        //id of current issue.
        id: this.getId()
    }

    //called when anything changes in the input field.
    handleInput = (event) => {
        //creates a new object with the value from the entry field.
        const newContent = {
            content: event.target.value
        }
        //sets state content to the new object content.
        this.setState(newContent);
    }

    //delete issue and all associated messages. Also updates data.
    handleDelete = () => {
        this.props.deleteMessagesInMessageList(this.state.messages)
        this.props.deleteIssue(this.state.id).then(this.props.history.push("/profile"))
    }

    //changes active flag in state to state of the checkbox (boolean).
    toggleActive = (event) => {
        const checked = {
            active: event.target.checked
        }
        this.setState(checked);
    }

    componentWillMount(){
        checkInUpdate.stopUpdate()
    }

    //starts update and also clears previous issue from storage.
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history);
    }

    render() {
        console.log("props", this.props)
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
                <section>
                    <button onClick={() => this.props.updateIssue(this.state.issue).then(() => this.props.history.push("/profile"))}>
                        Update Challenge
                </button>
                </section>
                <React.Fragment>
                    <button onClick={this.handleDelete}>
                        Delete Challenge
                </button>
                </React.Fragment>
            </React.Fragment>
        )
    }
}