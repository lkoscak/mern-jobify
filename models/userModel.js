import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a name"],
		maxlength: 50,
		trim: true,
	},
	lastName: {
		type: String,
		maxlength: 50,
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		validate: {
			validator: validator.isEmail,
			message: "Please provide a valid email",
		},
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 6,
		select: false,
	},
	location: {
		type: String,
		maxlength: 50,
		trim: true,
		default: "My city",
	},
});

UserSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
	const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
	return token;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

export default mongoose.model("User", UserSchema);
