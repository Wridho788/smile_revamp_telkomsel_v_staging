import React from "react";
import ReactDOM from "react-dom";
import Routes from "./config/Routes";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./style/Material-UI";
import { persistor, store } from "./redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// styling for primereact UI
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={Theme}>
					<BrowserRouter>
						<Routes />
					</BrowserRouter>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
