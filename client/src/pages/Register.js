import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import useAppContext from "../hooks/useAppContext";

import { displayAlert } from "../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
};

const Register = () => {
	const [values, setValues] = useState(initialState);
	const { showAlert } = useSelector((state) => state.alert);
	const dispatch = useDispatch();
	const { isLoading, registerUser, loginUser, user } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	}, [user, navigate]);

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			dispatch(displayAlert());
			return;
		}
		const user = { name, email, password };
		if (!isMember) {
			registerUser(user);
		} else {
			loginUser(user);
		}
	};

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? "Login" : "Register"}</h3>
				{showAlert && <Alert></Alert>}

				{!values.isMember && (
					<FormRow
						type="text"
						name="name"
						value={values.name}
						handleChange={handleChange}
					/>
				)}
				<FormRow
					type="email"
					name="email"
					value={values.email}
					handleChange={handleChange}
				></FormRow>
				<FormRow
					type="password"
					name="password"
					value={values.password}
					handleChange={handleChange}
				></FormRow>
				<button type="submit" className="btn btn-block" disabled={isLoading}>
					submit
				</button>
				<p>
					{values.isMember ? "Not a member yet?" : "Already a member?"}

					<button type="button" onClick={toggleMember} className="member-btn">
						{values.isMember ? "Register" : "Login"}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
