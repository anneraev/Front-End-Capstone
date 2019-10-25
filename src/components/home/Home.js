import React, { Component } from  "react";
import ChallengesList from "../challenges/ChallengesList";
import NewChallengeButton from "../challenges/NewChallengeButton";

export default class Home extends Component {
    ifNoChallenges = () => {
        const user = this.props.getUser()
        if (!this.props.issues || !this.props.issues.find(issue => issue.userId === user && issue.active === true)){
            return (
                <React.Fragment>
                    < NewChallengeButton {...this.props} />
                </React.Fragment>
            )
        }
    }

    render(){
        return(
            <React.Fragment>
                {this.ifNoChallenges()}
                {/* passes props object to challengesList, including History and all properties defined the route for this current page (in this case, "users" and "messages".) All can be accessed with dot notation. */}
                <ChallengesList {...this.props} />
            </React.Fragment>
        )
    }
}