import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";

import mainImage from "../assets/images/main.svg";

import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo></Logo>
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						Job <span>tracking</span> App
					</h1>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
						perspiciatis delectus nemo repudiandae iure quasi rerum sint
						inventore sed ipsam. Fuga, eos magnam! Laboriosam reiciendis velit
						eaque atque, praesentium provident nisi quisquam ad. Deleniti earum
						esse sequi quaerat veniam id optio vero, provident, ex repellat
						natus, adipisci odio totam quibusdam.
					</p>
					<Link to="/register" className="btn btn-hero">
						Login/Register
					</Link>
				</div>
				<img src={mainImage} alt="Main landing page" className="img main-img" />
			</div>
		</Wrapper>
	);
};

export default Landing;
