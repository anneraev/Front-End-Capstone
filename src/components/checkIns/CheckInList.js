import React, { Component } from  "react";
import checkInUpdate from "../checkInUpdate"

export default class CheckInList extends Component {
    alertState = {
        id: 0,
        alertTime: "12:00",
        userId: 1
    }

    state = {
        id: this.alertState.id,
        alertTime: this.alertState.alertTime,
        userId: this.alertState.userId
    }

    componentWillMount(){
        checkInUpdate.stopUpdate()
    }
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history)
    }

    //sets state based on what alarm button has been pressed, so that the corresponding data will be altered when alert time is updated. Also sets the default posiiton of the clock.
    setCurrentCheckIn = event => {
        const id = parseInt(event.target.id);
        this.alertState.id = id;
        const time = this.props.checkIns.find(checkin => checkin.id === this.alertState.id).alertTime
        this.alertState.alertTime = time;
        this.setState(this.alertState)
    }

    //creates an alert button.
    createAlert = (checkIn) => {
        console.log(checkIn.id)
            return(
                <React.Fragment>
                    <button key={checkIn.alertTime} id={checkIn.id} onClick={this.setCurrentCheckIn}>
                        {checkIn.alertTime}
                    </button>
                </React.Fragment>
            )
    }

    //creates a new alert time from state and posts it to the API. Also sets the current ID to the new item's ID so the editing interface is brought up.
    constructNewAlert = event => {
        event.preventDefault()
        const alert = {
            userId: this.state.userId,
            alertTime: this.state.alertTime
        }
        let newId = this.props.checkIns.map(checkIn => {
            return checkIn.id
        })
        newId = Math.max.apply(null, newId)
        newId += 1
        this.alertState.id = newId
        this.props.postCheckIn(alert)
        this.setState(this.alertState)
    }

    //patches update and resets state to defualt values.
    updateAlert = () => {
        this.props.updateCheckIn(this.state).then(() => {
            this.alertState.alertTime = "12:00"
            this.alertState.id = 0;
            this.setState(this.alertState);
        });
    }

    //calls an alert to be deleted from the data, then resets the state of this component.
    deleteAlert = () => {
        this.props.deleteCheckIn(this.state.id).then(() => {
            this.alertState.alertTime = "12:00"
            this.alertState.id = 0;
            this.setState(this.alertState);
        });
    }

    //called when the clock is altered, updates state.
    handleChange = (event) => {
        event.preventDefault()
        const time = event.target.value
        this.alertState.alertTime = time
        this.setState(this.alertState);
    }

    //build's a list of interractive elements centered around setting alert. Only renders when there's an active alert item (id !== 0).
    createAlertItems = () => {
        if (this.state.id !== 0){
            return (
            <React.Fragment>
            <input type="time" value={this.state.alertTime} onChange={this.handleChange}></input>
            <button onClick={this.updateAlert}>
                Update
            </button>
            <button onClick={this.deleteAlert}>
                Delete
            </button>
            </React.Fragment>
            )
        }
    }

    render(){
        console.log("checkin", this.props)
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
            {this.createAlertItems()}
            </React.Fragment>
        )
    }
}