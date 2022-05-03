import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import { borderColor } from "@mui/system";

function Income(){
    const [isOpen, setOpen] = React.useState(false);
    const [isChecked, setChecked] = useState(true);
    const [income, setIncome] = useState("");
    const [amount, setAmount] = useState("");
    const [columns, setColums] = useState([
      { field: 'incomeId', headerName: 'ID', width: 1, hide:true },
      { field: 'income', headerName: 'Income', minWidth: 250, flex: 1},
      { field: 'amount', headerName: 'Amount ($)', minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
      { field: 'isRecurring', headerName: 'Recurs Monthly', minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
      { field: 'date', headerName: 'Date', minWidth: 150, flex: 1, align: "center", headerAlign: "center" }
    ]);
    const [rows, setRows] = useState([]);
    
    const fetchData = () => {
      fetch('/api/get-incomes').then((response) => 
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
        width: '70%',
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
      }
    });
    const classes = useStyles();

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
                isRecurring: isChecked
            })
        };
        
        fetch('/api/create-income', requestOptions).then((response) => 
        response.json()
        ).then( (data) => {
          console.log(data)
          fetch('/api/get-incomes').then((response) => 
        response.json()
        ).then((data) => {
          setRows(data);
        });
        });
        setIncome("");
        setAmount("");
        setChecked(true);
        setOpen(false);
        
        
      };

      // const handleDelete = () => {
      //   const requestOptions = {
      //     method: 'DELETE',
      //     headers: {'Content-Type': 'application/json'},
      //     body: JSON.stringify({
      //         incomeId: income,
      //     })
      // };
      // };

      const handleChecked = (event) => {
        setChecked(event.target.checked);
      };

      const handleIncome = (event) => {
        setIncome(event.target.value);
      };

      const handleAmount = (event) => {
        setAmount(event.target.value);
      };

      function currentlySelected(selection){
        selected.current = selection;
        console.log(selection);
      }

    return(
        <Grid container spacing={1} align="center">
            <Grid container direction={'row'} align="center">
              <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>Add an Income</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>Delete row</Button>
              </Grid>
                  <Dialog open={isOpen} onClose={handleClickClose}>
                        <DialogTitle>Add Income</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Add a new income to your account.
                        </DialogContentText>

                        <Grid container spacing={1} align="center">
                          <Grid item xs={12}>
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
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="amount"
                              label="Amount ($)"
                              type="number"
                              value={amount}
                              onChange={handleAmount}
                              variant="standard"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormControlLabel control={<Checkbox  checked={isChecked} onChange={handleChecked} color="primary"/>}
                              label="Is Income Recurring?" labelPlacement="bottom"/>
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
                autoHeight={true}
                disableExtendRowFullWidth={false}
                disableSelectionOnClick={false}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onSelectionChange={currentlySelected}
                getRowId={(row) => row.incomeId}
                id="incomeId"
                className={classes.dataGrid}
                />
              
              </Grid>
        </Grid>
    );

}

export default Income;