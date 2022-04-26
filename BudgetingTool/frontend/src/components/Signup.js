import React, { useState } from "react";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox, FormControl } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";

function Signup(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

      const handleClick = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        
        fetch('/api/create-user', requestOptions).then((response) => {
          if(response.ok){
            navigate('/income')

          } else{
              
          }
      }).catch((error) => {
        console.log(error);
      });
      };

      const handleEmail = (event) => {
        setEmail(event.target.value);
      };

      const handlePassword = (event) => {
        setPassword(event.target.value);
      };

    return(
        <Grid container spacing={1} align="center">
            
            <Grid item xs={12}>
              <TextField
                            autoFocus
                            margin="normal"
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
                            margin="normal"
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePassword}
                            variant="standard"
                        />
              </Grid>
              <Grid item xs={12}><Button variant="contained" color="primary" onClick={handleClick}>Signup</Button></Grid>
            
              
        </Grid>
    );

}

export default Signup;