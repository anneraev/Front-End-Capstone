import React, { Component } from  "react";

export default class Home extends Component {
    render(){
        console.log(this.props)
        return(
            <React.Fragment>
                <div>
                    Home
                </div>
            </React.Fragment>
        )
    }
}