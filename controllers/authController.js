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
	const { email, password } = req.body;
	if (!email || !password) {
		throw new Errors.BadRequestError("Please provide all values");
	}
	const user = await User.findOne({ email }).select("+password"); // by default password is not provided because of: select: false in userModel

	if (!user) {
		throw new Errors.UnauthenticatedError("Invalid Credentials");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new Errors.UnauthenticatedError("Invalid Credentials");
	}
	const token = user.createJWT();
	res.status(StatusCodes.OK).json({
		user: Utils.createTokenUser(user),
		token,
		location: user.location,
	});
};
const updateUser = async (req, res) => {
	const { email, name, lastName, location } = req.body;
	if (!email || !name || !location) {
		throw new Errors.BadRequestError("Please provide all values");
	}

	const user = await User.findOne({ _id: res.locals.user.userId });

	user.email = email;
	user.name = name;
	if (lastName) user.lastName = lastName;
	user.location = location;

	await user.save();

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({
		user: Utils.createTokenUser(user),
		token,
		location: user.location,
	});
};

export { register, login, updateUser };
