import React, { Component } from "react";
import NewChallengeButton from "./NewChallengeButton";

export default class ChallengesList extends Component {
    //clicking button will redirect to different page based on the URL of the page the buttons are displayed on. In "Home", displays read-only messages. From "profile", messages and issues are editable. Looks for string in pathname.
    //currently, it filters out data based in userId, however in the future I should refactor so that it filters the array of data first by userId and then passes THAT array as props.
    challengeListButtonHandler = (issue) => {
        console.log(this.props);
        if (this.props.history.location.pathname === "/profile" && this.props.isUser(issue)) {
            return (<button key={issue.id} onClick={() => this.props.history.push(`profile/challenges/${issue.id}`)}>
            {issue.content}
        </button>)
        } else {
            if (this.props.isUser(issue) && issue.active === true) {
        return (<button key={issue.id} onClick={() => this.props.history.push(`/challenge-messages/${issue.id}`)}>
            {issue.content}
        </button>)
            }
        }
    }

    //adds new challenge button only on profile.
    addNewChallengeButtonOnProfile = () => {
        if (this.props.history.location.pathname === "/profile") {
            return < NewChallengeButton {...this.props}/>
        }
    }

    render() {
        //renders section with .map function that creates an array of items with JSX wrappers from the items inside the array of objects specified.
        return (
            <React.Fragment>
                <section>
                    {
                        this.props.issues.map(issue => this.challengeListButtonHandler(issue))
                    }
                </section>
                {this.addNewChallengeButtonOnProfile()}
            </React.Fragment>
        )
    }
}