import React, { useState, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_ERROR,
	REGISTER_USER_SUCCESS,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	displayAlert: () => {},
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || "",
	jobLocation: userLocation || "",
	registerUser: (user) => {},
};
const AppContext = React.createContext(initialState);

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};
	const clearAlert = () => {
		setTimeout(() => {
			dispatch({
				type: CLEAR_ALERT,
			});
		}, 3000);
	};
	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		localStorage.setItem("location", location);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("location");
	};
	const registerUser = async (userData) => {
		dispatch({ type: REGISTER_USER_BEGIN });
		try {
			const response = await axios.post("/api/v1/auth/register", userData);
			console.log(response);
			const { user, token, location } = response.data;
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: {
					user,
					token,
					location,
				},
			});
			addUserToLocalStorage({
				user,
				token,
				location,
			});
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider, initialState };
