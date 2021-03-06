import React, { Component } from "react";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class Login extends Component {

    //component state. Logs state of interactive items.
    state = {
        email: "",
        password: "",
        loginMode: true,
        userName: "",
        name: ""
    }

    //sets email.
    handleEmail = (event) => {
        const loginState = {}
        loginState.email = event.target.value;
        this.setState(loginState)
    }

    //sets password from input.
    handlePassword = (event) => {
        const loginState = {}
        loginState.password = event.target.value;
        this.setState(loginState);
    }

    //sets state name from input.
    handleName = (event) => {
        const loginState = {}
        loginState.name = event.target.value;
        this.setState(loginState);
    }

    //sets state username from input.
    handleUserName = (event) => {
        const loginState = {}
        loginState.userName = event.target.value;
        this.setState(loginState);
    }

    //compares input email and password in state with email and password of the user passed to it.
    credentialsCheck = (user) => {
        if (user.email === this.state.email && user.password === this.state.password) {
            return true
        }
    }

    setUser = (user) => {
        sessionStorage.setItem("userId", user.id)
    }

    //logs in user after confirming that the user information entered matches a user in the database. Deletes the information from the input boxes and opens up the home page. Also called when a new user registers.
    login = () => {
        const loggedUser = this.props.users.find(user => {
            return this.credentialsCheck(user)
        })
        if (loggedUser) {
            alert("Success! Logging in...")
            this.setUser(loggedUser)
        } else {
            alert("Incorrect email and/or password. Please Try again.")
        }
        const loginState = {}
        loginState.email = "";
        loginState.password = "";
        this.setState(loginState);
        this.props.history.push("/");
    }

    //conditional checks that all forms are filled, then creates a new user from the form information.
    //Should probably include a way to confirm that the values of each form conform to a specific standard (i.e.: passwords have specific format, ect.)
    register = () => {
        if (this.state.user === "" || this.state.userName === "" || this.state.password === "" || this.state.email === "") {
            alert("Please fill out all required forms.")
        } else {
            const newUser = {
                email: this.state.email,
                userName: this.state.userName,
                name: this.state.name,
                password: this.state.password,
            }
            this.props.createNewUser(newUser).then(() => this.login())
        }
    }

    //conditional rendering based on loginMode, switches between elements for loging in and registering.
    logInMode = () => {
        if (this.state.loginMode === true) {
            return (
                <React.Fragment>
                    <Button onClick={this.login}>Submit</Button>
                    <Button onClick={this.toggleMode}>Registration</Button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="enter your name" onChange={this.handleName} value={this.state.name} />
                    <Label for="userName">User Name</Label>
                    <Input type="text" name="userName" id="userName" placeholder="enter a user name" onChange={this.handleUserName} value={this.state.userName} />
                    <Button onClick={this.register}>Register</Button>
                    <Button onClick={this.toggleMode}>Back to Log-In</Button>
                </React.Fragment>
            )
        }
    }

    //sets the page to registration mode.
    toggleMode = event => {
        event.preventDefault();
        const loginState = {}
        if (this.state.loginMode === false){
            loginState.loginMode = true
        } else {
            loginState.loginMode = false
        }
        this.setState(loginState);
    }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="ex. email@website.com" onChange={this.handleEmail} value={this.state.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="ex. passwordphrase123" onChange={this.handlePassword} value={this.state.password} />
                    </FormGroup>
                    {this.logInMode()}
                </Form>
            </React.Fragment>
        )
    }
}