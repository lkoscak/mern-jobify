import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/appContext";

import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppProvider>
				<App />
			</AppProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
