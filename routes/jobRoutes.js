import express from "express";

import {
	createJob,
	getAllJobs,
	deleteJob,
	updateJob,
	getStats,
} from "../controllers/jobsController.js";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/stats").get(getStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
