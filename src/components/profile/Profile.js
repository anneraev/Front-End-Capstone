import React, { Component } from  "react";
import checkInUpdate from "../../modules/checkInUpdate"
import ChallengesList from "../challenges/ChallengesList";
import NewChallengeButton from "../challenges/NewChallengeButton";

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
                < NewChallengeButton {...this.props} />
                < ChallengesList {...this.props} />
            </React.Fragment>
        )
    }
}