import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import Capstone from "./components/Capstone"
import 'bootstrap/dist/css/bootstrap.css';

//Renders elements to the dom. First argument are the imported elements (containing their children), second argument is the target which, in this case, is a callback function to get a reference to the container element with an id of "root".
ReactDOM.render(
    <Router>
        <Capstone />
    </Router>
    , document.getElementById('root')
)