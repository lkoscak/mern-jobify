import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
//import cors from "cors";

// ext packages config
dotenv.config();

// db
import connectDB from "./db/connect.js";

// custom middleware
import notFoundMiddleware from "./middleware/not-found.js"; // have to put .js at the end
import errorHandlerMiddleware from "./middleware/error-handler.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";

// app setup
const app = express();
app.use(express.json());
//app.use(cors());

// routes
app.get("/test", (req, res) => {
	res.json({ msg: "it works" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		//await connectDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
