// Importing files from Material-UI
import React from 'react';
import { useNavigate } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {TextField, Button, Grid, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { ClassNames } from '@emotion/react';
  
//Using Inline Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));
  
// Exporting Default Navbar to the App.js File
export default function Navbar() {
    const classes = useStyles();
    // const navigate = useNavigate();
    const handleIncome = (event) => {
    //     navigate('/income');
      };
  
  return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense" >

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography variant="h5" component="div" color="inherit">
                                Budgeting Tool
                            </Typography>
                        </Grid>
                        <Grid container item xs={6} justifyContent="center">
                            <Button color="inherit" onClick={handleIncome}>Incomes</Button>
                            <Button color="inherit" >Bills</Button>
                            <Button color="inherit" >Goals</Button>
                        </Grid>
                        <Grid container item xs={3} justifyContent="flex-end">
                            <Button color="inherit" >Login</Button>
                            <Button color="inherit" >Signup</Button>
                        </Grid>
                    </Grid>

                    
                </Toolbar>
            </AppBar>
        </div>
  );
}