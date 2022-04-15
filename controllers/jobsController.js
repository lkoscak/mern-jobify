import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import * as Errors from "../errors/index.js";
import * as Utils from "../utils/index.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
	const { position, company } = req.body;

	if (!position || !company) {
		throw new Errors.BadRequestError("Please Provide All Values");
	}

	req.body.createdBy = res.locals.user.userId;

	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
	const { search, status, jobType, sort } = req.query;

	const queryObject = {
		createdBy: res.locals.user.userId,
	};

	if (status && status !== "all") {
		queryObject.status = status;
	}
	if (status && jobType !== "all") {
		queryObject.jobType = jobType;
	}
	if (search) {
		queryObject.position = { $regex: search, $options: "i" }; // i = case insensitive
	}

	let result = Job.find(queryObject);

	// chain sort conditions
	if (sort === "latest") {
		result = result.sort("-createdAt");
	}
	if (sort === "oldest") {
		result = result.sort("createdAt");
	}
	if (sort === "a-z") {
		result = result.sort("position");
	}
	if (sort === "z-a") {
		result = result.sort("-position");
	}

	// setup pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit; //10
	result = result.skip(skip).limit(limit);

	result = result.skip(skip).limit(limit);

	const jobs = await result;

	const totalJobs = await Job.countDocuments(queryObject);
	const numOfPages = Math.ceil(totalJobs / limit);

	res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
const deleteJob = async (req, res) => {
	const { id: jobId } = req.params;

	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new Errors.NotFoundError(`No job with id ${jobId}`);
	}

	Utils.checkPermissions(res.locals.user, job.createdBy);

	await job.remove();

	res.status(StatusCodes.OK).json({ success: true });
};
const updateJob = async (req, res) => {
	const { id: jobId } = req.params;

	const { company, position } = req.body;

	if (!company || !position) {
		throw new Errors.BadRequestError("Please Provide All Values");
	}

	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new Errors.NotFoundError(`No job with id ${jobId}`);
	}

	Utils.checkPermissions(res.locals.user, job.createdBy);

	const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
		runValidators: true, // only run on provided props
	});

	res.status(StatusCodes.OK).json({ job });
};
const getStats = async (req, res) => {
	let stats = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(res.locals.user.userId) } },
		{ $group: { _id: "$status", count: { $sum: 1 } } },
	]);
	stats = stats.reduce((result, current) => {
		const { _id: title, count } = current;
		result[title] = count;
		return result;
	}, {});
	stats = Object.assign({ pending: 0, interview: 0, declined: 0 }, stats);
	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(res.locals.user.userId) } },
		{
			$group: {
				_id: {
					year: {
						$year: "$createdAt",
					},
					month: {
						$month: "$createdAt",
					},
				},
				count: { $sum: 1 },
			},
		},
		{ $sort: { "_id.year": -1, "_id.month": -1 } },
		{ $limit: 6 },
	]);
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format("MMM Y");
			return { date, count };
		})
		.reverse();
	res.status(StatusCodes.OK).json({ defaultStats: stats, monthlyApplications });
};

export { createJob, getAllJobs, deleteJob, updateJob, getStats };
