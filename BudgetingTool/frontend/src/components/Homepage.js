import React from "react";
import { BrowserRouter as Router, Routes, Link, Route, Redirect } from "react-router-dom";
import Income from "./Income";
import Login from "./Login";
import Signup from "./Signup";

function Homepage(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<p>Homepage</p>}></Route>
                <Route path='/income' element={<Income />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
            </Routes>
        </Router>
    );
}

export default Homepage;