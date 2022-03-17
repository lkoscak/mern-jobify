const createJob = async (req, res) => {
	res.send("create");
};
const getAllJobs = async (req, res) => {
	res.send("get all");
};
const deleteJob = async (req, res) => {
	res.send("delete");
};
const updateJob = async (req, res) => {
	res.send("update");
};
const getStats = async (req, res) => {
	res.send("stats");
};

export { createJob, getAllJobs, deleteJob, updateJob, getStats };
