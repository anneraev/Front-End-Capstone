import React, { Component } from  "react";
import checkInUpdate from "../checkInUpdate"
import ChallengesList from "../challenges/ChallengesList";

export default class Profile extends Component {
    componentWillMount(){
        checkInUpdate.stopUpdate()
    }
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history)
        this.props.clearIssueStorage();
    }

    render(){
        console.log(this.props.currentIssueMessageArray)
        return(
            <React.Fragment>
                < ChallengesList {...this.props} />
            </React.Fragment>
        )
    }
}