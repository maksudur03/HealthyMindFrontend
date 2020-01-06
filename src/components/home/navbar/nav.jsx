import React from 'react';
import './style.css';
import swal from 'sweetalert';

export default class Nav extends React.Component {

	render() {
		return (
			<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-success position-relative">
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarTogglerDemo01">
					<a class="navbar-brand" href="/"><i>HealthyMind</i></a>
					<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
						<li class="nav-item active">
							<a class="nav-link text-white" href="/"><b>Home</b></a>
						</li>
						<li class="nav-item">
							<a class="nav-link text-white" href="/post"><b>Create Post</b></a>
						</li>
						<li class="nav-item">
							<a class="nav-link text-white" href="/profile/"><b>Profile</b></a>
						</li>
						<li class="nav-item active">
							<a class="nav-link text-white" href="http://localhost:8081/p2p"><b>Messenger</b></a>
						</li>
						<li class="nav-item active">
							<a class="nav-link text-white" href="/spec"><b>Specialist</b></a>
						</li>
						<li class="nav-item active">
							<a class="nav-link text-white" href="/admin_page"><b>Admin</b></a>
						</li>

					</ul>


					


					<a href="/register" class="btn btn-dark mr">Sign Up</a>
					<a href="/login" class="btn btn-dark mr">Log In</a>
					<a href="/logout" class="btn btn-dark mr">Log Out</a>

				</div>
			</nav>
		);
	}
} 