import React, { useState } from "react";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

      const handleClick = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        
        fetch('/api/create-user', requestOptions).then((response) => 
        response.json()
        ).then( (data) => console.log(data));
        setOpen(false);
      };

      const handleEmail = (event) => {
        setEmail(event.target.email);
      };

      const handlePassword = (event) => {
        setPassword(event.target.password);
      };

    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
              <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleEmail}
                            variant="standard"
                        />
                </Grid>
              <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="text"
                            value={password}
                            onChange={handlePassword}
                            variant="standard"
                        />
              </Grid>
              <Grid item xs={12}><Button variant="contained" color="primary" onClick={handleClick}>Login</Button></Grid>
              
        </Grid>
    );

}

export default Login;