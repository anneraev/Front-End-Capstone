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
        console.log(checkIn.id)
            return(
                <React.Fragment>
                    <button key={checkIn.id} id={checkIn.id}>
                        {checkIn.alertTime}
                    </button>
                </React.Fragment>
            )
    }

    constructNewAlert = event => {
        event.preventDefault()
        const alert = {
            userId: 1,
            alertTime: "12:00:00 AM"
        }
        const newId = this.props.checkIns.length + 1
        this.props.postCheckIn(alert).then(() => this.props.history.push(`checkIns/edit/${newId}`));
    }

    render(){
        return(
            <React.Fragment>
                <section>
                    {this.props.checkIns.map(checkIn =>
                        this.createAlert(checkIn))
                        }
                </section>
                <button id="0" key="0" onClick={this.constructNewAlert}>
                    New Alert
                </button>
            </React.Fragment>
        )
    }
}