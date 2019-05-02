import React, { Component } from  "react";
import ChallengesList from "../challenges/ChallengesList";
import checkInUpdate from "../checkInUpdate"

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
        console.log(this.props)
        return(
            <React.Fragment>
                <h1>How are you doing?</h1>
                <ChallengesList {...this.props} />
            </React.Fragment>
        )
    }
}