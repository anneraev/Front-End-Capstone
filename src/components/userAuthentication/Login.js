import React, { Component } from "react";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class Login extends Component {
    loginState = {
        email: "",
        password: "",
        loginMode: true,
        userName: "",
        name: ""
    }

    //component state. Logs state of interactive items.
    state = {
        email: this.loginState.email,
        password: this.loginState.password,
        loginMode: this.loginState.loginMode,
        userName: this.loginState.userName,
        name: this.loginState.name
    }

    handleEmail = (event) => {
        this.loginState.email = event.target.value;
        this.setState(this.loginState)
    }

    handlePassword = (event) => {
        this.loginState.password = event.target.value;
        this.setState(this.loginState);
    }

    handleName = (event) => {
        this.loginState.name = event.target.value;
        this.setState(this.loginState);
    }

    handleUserName = (event) => {
        this.loginState.userName = event.target.value;
        this.setState(this.loginState);
    }

    credentialsCheck = (user) => {
        if (user.email === this.state.email && user.password === this.state.password) {
            return true
        }
    }

    setUser = (user) => {
        sessionStorage.setItem("userId", user.id)
    }

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
        this.loginState.email = "";
        this.loginState.password = "";
        this.setState(this.loginState);
        this.props.history.push("/");
    }

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
        if (this.loginState.loginMode === false){
            this.loginState.loginMode = true
        } else {
            this.loginState.loginMode = false
        }
        this.setState(this.loginState);
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