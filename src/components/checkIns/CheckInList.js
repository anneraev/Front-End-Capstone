import React, { Component } from "react";
import checkInUpdate from "../../modules/checkInUpdate"

export default class CheckInList extends Component {
    state = {
        id: 0,
        alertTime: "12:00",
        userId: parseInt(sessionStorage.getItem("userId")),
        alertSeconds: 43200
    }

    componentWillMount() {
        checkInUpdate.stopUpdate()
    }
    componentDidMount() {
        checkInUpdate.startUpdate(this.props.history)
    }

    //creates a string that matches how the clock input reads time.
    getClockReadableAlertTime = (time) => {
        console.log("stored time", time)
        const justTime = time.split(" ")
        console.log(justTime)
        const justTimeNumbers = justTime[0].split(":")
        const meridiem = justTime[1]
        let hours = parseInt(justTimeNumbers[0])
        let minutes = parseInt(justTimeNumbers[1])
        console.log(hours, minutes)
        if (meridiem === "PM") {
            hours += 12
        }
        if (hours <= 9) {
            hours = `0${hours}`
        } else if (hours === 24) {
            hours = "12"
        } else if (hours === 12 && meridiem === "AM") {
            hours = "00"
        }
        if (minutes <= 9) {
            minutes = `0${minutes}`
        }
        console.log("readable alert time", `${hours}:${minutes}`)
        return `${hours}:${minutes}`
    }

    //sets state based on what alarm button has been pressed.
    setCurrentCheckIn = event => {
        const newState = {
            id: parseInt(event.target.id)
        }
        //sets value to current alert time.
        const time = this.props.checkIns.find(checkin => checkin.id === newState.id).alertTime
        const currentTime = this.getClockReadableAlertTime(time);
        newState.alertTime = currentTime;
        this.setState(newState);
    }

    //creates an alert button.
    createAlert = (checkIn) => {
        if (this.props.isUser(checkIn)) {
            return (
                <React.Fragment>
                    <button key={checkIn.alertTime} id={checkIn.id} onClick={this.setCurrentCheckIn}>
                        {checkIn.alertTime}
                    </button>
                </React.Fragment>
            )
        }
    }

    //called when the clock is altered, updates state.
    handleChange = (event) => {
        event.preventDefault()
        const time = event.target.value
        const newState = {
            alertTime: time
        }
        this.setState(newState);
        console.log("new state", newState)
        console.log("current state", this.state);
    }

    //resets state to default, triggering rerender and setting id to 0, so that user is no longer accessing that checkIn in the edit feature.
    resetState = () => {
        const newState = {
            alertTime: "12:00",
            id: 0,
            alertSeconds: 43200
        }
        this.setState(newState);
    }

    //creates a string that matches how people commonly read time on a clock from the current alert time created by interracting with the clock input, and stores it in an object along with the other information from state, then returns that object (which represents the data as it will be stored in the API.)
    getHumanReadableAlertState = () => {
        const alert = {
            userId: this.state.userId,
            alertTime: this.state.alertTime,
            alertSeconds: 0,
        }
        console.log("alert time", this.state.alertTime)
        const alertNumbers = alert.alertTime.split(":")
        let hours = parseInt(alertNumbers[0])
        console.log(hours)
        let minutes = parseInt(alertNumbers[1])
        console.log(minutes)
        const hoursSeconds = (hours * 60) * 60
        const minutesSeconds = minutes * 60
        console.log("time", hoursSeconds, minutesSeconds)
        let meridiem
        if (hours >= 12) {
            meridiem = "PM"
            if (hours > 12) {
                hours -= 12
            }
        } else {
            meridiem = "AM"
            if (hours === 0) {
                hours = "12"
            }
        }
        if (minutes <= 9) {
            minutes = `0${minutes}`
        }
        alert.alertSeconds = hoursSeconds + minutesSeconds
        alert.alertTime = `${hours}:${minutes} ${meridiem}`
        return alert
    }

    //creates a new alert time from state and posts it to the API.
    constructNewAlert = event => {
        event.preventDefault()
        const alert = this.getHumanReadableAlertState()
        this.props.postCheckIn(alert).then(() => this.resetState())
    }

    //patches update and resets state to defualt values.
    updateAlert = () => {
        const newState = this.getHumanReadableAlertState()
        console.log("newState", newState)
        this.props.updateCheckIn(this.state.id, newState).then(() => this.resetState());
    }

    //calls an alert to be deleted from the data, then resets the state of this component.
    deleteAlert = () => {
        this.props.deleteCheckIn(this.state.id).then(() => this.resetState());
    }

    //renders interractive elements for updating or deleting an alert.
    createAlertItems = () => {
        //Only renders when there's an active alert item (id !== 0).
        if (this.state.id !== 0) {
            return (
                <React.Fragment>
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

    render() {
        return (
            <React.Fragment>
                <section>
                    {this.props.checkIns.map(checkIn =>
                        this.createAlert(checkIn))
                    }
                </section>
                <button id="0" key="0" onClick={this.constructNewAlert}>
                    New Alert
                </button>
                <input type="time" value={this.state.alertTime} onChange={this.handleChange}></input>
                {this.createAlertItems()}
            </React.Fragment>
        )
    }
}