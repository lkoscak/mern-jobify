import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./alert-slice";

const store = configureStore({
	reducer: { alert: alertSlice.reducer },
});

export default store;
