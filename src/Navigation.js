import {Nav, Navbar} from "react-bootstrap";
import React, { Component } from "react";

import { NavLink } from "react-router-dom";

export class Navigation extends Component {
	render() {
        return (
					<Navbar bg="dark" expand="lg">
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav>
								<NavLink className="d-inline p-2 bg-dark text-white" to="/">
									Home
								</NavLink>
								<NavLink
									className="d-inline p-2 bg-dark text-white"
									to="/classroom_attendance">
									Classroom_Attendance
								</NavLink>
								<NavLink
									className="d-inline p-2 bg-dark text-white"
									to="/classroom_exam_regis">
									Exam Registration
								</NavLink>
								<NavLink
									className="d-inline p-2 bg-dark text-white"
									to="/classroom_module">
									Classroom Module
								</NavLink>
								<NavLink
									className="d-inline p-2 bg-dark text-white"
									to="/classroom_stu_modu">
									Student Module
								</NavLink>
								<NavLink
									className="d-inline p-2 bg-dark text-white"
									to="/classroom_student">
									Student
								</NavLink>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				);
	}
}
