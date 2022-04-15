import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Job = ({
	company,
	createdAt,
	_id,
	position,
	jobLocation,
	jobType,
	status,
}) => {
	const { setEditJob, deleteJob } = useAppContext();
	let date = moment(createdAt).format("D MMM, yyyy");
	return (
		<Wrapper>
			<header>
				<div className="main-icon">{company.charAt(0)}</div>
				<div className="info">
					<h5>{position}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className="content">
				<div className="content-center">
					<JobInfo icon={<FaLocationArrow />} text={jobLocation} />
					<JobInfo icon={<FaCalendarAlt />} text={date} />
					<JobInfo icon={<FaBriefcase />} text={jobType} />
					<div className={`status ${status}`}>{status}</div>
				</div>
				<footer>
					<div className="actions">
						<Link
							to="/add-job"
							className="btn edit-btn"
							onClick={setEditJob.bind(null, _id)}
						>
							Edit
						</Link>
						<button
							type="button"
							className="btn delete-btn"
							onClick={deleteJob.bind(null, _id)}
						>
							Delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	);
};

export default Job;
