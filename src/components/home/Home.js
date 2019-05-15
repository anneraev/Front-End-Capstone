import React, { Component } from  "react";
import ChallengesList from "../challenges/ChallengesList";
import checkInUpdate from "../../modules/checkInUpdate"

export default class Home extends Component {
    //stops update before component renders.
    componentWillMount(){
        checkInUpdate.stopUpdate()
    }
    //starts update after component renders. Passes current history so that update can utilize it for redirects.
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history)
    }

    render(){
        return(
            <React.Fragment>
                <h1>How are you doing?</h1>
                {/* passes props object to challengesList, including History and all properties defined the route for this current page (in this case, "users" and "messages".) All can be accessed with dot notation. */}
                <ChallengesList {...this.props} />
            </React.Fragment>
        )
    }
}