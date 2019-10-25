import React, {
    Component
} from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import CheckInList from "../checkIns/CheckInList";
import ChallengeEdit from "../challenges/ChallengesEdit";
import LogOut from "../userAuthentication/LogOut";

//this component exists to update time and compare it to the list of check in times. It controls the rendering of all components based on its state.
export default class MasterUpdateCheckin extends Component {
    constructor() {
        super()
        //initialize state
        this.state = {
        stage: "dashboard",
        };
        this.timeSeconds = null;
        this.startTimer(this);
    }

    startTimer = function(context) {
        console.log("starting")
        setTimeout(function tick() {
            context.update();
            setTimeout(tick, 1000);
        }, 1000);
    }

    update = function () {
        //get current time.
        const now = new Date();
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        const hoursSeconds = (hours * 60) * 60
        const minutesSeconds = minutes * 60
        const time = hoursSeconds + minutesSeconds + seconds
        this.timeSeconds = time;
        console.log(time);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/dashboard" render={props => {
                    return < Redirect to="/" />
                }} />)
                <Route exact path="/" render={props => {
                    //if no stage, go to home.
                    if (this.state.stage === null) {
                        return <Home {...props} checkIns={this.state.checkIns} issues={this.state.issues} messages={this.state.messages} users={this.state.users} isUser={this.isUser} postIssue={this.postIssue} getUser={this.getUser} />
                    }
                }} />
                <Route exact path="/profile" render={props => {
                    return <Profile {...props} issues={this.state.issues} messages={this.state.messages} users={this.state.users} postIssue={this.postIssue} clearIssueStorage={this.clearIssueStorage} isUser={this.isUser} />
                }} />
                <Route exact path="/profile/challenges/:issueId(\d+)" render={props => {
                    return <ChallengeEdit {...props} issues={this.state.issues} messages={this.state.messages} updateIssue={this.updateIssue} updateData={this.updateData} createNewMessage={this.createNewMessage} updateMessage={this.updateMessage} deleteSingleMessage={this.deleteSingleMessage} deleteIssue={this.deleteIssue} isUser={this.isUser} deleteMessagesInMessageList={this.deleteMessagesInMessageList} refreshMessagesList={this.refreshMessagesList} />
                }
                } />
                <Route exact path="/checkins" render={props => {
                    return < CheckInList {...props} checkIns={this.state.checkIns} users={this.state.users} postCheckIn={this.postCheckIn} updateCheckIn={this.updateCheckIn} deleteCheckIn={this.deleteCheckIn} isUser={this.isUser} />
                }} />
                <Route exact path="/logOut" render={props => {
                    return < LogOut {...props} isAuthenticated={this.isAuthenticated} />
                }} />
            </React.Fragment>
        )
    }
}