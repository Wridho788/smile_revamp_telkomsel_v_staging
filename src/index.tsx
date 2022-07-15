import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./config/Routes";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./style/Material-UI"

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={Theme}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();