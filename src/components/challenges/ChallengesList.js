import React, { Component } from "react";

export default class ChallengesList extends Component {
    render(){
        //renders section with .map function that creates an array of items with JSX wrappers from the items inside the array of objects specified.
        return(
            <React.Fragment>
                <section>
                    {
                        this.props.challenges.map(challenge =>
                            <button key={challenge.id} onClick={() => this.props.history.push(`/challenges/${challenge.id}`)}>
                                {challenge.content}
                            </button>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}