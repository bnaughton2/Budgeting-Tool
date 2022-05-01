import React, { useState, useEffect } from "react";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import DateFnsUtils from "@date-io/date-fns";
import { DataGrid } from '@mui/x-data-grid';
import { borderColor } from "@mui/system";
import { alpha } from '@material-ui/core/styles';

function Goal(){
    const [isOpen, setOpen] = React.useState(false);
    const [isChecked, setChecked] = useState(true);
    const [goal, setGoal] = useState("");
    const [amount, setAmount] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [columns, setColums] = useState([
      { field: 'goalId', headerName: 'ID', width: 1, hide:true },
      { field: 'goal', headerName: 'Goal', width: 250 },
      { field: 'amount', headerName: 'Amount', width: 150 },
      { field: 'isRecurring', headerName: 'Recurs Monthly', width: 150 },
      { field: 'startDate', headerName: 'Start Date', width: 125 },
      { field: 'endDate', headerName: 'End Date', width: 125 }
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

    const handleClickClose = () => {
        setGoal("");
        setAmount("");
        setChecked(true);
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
                amount: amount,
                isRecurring: isChecked,
                startDate: '2022-04-28',
                startDate: '2022-04-28',
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
        setAmount("");
        setChecked(true);
        setOpen(false);
        
      };

      const handleChecked = (event) => {
        setChecked(event.target.checked);
      };

      const handleGoal = (event) => {
        setGoal(event.target.value);
      };

      const handleAmount = (event) => {
        setAmount(event.target.value);
      };

      const handleDate = (event) => {
        setDueDate(event.target.value);
      };

    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>Add a Goal</Button>
                  <Dialog open={isOpen} onClose={handleClickClose}>
                        <DialogTitle>Add Goal</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Add a new Goal to your account.
                        </DialogContentText>
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
                        <TextField
                            autoFocus
                            margin="dense"
                            id="amount"
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={handleAmount}
                            variant="standard"
                        />
                        <FormControlLabel control={<Checkbox  checked={isChecked} onChange={handleChecked} color="primary"/>}
                             label="Is Goal Recurring?" labelPlacement="bottom"/>
                             
                             {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker
                               label="Basic example"
                               value={dueDate}
                               onChange={(newValue) => {
                                setDueDate(newValue);
                              }}
                               />
                            </MuiPickersUtilsProvider> */}
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClickClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                        </DialogActions>
                    </Dialog>
              </Grid>
              <Grid item xs={12}>
              <div style={{ height: 400, width: 800 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.goalId}
                id="goalId"
                sx={
                  {
                    "& 	.MuiDataGrid-virtualScrollerContent": {
                      backgroundColor: "rgba(235, 235, 235, .7)"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "rgba(235, 235, 235, .7)",
                      borderColor: "10px solid black",
                      fontSize: 16
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: "rgba(235, 235, 235, .7)",
                    },
                    "& 	.MuiDataGrid-row": {
                      borderColor: "10px solid black",
                    },
                  }		
                }
                />
                </div>
              </Grid>
        </Grid>
    );

}

export default Goal;