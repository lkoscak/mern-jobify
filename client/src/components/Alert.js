import { useSelector } from "react-redux";

const Alert = () => {
	const { alertType, alertText } = useSelector((state) => {
		return {
			alertType: state.alert.alertType,
			alertText: state.alert.alertText,
		};
	});
	return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
