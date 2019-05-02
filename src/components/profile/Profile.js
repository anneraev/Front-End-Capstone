import React, { Component } from  "react";
import checkInUpdate from "../checkInUpdate"

export default class Profile extends Component {
    componentWillMount(){
        checkInUpdate.stopUpdate()
    }
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history)
    }

    render(){
        return(
            <React.Fragment>
                <div>
                    Profile
                </div>
            </React.Fragment>
        )
    }
}