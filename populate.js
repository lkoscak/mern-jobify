import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./db/connect.js";
import Job from "./models/jobModel.js";

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		await Job.deleteMany();
		const jsonJobs = JSON.parse(
			await readFile(new URL("./mock-data.json", import.meta.url))
		);
		await Job.create(jsonJobs);
		console.log("Success!");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
