import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./config/Routes";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./style/Material-UI"
import {store} from "./redux/app/store";
import {Provider} from "react-redux";

ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
            </ThemeProvider>
            </Provider>
        </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
