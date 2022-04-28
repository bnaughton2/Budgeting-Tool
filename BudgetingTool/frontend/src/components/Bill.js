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

function Bill(){('bill', 'amount', 'isRecurring', 'dueDate')
    const [isOpen, setOpen] = React.useState(false);
    const [isChecked, setChecked] = useState(true);
    const [bill, setBill] = useState("");
    const [amount, setAmount] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [columns, setColums] = useState([
      { field: 'billId', headerName: 'ID', width: 1, hide:true },
      { field: 'bill', headerName: 'Bill', width: 250 },
      { field: 'amount', headerName: 'Amount', width: 150 },
      { field: 'isRecurring', headerName: 'Recurs Monthly', width: 150 },
      { field: 'dueDate', headerName: 'Due Date', width: 150 }
    ]);
    const [rows, setRows] = useState([]);
    
    const fetchData = () => {
      fetch('/api/get-bills').then((response) => 
        response.json()
        ).then((data) => {
          setRows(data);
        });
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleClickClose = () => {
        setBill("");
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
                bill: bill,
                amount: amount,
                isRecurring: isChecked,
                dueDate: moment(dueDate).format('YYYY-MM-DD')
            })
        };
        
        fetch('/api/create-bill', requestOptions).then((response) => 
        response.json()
        ).then( (data) => {
          console.log(data)
          fetch('/api/get-bills').then((response) => 
          response.json()
          ).then((data) => {
            setRows(data);
          });
        });
        setBill("");
        setAmount("");
        setChecked(true);
        setOpen(false);
        
      };

      const handleChecked = (event) => {
        setChecked(event.target.checked);
      };

      const handleBill = (event) => {
        setBill(event.target.value);
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
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>Add a Bill</Button>
                  <Dialog open={isOpen} onClose={handleClickClose}>
                        <DialogTitle>Add Bill</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Add a new bill to your account.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="bill"
                            label="Bill"
                            type="text"
                            value={bill}
                            onChange={handleBill}
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
                             label="Is Bill Recurring?" labelPlacement="bottom"/>
                             
                             <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker
                               label="Basic example"
                               value={dueDate}
                               onChange={(newValue) => {
                                setDueDate(newValue);
                              }}
                               />
                            </MuiPickersUtilsProvider>
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
                getRowId={(row) => row.billId}
                id="billId"
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

export default Bill;