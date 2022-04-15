import { useState } from "react";
import useAppContext from "../hooks/useAppContext";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

const Navbar = () => {
	const { toggleSidebar, user, logoutUser } = useAppContext();
	const [showLogout, setShowLogout] = useState(false);
	return (
		<Wrapper>
			<div className="nav-center">
				<button type="button" className="toggle-btn" onClick={toggleSidebar}>
					<FaAlignLeft></FaAlignLeft>
				</button>
				<div>
					<Logo></Logo>
					<h3 className="logo-text">dashboard</h3>
				</div>
				<div className="btn-container">
					<button className="btn" onClick={() => setShowLogout(!showLogout)}>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
						<button onClick={logoutUser} className="dropdown-btn">
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Navbar;
