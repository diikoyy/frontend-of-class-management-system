/*import { Button, ButtonToolbar } from "react-bootstrap";
import React, { Component } from "react";

import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";
import { Table } from "react-bootstrap";
import { isElementOfType } from "react-dom/cjs/react-dom-test-utils.development";

export class Employee extends Component {
	constructor(props) {
		super(props);
		this.state = { emps: [], addModalShow: false, editModalShow: false };
	}

	refreshList() {
		fetch(`http://localhost:5000/api/employee`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ emps: data });
			});
	}

	componentDidMount() {
		this.refreshList();
	}

	componentDidUpdate() {
		this.refreshList();
	}

	deleteEmp(empid) {
		if (window.confirm("Are you sure?")) {
			fetch(`http://localhost:5000/api/employee/${empid}`, {
				method: "DELETE",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
			});
		}
	}
	render() {
		const { emps, empid, empname, depmt,photofilename, doj } = this.state;
		let addModalClose = () => this.setState({ addModalShow: false });
		let editModalClose = () => this.setState({ editModalShow: false });
		return (
			<div>
				<Table className="mt-4 " striped bordered hover size="sm">
					<thead>
						<tr>
							<th>EmployeeID</th>
							<th>EmployeeName</th>
							<th>Department</th>
							<th>DOJ</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{emps.map((emp) => (
							<tr key={emp.EmployeeId}>
								<td>{emp.EmployeeId}</td>
								<td>{emp.EmployeeName}</td>
								<td>{emp.Department}</td>
								<td>{emp.DateOfJoining}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											variant="info"
											onClick={() =>
												this.setState({
													editModalShow: true,
													empid: emp.EmployeeId,
													empname: emp.EmployeeName,
													depmt: emp.Department,
													photofilename: emp.PhotoFileName,
													doj: emp.DateOfJoining
												})
											}>
											Edit
										</Button>

										<Button
											className="mr-2"
											variant="danger"
											onClick={() => this.deleteEmp(emp.EmployeeId)}>
											Delete
										</Button>

										<EditEmpModal
											show={this.state.editModalShow}
											onHide={editModalClose}
											empid={empid}
											empname={empname}
											depmt={depmt}
											photofilename={photofilename}
											doj = {doj}
										/>
									</ButtonToolbar>
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				<ButtonToolbar>
					<Button
						variant="primary"
						onClick={() => this.setState({ addModalShow: true })}>
						Add Employee
					</Button>

					<AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
				</ButtonToolbar>
			</div>
		);
	}
} */
