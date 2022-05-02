import React, { useState, useEffect } from "react";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import { borderColor } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@mui/material/LinearProgress';

function Dashboard(){
    const [incomeColumns, setIncomeColums] = useState([
      { field: 'incomeId', headerName: 'ID', width: 1, hide:true },
      { field: 'income', headerName: 'Income', minWidth: 250, flex: 1 },
      { field: 'amount', headerName: 'Amount ($)', minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
      { field: 'isRecurring', headerName: 'Recurs Monthly', minWidth: 150, flex: 1, hide:true },
      { field: 'date', headerName: 'Date', minWidth: 150, flex: 1, hide:true }
    ]);
    const [incomeRows, setIncomeRows] = useState([]);
    const [billColumns, setBillColums] = useState([
      { field: 'billId', headerName: 'ID', width: 1, hide:true },
      { field: 'bill', headerName: 'Bill', minWidth: 250, flex: 1 },
      { field: 'amount', headerName: 'Amount ($)', minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
      { field: 'isRecurring', headerName: 'Recurs Monthly', minWidth: 150, flex: 1, align: "center", headerAlign: "center", hide:true },
      { field: 'dueDate', headerName: 'Due Date', minWidth: 150, flex: 1, align: "center", headerAlign: "center" }
    ]);
    const [billRows, setBillRows] = useState([]);
    const [goalColumns, setGoalColums] = useState([
      { field: 'goalId', headerName: 'ID', width: 1, hide:true },
      { field: 'goal', headerName: 'Goal', minWidth: 250, flex: 1},
      { field: 'amountNeeded', headerName: 'Amount Needed ($)', minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
      { field: 'completion', headerName: 'Completion %', minWidth: 150, flex: 1, align: "center", headerAlign: "center" },
      { field: 'monthlyAmount', headerName: 'Monthly Amount', minWidth: 150, flex: 1, align: "center", headerAlign: "center", hide: true },
      { field: 'amountCommitted', headerName: 'Amount Committed', minWidth: 150, flex: 1, align: "center", headerAlign: "center", hide: true },
      { field: 'startDate', headerName: 'Start Date', minWidth: 125, flex: 1, align: "center", headerAlign: "center", hide: true },
      { field: 'endDate', headerName: 'End Date', minWidth: 125, flex: 1, align: "center", headerAlign: "center", hide: true }
    ]);
    const [goalRows, setGoalRows] = useState([]);
    
    const fetchData = () => {
      fetch('/api/get-incomes').then((response) => 
        response.json()
        ).then((data) => {
          setIncomeRows(data);
        });

        fetch('/api/get-bills').then((response) => 
        response.json()
        ).then((data) => {
          setBillRows(data);
        });

        fetch('/api/get-goals').then((response) => 
        response.json()
        ).then((data) => {
          setGoalRows(data);
          Object.entries(data).forEach((entry) => {
            const [key, value] = entry;
            // console.log(`${key}: ${value.amountCommitted/value.amountNeeded}`);
          });
        });
    };

    useEffect(() => {
      fetchData();
    }, []);

    const useStyles = makeStyles({
      dataGrid: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        width: '90%',
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
      }
    });
    const classes = useStyles();


    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={6}>
            <LinearProgress variant="determinate" value={10}/>
            </Grid>

            <Grid item xs={6}>
              <Grid item xs={12}>
                    <DataGrid
                    rows={incomeRows}
                    columns={incomeColumns}
                    autoHeight={true}
                    disableExtendRowFullWidth={false}
                    disableSelectionOnClick={true}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.incomeId}
                    id="incomeId"
                    className={classes.dataGrid}
                    />
                </Grid>
                <Grid item xs={12}>
                  <DataGrid
                  rows={billRows}
                  columns={billColumns}
                  pageSize={10}
                  className={classes.dataGrid}
                  autoHeight={true}
                  disableExtendRowFullWidth={false}
                  disableSelectionOnClick={true}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row.billId}
                  id="billId"
                  />
                </Grid>
                <Grid item xs={12}>
                  <DataGrid
                    rows={goalRows}
                    columns={goalColumns}
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
            
            
        </Grid>
    );

}

export default Dashboard;