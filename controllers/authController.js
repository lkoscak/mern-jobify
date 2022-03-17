import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import * as Errors from "../errors/index.js";
import * as Utils from "../utils/index.js";

const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new Errors.BadRequestError("Please provide all the required values");
	}

	const user = await User.create({ name, email, password });
	res.status(StatusCodes.OK).json({
		user: Utils.createTokenUser(user),
		token: user.createJWT(),
		location: user.location,
	});
};
const login = async (req, res) => {
	res.send("login");
};
const updateUser = async (req, res) => {
	res.send("updateUser");
};

export { register, login, updateUser };
