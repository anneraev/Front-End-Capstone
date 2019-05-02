import React, { Component } from "react";
import ApplicationViews from "./ApplicationViews";
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./nav/NavBar";

//alias of orginal component class in react.
export default class Capstone extends Component {
    //render method from Component, called when state is updated from componentDidMount.
    render() {
        //Renders ApplicationViews and all of its child components.
        return(
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}