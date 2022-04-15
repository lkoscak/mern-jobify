import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
//import cors from "cors";

// db
import connectDB from "./db/connect.js";

// custom middleware
import notFoundMiddleware from "./middleware/not-found.js"; // have to put .js at the end
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { auth } from "./middleware/auth.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";

// app setup
const app = express();
app.use(express.json());
//app.use(cors());

// serving static files
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// ext packages config
dotenv.config();
if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

// security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// routes
app.get("/test", (req, res) => {
	res.json({ msg: "it works" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
