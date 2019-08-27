import React, { Component } from "react";
import MessageEditList from "../messages/MessageEditList";
import checkInUpdate from "../../modules/checkInUpdate";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';


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
        if (this.props.messages && this.props.messages.length > 0) {
            const id = this.getId();
            const messages = this.props.messages.filter(message => message.issueId === id)
            console.log(messages)
            return messages
        } else {
            return []
        }
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
        const newMessagesList = this.getIssueMessages()
        this.props.deleteMessagesInMessageList(newMessagesList).then(this.props.deleteIssue(this.state.id).then(this.props.history.push("/profile"))
        )
    }

    updateChallenge = () => {
        const newMessagesList = this.getIssueMessages()
        const issueChange = {
            content: this.state.content,
            active: this.state.active
        }
        if (this.state.content === "") {
            issueChange.content = this.state.issue.content
        }
        if (!newMessagesList || newMessagesList === []) {
            alert("If you want, you can create a list of messages to remind you how to focus your mind on what will help you navigate your challenges.")
        }
        this.props.updateIssue(this.state.id, issueChange).then(() => this.props.history.push("/profile"))
    }

    //changes active flag in state to state of the checkbox (boolean).
    toggleActive = (event) => {
        const checked = {
            active: event.target.checked
        }
        this.setState(checked);
    }

    componentWillMount() {
        checkInUpdate.stopUpdate()
        this.props.refreshMessagesList()
    }

    //starts update and also clears previous issue from storage.
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history);
    }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <FormGroup check className="active-div">
                        <Label check>
                            <Input className="active-check" type="checkbox" id={this.props.match.params.issueId} checked={this.state.active} onChange={this.toggleActive}></Input>
                        <span className="active-label">Active?</span>
                        </Label>
                    </FormGroup>
                <FormGroup>
                    <Input type="text" required className="form-control" onChange={this.handleInput} id="content" placeholder="What would you like help with?" value={this.state.content}>
                    </Input>
                </FormGroup>
                <MessageEditList {...this.props} />
                <FormGroup>
                    <Button onClick={this.updateChallenge}>
                        Update Challenge
                </Button>
                </FormGroup>
                    <Button onClick={this.handleDelete}>
                        Delete Challenge
                </Button>
                </Form>
            </React.Fragment>
        )
    }
}