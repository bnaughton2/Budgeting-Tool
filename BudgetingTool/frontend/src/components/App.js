import React from "react";
import { render } from "react-dom";
import Homepage from './Homepage';
import Navbar from './Navbar';
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";


const theme = createTheme({
    palette: {
      primary: {
          main: '#42d796'
      },
      secondary: {
        main: '#BF5050'
    },
    //   secondary: green,
    },
  });

function App(){

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Homepage />
                </div>
            </MuiThemeProvider>
        
        );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);