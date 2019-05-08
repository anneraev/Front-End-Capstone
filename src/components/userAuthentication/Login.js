import React, { Component } from "react";

import { Button, Form, FormGroup, Label, Input} from "reactstrap";

export default class Login extends Component {
    loginState = {
        email: "",
        password: "",
    }

    state = {
        email: this.loginState.email,
        password: this.loginState.password
    }

    handleEmail = (event) => {
        this.loginState.email = event.target.value;
        this.setState(this.loginState)
    }

    handlePassword = (event) => {
        this.loginState.password = event.target.value;
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

    render() {
        return (
            <React.Fragment>
                <Form>
                    <FormGroup>
                        <Label for="userEmail">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="ex. email@website.com" onChange={this.handleEmail} value={this.state.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userPassword">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="ex. passwordphrase123" onChange={this.handlePassword} value={this.state.password}/>
                    </FormGroup>
                    <Button id="0" onClick={this.login}>Submit</Button>
                </Form>
                </React.Fragment>
        )
    }
}