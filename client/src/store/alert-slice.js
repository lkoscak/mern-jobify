import { createSlice } from "@reduxjs/toolkit";

const initialState = { showAlert: false, alertText: "", alertType: "" };

const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		displayAlert(_state, action) {
			return {
				showAlert: true,
				alertType: action?.payload?.alertType || "danger",
				alertText: action?.payload?.alertText || "Please provide all values!",
			};
		},
		clearAlert() {
			return {
				showAlert: false,
				alertType: "",
				alertText: "",
			};
		},
	},
});

const alertActions = alertSlice.actions;

const displayAlert = (alertData) => {
	return (dispatch, getState) => {
		dispatch(alertActions.displayAlert(alertData));
		setTimeout(() => {
			console.log(getState());
			dispatch(alertActions.clearAlert());
		}, 3000);
	};
};

export default alertSlice;
export { alertActions, displayAlert };
