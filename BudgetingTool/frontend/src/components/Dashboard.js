import React, { useState, useEffect } from "react";
import {TextField, Button, Grid, Typography, RadioGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import { borderColor } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import moment from 'moment';
import DateFnsUtils from "@date-io/date-fns";
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';

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
    const [date, setDate] = useState(new Date());
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [billTotal, setBillTotal] = useState(0);
    const [goalTotal, setGoalTotal] = useState(0);
    
    const fetchData = () => {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            date: moment(date).format('YYYY-MM'),
        })
        };

      fetch('/api/get-income-month', requestOptions).then((response) => 
        response.json()
        ).then((data) => {
          setIncomeRows(data);
          fetch('/api/get-income-amount', requestOptions).then((r) => 
              r.json()
              ).then((d) => {
                setIncomeTotal(JSON.parse(d).amount);
              });
        });

        fetch('/api/get-bill-month', requestOptions).then((response) => 
        response.json()
        ).then((data) => {
          setBillRows(data);
          fetch('/api/get-bill-amount', requestOptions).then((r) => 
              r.json()
              ).then((d) => {
                setBillTotal(JSON.parse(d).amount);
              });
        });

        fetch('/api/get-goal-month', requestOptions).then((response) => 
        response.json()
        ).then((data) => {
          setGoalRows(data);
              fetch('/api/get-goal-amount', requestOptions).then((r) => 
              r.json()
              ).then((d) => {
                setGoalTotal(JSON.parse(d).amount);
              });
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
        width: '90%',
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
      }
    });
    const classes = useStyles();

    const data = [
      { argument:'Bills', value:(billTotal) },
      { argument:'Goals', value:(goalTotal) },
      { argument:'Leftover', value:(incomeTotal - (billTotal+goalTotal)) }
    ];
    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
              <Box sx={{mb: '60px'}}/>
            </Grid>
            <Grid item xs={6}>

            <Grid item xs={12}>
              {/* Calendar */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    views={["year", "month"]}
                    label="Year and Month"
                    orientation="landscape"
                    minDate={new Date("2015-01-01")}
                    openTo="month"
                    color="primary"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                      const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            date: moment(newValue).format('YYYY-MM'),
                        })
                        };
                      fetch('/api/get-income-month', requestOptions).then((response) => 
                        response.json()
                        ).then((data) => {
                          setIncomeRows(data);
                          fetch('/api/get-income-amount', requestOptions).then((r) => 
                            r.json()
                            ).then((d) => {
                              setIncomeTotal(JSON.parse(d).amount);
                            });
                        });
                        fetch('/api/get-bill-month', requestOptions).then((response) => 
                        response.json()
                        ).then((data) => {
                          setBillRows(data);
                          fetch('/api/get-bill-amount', requestOptions).then((r) => 
                            r.json()
                            ).then((d) => {
                              setBillTotal(JSON.parse(d).amount);
                            });
                        });
                        fetch('/api/get-goal-month', requestOptions).then((response) => 
                        response.json()
                        ).then((data) => {
                          setGoalRows(data);
                          fetch('/api/get-goal-amount', requestOptions).then((r) => 
                            r.json()
                            ).then((d) => {
                              setGoalTotal(JSON.parse(d).amount);
                            });
                        });
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
              </LocalizationProvider>
              
            </Grid>
              <Box sx={{mb: '40px'}}/>
            <Grid item xs={12}>
              {/* Pie Chart */}
              <Paper>
              <Chart
                data={data}
              >
                <PieSeries valueField="value" argumentField="argument"/>
                <Title text="Income Breakdown"/>
                <Legend />
              </Chart>
            </Paper>
            </Grid>

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
                    <Box sx={{mb: '30px'}}/>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
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
                  <Box sx={{mb: '30px'}}/>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
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
                    <Box sx={{mb: '30px'}}/>
                </Grid>
            </Grid>
            
            
        </Grid>
    );

}

export default Dashboard;