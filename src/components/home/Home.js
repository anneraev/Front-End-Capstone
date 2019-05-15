import React, { Component } from  "react";
import ChallengesList from "../challenges/ChallengesList";
import checkInUpdate from "../../modules/checkInUpdate"
import NewChallengeButton from "../challenges/NewChallengeButton";

export default class Home extends Component {
    //stops update before component renders.
    componentWillMount(){
        checkInUpdate.stopUpdate()
    }
    //starts update after component renders. Passes current history so that update can utilize it for redirects.
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history)
    }

    ifNoChallenges = () => {
        const user = this.props.getUser()
        if (!this.props.issues || !this.props.issues.find(issue => issue.userId === user)){
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
                <h1>How are you doing?</h1>
                {/* passes props object to challengesList, including History and all properties defined the route for this current page (in this case, "users" and "messages".) All can be accessed with dot notation. */}
                <ChallengesList {...this.props} />
                {this.ifNoChallenges()}
            </React.Fragment>
        )
    }
}