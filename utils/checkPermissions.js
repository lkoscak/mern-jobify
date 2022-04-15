import * as Errors from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
	if (requestUser.userId === resourceUserId.toString()) return;
	throw new Errors.UnauthorizedError("Not authorized to access this route");
};

export default checkPermissions;
