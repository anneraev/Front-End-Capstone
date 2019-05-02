import React, { Component } from  "react";
import ChallengesList from "../challenges/ChallengesList";

export default class Home extends Component {
    render(){
        console.log(this.props)
        return(
            <React.Fragment>
                <h1>How are you doing?</h1>
                <ChallengesList {...this.props} />
            </React.Fragment>
        )
    }
}