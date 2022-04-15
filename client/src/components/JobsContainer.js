import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import useAppContext from "../hooks/useAppContext";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
	const {
		getJobs,
		jobs,
		isLoading,
		page,
		totalJobs,
		search,
		searchStatus,
		searchType,
		sort,
		numOfPages,
	} = useAppContext();
	useEffect(() => {
		var fetchTimeout = setTimeout(() => {
			getJobs();
		}, 300);
		return () => {
			clearTimeout(fetchTimeout);
		};
		//eslint-disable-next-line
	}, [search, searchStatus, searchType, sort, page]);

	if (isLoading) return <Loading center={true}></Loading>;
	if (jobs.length === 0)
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{jobs.length > 1 && "s"} found
			</h5>
			<div className="jobs">
				{jobs.map((job) => {
					return <Job key={job._id} {...job}></Job>;
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer></PageBtnContainer>}
		</Wrapper>
	);
};

export default JobsContainer;
