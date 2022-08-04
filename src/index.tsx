import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./config/Routes";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./style/Material-UI"
import {store} from "./app/redux/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();