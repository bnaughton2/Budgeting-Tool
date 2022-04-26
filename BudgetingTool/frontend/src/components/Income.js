import React, { useState, useEffect } from "react";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';

function Income(){
  useEffect(() => {
    fetchData();
  });
    const fetched = true;
    const [isOpen, setOpen] = React.useState(false);
    const [isChecked, setChecked] = useState(true);
    const [income, setIncome] = useState("");
    const [amount, setAmount] = useState("");
    const [columns, setColums] = useState([
      { field: 'incomeId', headerName: 'ID', width: 1, hide:true },
      { field: 'income', headerName: 'Income', width: 250 },
      { field: 'amount', headerName: 'Amount', width: 150 },
      { field: 'isRecurring', headerName: 'Recurs Monthly', width: 150 },
      { field: 'date', headerName: 'Date', width: 150 }
    ]);
    const [rows, setRows] = useState([]);
    

    const fetchData = () => {
      fetch('/api/get-incomes').then((response) => 
        response.json()
        ).then((data) => {
          setRows(data);
        });
      // if (!fetched){
        
      //   fetched = true;
      // }
    };

    const handleClickClose = () => {
        setIncome("");
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
                income: income,
                amount: amount,
                isRecurring: isChecked,
                userId: 'bef29f21ab5548468fb2cd73357fecf6'
            })
        };
        
        fetch('/api/create-income', requestOptions).then((response) => 
        response.json()
        ).then( (data) => console.log(data));
        setIncome("");
        setAmount("");
        setChecked(true);
        setOpen(false);
        fetched = false;
      };

      const handleChecked = (event) => {
        setChecked(event.target.checked);
      };

      const handleIncome = (event) => {
        setIncome(event.target.value);
      };

      const handleAmount = (event) => {
        setAmount(event.target.value);
      };

    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>Add an Income</Button>
                  <Dialog open={isOpen} onClose={handleClickClose}>
                        <DialogTitle>Add Income</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Add a new income to your account.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="income"
                            label="Income"
                            type="text"
                            value={income}
                            onChange={handleIncome}
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
                             label="Is Income Recurring?" labelPlacement="bottom"/>
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
                checkboxSelection
                getRowId={(row) => row.incomeId}
                id="incomeId"
                />
                </div>
              </Grid>
        </Grid>
    );

}

export default Income;