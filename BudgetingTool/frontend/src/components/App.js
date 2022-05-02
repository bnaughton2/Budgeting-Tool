import React from "react";
import { render } from "react-dom";
import Homepage from './Homepage';
import Navbar from './Navbar';
import { BrowserRouter } from "react-router-dom";



function App(){

        return (
        <div>
            <Homepage />
        </div>
        );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);