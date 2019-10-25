import React, { Component } from  "react";
import ChallengesList from "../challenges/ChallengesList";
import NewChallengeButton from "../challenges/NewChallengeButton";

export default class Profile extends Component {

    render(){
        return(
            <React.Fragment>
                < NewChallengeButton {...this.props} />
                < ChallengesList {...this.props} />
            </React.Fragment>
        )
    }
}