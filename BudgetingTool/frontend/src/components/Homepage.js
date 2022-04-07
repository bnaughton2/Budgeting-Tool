import React from "react";
import { BrowserRouter as Router, Routes, Link, Route, Redirect } from "react-router-dom";
import Income from "./Income";

function Homepage(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<p>Homepage</p>}></Route>
                <Route path='/income' element={<Income />}></Route>
                {/* <Route path='/create' element={<CreateRoomPage />}></Route> */}
                {/* <Route path='/room/:roomCode' element={<Room />}></Route> */}
            </Routes>
        </Router>
    );
}

export default Homepage;