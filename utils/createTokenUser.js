const createTokenUser = (user) => {
	return {
		userId: user._id,
		email: user.email,
		name: user.name,
		lastName: user.lastName,
		location: user.location,
	};
};

export default createTokenUser;
