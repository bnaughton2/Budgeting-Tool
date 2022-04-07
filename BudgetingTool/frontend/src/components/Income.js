import React, { useState } from "react";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";

function Income(){
    const [isOpen, setOpen] = React.useState(false);
    const [isChecked, setChecked] = useState(true);
    const [income, setIncome] = useState("");
    const [amount, setAmount] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
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
        setOpen(false);
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
                  <Dialog open={isOpen} onClose={handleClose}>
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Submit</Button>
                        </DialogActions>
                    </Dialog>
              </Grid>
        </Grid>
    );

}

export default Income;