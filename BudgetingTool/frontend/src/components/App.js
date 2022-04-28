import React from "react";
import { render } from "react-dom";
import Homepage from './Homepage';
import Navbar from './Navbar';
import { BrowserRouter } from "react-router-dom";



function App(){

        return (
        <div>
            <div>
                {/* <Navbar /> */}
            </div>
            <div className="center">
                {/* <Navbar /> */}
                <Homepage />
            </div>
        </div>
        );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);