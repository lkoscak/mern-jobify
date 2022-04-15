import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import useAppContext from "../hooks/useAppContext";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useAppContext();
	return (
		<Wrapper>
			<div className={`sidebar-container ${showSidebar && "show-sidebar"}`}>
				<div className="content">
					<button type="button" className="close-btn" onClick={toggleSidebar}>
						<FaTimes></FaTimes>
					</button>
					<header>
						<Logo></Logo>
					</header>
					<NavLinks toggleSidebar={toggleSidebar}></NavLinks>
				</div>
			</div>
		</Wrapper>
	);
};

export default SmallSidebar;
