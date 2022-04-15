import React, { useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_ERROR,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR,
	UPDATE_USER_SUCCESS,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_ERROR,
	CREATE_JOB_SUCCESS,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	DELETE_JOB_BEGIN,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
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
	registerUser: (user) => {},
	loginUser: (user) => {},
	showSidebar: false,
	toggleSidebar: () => {},
	logoutUser: () => {},
	updateUser: (user) => {},
	isEditing: false,
	editJobId: "",
	position: "",
	company: "",
	jobLocation: userLocation || "",
	jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
	jobType: "full-time",
	statusOptions: ["pending", "interview", "declined"],
	status: "pending",
	handleChange: (name, value) => {},
	clearValues: () => {},
	createJob: () => {},
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	getJobs: () => {},
	setEditJob: (id) => {},
	editJob: (id) => {},
	deleteJob: (id) => {},
	stats: {},
	monthlyApplications: [],
	showStats: () => {},
	search: "",
	searchStatus: "all",
	searchType: "all",
	sort: "latest",
	sortOptions: ["latest", "oldest", "a-z", "z-a"],
	clearFilters: () => {},
	changePage: (page) => {},
};
const AppContext = React.createContext(initialState);

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const authFetch = axios.create({
		baseURL: "/api/v1",
	});

	// request interceptor
	authFetch.interceptors.request.use(
		(config) => {
			config.headers.common["Authorization"] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	// response interceptor
	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error.response);
			if (error.response.status === 401) {
				setTimeout(() => {
					logoutUser();
				}, 3000);
			}
			return Promise.reject(error);
		}
	);

	const getJobs = async () => {
		const { page, search, searchStatus, searchType, sort } = state;
		let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
		if (search) {
			url = url + `&search=${search}`;
		}
		dispatch({ type: GET_JOBS_BEGIN });
		try {
			const { data } = await authFetch(url);
			const { jobs, totalJobs, numOfPages } = data;
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: {
					jobs,
					totalJobs,
					numOfPages,
				},
			});
		} catch (error) {
			setTimeout(() => {
				logoutUser();
			}, 3000);
		}
		clearAlert();
	};

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
			if (error.response.status === 401) return;
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	const loginUser = async (userData) => {
		dispatch({ type: LOGIN_USER_BEGIN });
		try {
			const response = await axios.post("/api/v1/auth/login", userData);
			const { user, token, location } = response.data;
			dispatch({
				type: LOGIN_USER_SUCCESS,
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
				type: LOGIN_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};
	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};
	const updateUser = async (userData) => {
		dispatch({ type: UPDATE_USER_BEGIN });
		try {
			const { data } = await authFetch.patch("/auth/updateUser", userData);
			const { user, location, token } = data;
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location, token },
			});
			addUserToLocalStorage({ user, location, token });
		} catch (error) {
			dispatch({
				type: UPDATE_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};
	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES });
	};
	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN });
		try {
			const { position, company, jobLocation, jobType, status } = state;
			await authFetch.post("/jobs", {
				position,
				company,
				jobLocation,
				jobType,
				status,
			});
			dispatch({
				type: CREATE_JOB_SUCCESS,
			});
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.stats === 401) return;
			dispatch({
				type: CREATE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	const setEditJob = (id) => {
		dispatch({
			type: SET_EDIT_JOB,
			payload: { id },
		});
	};
	const editJob = async (id) => {
		dispatch({ type: EDIT_JOB_BEGIN });
		try {
			const { position, company, jobLocation, jobType, status } = state;
			await authFetch.patch(`jobs/${state.editJobId}`, {
				position,
				company,
				jobLocation,
				jobType,
				status,
			});
			dispatch({
				type: EDIT_JOB_SUCCESS,
			});
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.stats === 401) return;
			dispatch({
				type: EDIT_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};
	const deleteJob = async (id) => {
		dispatch({ type: DELETE_JOB_BEGIN });
		try {
			await authFetch.delete(`jobs/${id}`);
			getJobs();
		} catch (error) {
			setTimeout(() => {
				logoutUser();
			}, 3000);
		}
	};
	const showStats = async () => {
		dispatch({ type: SHOW_STATS_BEGIN });
		try {
			const { data } = await authFetch("/jobs/stats");
			console.log(data);
			dispatch({
				type: SHOW_STATS_SUCCESS,
				payload: {
					stats: data.defaultStats,
					monthlyApplications: data.monthlyApplications,
				},
			});
		} catch (error) {
			console.log(error.response);
			setTimeout(() => {
				logoutUser();
			}, 3000);
		}
	};
	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};
	const changePage = (page) => {
		dispatch({ type: CHANGE_PAGE, payload: { page } });
	};
	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
				loginUser,
				toggleSidebar,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				deleteJob,
				editJob,
				showStats,
				clearFilters,
				changePage,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider, initialState };
