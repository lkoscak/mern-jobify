import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const Stats = () => {
	const { showStats, isLoading, monthlyApplications } = useAppContext();
	useEffect(() => {
		showStats();
		//eslint-disable-next-line
	}, []);
	if (isLoading) {
		return <Loading center></Loading>;
	}

	return (
		<>
			<StatsContainer></StatsContainer>
			{monthlyApplications.length > 0 && <ChartsContainer></ChartsContainer>}
		</>
	);
};

export default Stats;
