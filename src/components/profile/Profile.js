import React, { Component } from  "react";
import checkInUpdate from "../checkInUpdate"
import ChallengesList from "../challenges/ChallengesList";

export default class Profile extends Component {
    componentWillMount(){
        checkInUpdate.stopUpdate()
    }

    //starts update and also clears previous issue from storage.
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history);
    }

    render(){
        return(
            <React.Fragment>
                < ChallengesList {...this.props} />
            </React.Fragment>
        )
    }
}