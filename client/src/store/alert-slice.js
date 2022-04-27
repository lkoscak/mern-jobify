import { createSlice } from "@reduxjs/toolkit";

const initialState = { showAlert: false, alertText: "", alertType: "" };

const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		displayAlert(state, action) {
			return {
				showAlert: true,
				alertType: action?.payload?.alertType || "danger",
				alertText: action?.payload?.alertText || "Please provide all values!",
			};
		},
		clearAlert(state) {
			return {
				showAlert: true,
				alertType: "",
				alertText: "",
			};
		},
	},
});

const alertActions = alertSlice.actions;

export default alertSlice;
export { alertActions };
