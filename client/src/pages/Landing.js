import React from "react";
import styled from "styled-components";

import logo from "../assets/images/logo.svg";
import mainImage from "../assets/images/main.svg";

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<img src={logo} alt="Jobify logo" className="logo" />
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
					<button className="btn btn-hero">Login/Register</button>
				</div>
				<img src={mainImage} alt="Main landing page" className="img main-img" />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.main`
	nav {
		width: var(--fluid-width);
		max-width: var(--max-width);
		margin: 0 auto;
		height: var(--nav-height);
		display: flex;
		align-items: center;
	}
	.page {
		min-height: calc(100vh - var(--nav-height));
		display: grid;
		align-items: center;
		margin-top: -3rem;
	}
	h1 {
		font-weight: 700;
		span {
			color: var(--primary-500);
		}
	}
	p {
		color: var(--grey-600);
	}
	.main-img {
		display: none;
	}
	@media (min-width: 992px) {
		.page {
			grid-template-columns: 1fr 1fr;
			column-gap: 3rem;
		}
		.main-img {
			display: block;
		}
	}
`;

export default Landing;
