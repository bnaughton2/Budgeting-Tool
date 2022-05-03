import React, { useState } from "react";
import { useNavigate } from "react-router";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox, FormControl } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";

function Signup(){
    const [email, setEmail] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    let navigate = useNavigate();

      const handleClick = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        
        if(confirmPassword == password){
          fetch('/api/create-user', requestOptions).then((response) => {
            if(response.ok){
              navigate('/dashboard')
  
            } else{
                
            }
            }).catch((error) => {
              console.log(error);
              
            });
        } else{
          setOpen(true);
        }

      };

      const handleClose = (event) => {
        setOpen(false);
      };

      const handleEmail = (event) => {
        setEmail(event.target.value);
      };

      const handlePassword = (event) => {
        setPassword(event.target.value);
      };

      const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
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
              <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            variant="standard"
                        />
              </Grid>
              <Grid item xs={12}><Button variant="contained" color="primary" type="submit" onClick={handleClick}>Signup</Button></Grid>
              <Dialog open={open} onClose={handleClose}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>Passwords don't match.</strong>
                </Alert>
              </Dialog>
            
              
        </Grid>
    );

}

export default Signup;