import jwt from "jsonwebtoken";
import * as Errors from "../errors/index.js";

const auth = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization || !authorization.startsWith("Bearer ")) {
		throw new Errors.UnauthenticatedError("No token provided");
	}
	const token = authorization.split(" ")[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		res.locals.user = payload;
		next();
	} catch (error) {
		throw new Errors.UnauthenticatedError(
			"Not authorized to access this route"
		);
	}
};

export { auth };
