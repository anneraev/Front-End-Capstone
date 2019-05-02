import React, { Component } from  "react";
import checkInUpdate from "../checkInUpdate"

export default class CheckInList extends Component {
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
                    Check-in List
                </div>
            </React.Fragment>
        )
    }
}