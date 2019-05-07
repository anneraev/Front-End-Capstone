import React, { Component } from  "react";
import checkInUpdate from "../checkInUpdate"

export default class CheckInList extends Component {
    componentWillMount(){
        checkInUpdate.stopUpdate()
    }
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history)
    }

    createAlert = (checkIn) => {
            return(
                <React.Fragment>
                    <button>
                        {checkIn.alertTime}
                    </button>
                </React.Fragment>
            )
    }

    render(){
        return(
            <React.Fragment>
                <section>
                    {this.props.checkIns.map(checkIn =>
                        this.createAlert(checkIn)
                    )
                        }
                </section>
            </React.Fragment>
        )
    }
}