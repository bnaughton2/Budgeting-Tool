import React from "react";
import { BrowserRouter as Router, Routes, Link, Route, Redirect } from "react-router-dom";
import Income from "./Income";
import Login from "./Login";
import Signup from "./Signup";
import Bill from "./Bill";
import Navbar from './Navbar';
import Goal from './Goal';
import Dashboard from './Dashboard';

function Homepage(){
    return(
        <Router>
            <div className='nav'>
                <Navbar />
            </div>
            <Routes>
                <Route path='/' element={<div className='center'><p>Homepage</p></div>}></Route>
                <Route path='/income' element={<div className='center'><Income /></div>}></Route>
                <Route path='/login' element={<div className='center'><Login /></div>}></Route>
                <Route path='/signup' element={<div className='center'><Signup /></div>}></Route>
                <Route path='/bill' element={<div className='center'><Bill /></div>}></Route>
                <Route path='/goal' element={<div className='center'><Goal /></div>}></Route>
                <Route path='/dashboard' element={<div className='center'><Dashboard /></div>}></Route>
            </Routes>
        </Router>
    );
}

export default Homepage;