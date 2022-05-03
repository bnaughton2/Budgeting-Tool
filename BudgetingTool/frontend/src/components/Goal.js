import React, { useState, useEffect } from "react";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import DateFnsUtils from "@date-io/date-fns";
import { DataGrid } from '@mui/x-data-grid';
import { borderColor } from "@mui/system";
import { alpha } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

function Goal(){
    const [isOpen, setOpen] = React.useState(false);
    const [goal, setGoal] = useState("");
    const [amountNeeded, setAmountNeeded] = useState("");
    const [monthlyAmount, setMonthlyAmount] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [columns, setColums] = useState([
      { field: 'goalId', headerName: 'ID', width: 1, hide:true },
      { field: 'goal', headerName: 'Goal', minWidth: 250, flex: 1},
      { field: 'amountNeeded', headerName: 'Amount Needed', minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
      { field: 'monthlyAmount', headerName: 'Monthly Amount', minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
      { field: 'completion', headerName: 'Completion', minWidth: 150, flex: 1, align: "center", headerAlign: "center", hide:true },
      { field: 'startDate', headerName: 'Start Date', minWidth: 125, flex: 1, align: "center", headerAlign: "center" },
      { field: 'endDate', headerName: 'End Date', minWidth: 125, flex: 1, align: "center", headerAlign: "center" }
    ]);
    const [rows, setRows] = useState([]);
    
    const fetchData = () => {
      fetch('/api/get-goals').then((response) => 
        response.json()
        ).then((data) => {
          setRows(data);
        });
    };

    useEffect(() => {
      fetchData();
    }, []);

    const useStyles = makeStyles({
      dataGrid: {
        background: "linear-gradient(45deg, #42d796 30%, #50bfbf 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        width: '80%',
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
      }
    });
    const classes = useStyles();

    const handleClickClose = () => {
        setGoal("");
        setAmountNeeded("");
        setMonthlyAmount("");
        setStartDate(new Date());
        setEndDate(new Date());
        setOpen(false);
      };
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                goal: goal,
                amountNeeded: amountNeeded,
                monthlyAmount: monthlyAmount,
                startDate: moment(startDate).format('YYYY-MM-DD'),
                endDate: moment(endDate).format('YYYY-MM-DD'),
            })
        };
        
        fetch('/api/create-goal', requestOptions).then((response) => 
        response.json()
        ).then( (data) => {
          console.log(data)
          fetch('/api/get-goals').then((response) => 
          response.json()
          ).then((data) => {
            setRows(data);
            
          });
        });
        setGoal("");
        setMonthlyAmount("");
        setAmountNeeded("");
        setStartDate(new Date());
        setEndDate(new Date());
        setOpen(false);
        
      };

      const handleGoal = (event) => {
        setGoal(event.target.value);
      };

      const handleAmountNeeded = (event) => {
        setAmountNeeded(event.target.value);
      };

      const handleMonthlyAmount = (event) => {
        setMonthlyAmount(event.target.value);
      };

      const handleStartDate = (event) => {
        setStartDate(event.target.value);
      };

      const handleEndDate = (event) => {
        setEndDate(event.target.value);
      };
    return(
        <Grid container spacing={1} align="center">
            <Grid container direction={'row'} align='center'>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>Add an Goal</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="secondary" onClick={handleClickOpen}>Delete row</Button>
                </Grid>
                  <Dialog open={isOpen} onClose={handleClickClose}>
                        <DialogTitle>Add Goal</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Add a new Goal to your account.
                        </DialogContentText>

                        <Grid container spacing={1} align="center">
                            <Grid item xs={12}>
                              <TextField
                              autoFocus
                              margin="dense"
                              id="goal"
                              label="Goal"
                              type="text"
                              value={goal}
                              onChange={handleGoal}
                              fullWidth
                              variant="standard"
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                              autoFocus
                              margin="dense"
                              id="amountNeeded"
                              label="Amount Needed ($)"
                              type="number"
                              value={amountNeeded}
                              onChange={handleAmountNeeded}
                              variant="standard"
                              />     
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                autoFocus
                                margin="dense"
                                id="monthlyAmount"
                                label="Monthly Amount ($)"
                                type="number"
                                value={monthlyAmount}
                                onChange={handleMonthlyAmount}
                                variant="standard"
                                />     
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                  label="Start Date"
                                  value={startDate}
                                  onChange={(newValue) => {
                                    setStartDate(newValue);
                                  }}
                                  />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                  label="End Date"
                                  value={endDate}
                                  onChange={(newValue) => {
                                    setEndDate(newValue);
                                  }}
                                  />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        </DialogContent>

                        <DialogActions>
                        <Button onClick={handleClickClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                        </DialogActions>
                    </Dialog>
              </Grid>
              <Grid item xs={12}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight={true}
                disableExtendRowFullWidth={false}
                disableSelectionOnClick={true}
                rowsPerPageOptions={[10]}
                className={classes.dataGrid}
                getRowId={(row) => row.goalId}
                id="goalId"
                />
              </Grid>
        </Grid>
    );

}

export default Goal;