import { Button, ButtonToolbar } from "react-bootstrap";
import React, { Component } from "react";

import { AddAttendanceModal } from "./AddAttendanceModal";
import { EditAttendanceModal } from "./EditAttendanceModal";
import { Table } from 'react-bootstrap';

export class Attendance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attends: [],
			addModalShow: false,
			editModalShow: false,
		};
	}

	componentDidMount() {
		this.refreshList();
	}
	refreshList() {
		fetch("http://localhost:5000/api/classroom_attendance")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ attends: data });
			});
	}

	componentDidUpdate() {
		this.refreshList();
	}

	deleteAttendance(attendsid) {
		if (window.confirm("Are you sure?")) {
			fetch(
				`http://localhost:5000/api/classroom_attendance/${attendsid}`,
				{
					method: "DELETE",
					headers: {
						Accept: "*/*",
						"Content-Type": "application/json",
					},
				}
			);
		}
	}
	render() {
		const {
			attends,
			attendnum,
			attendsid,
			attendmid,
			attenddoa,
		} = this.state;
		let addModalClose = () => this.setState({ addModalShow: false });
		let editModalClose = () => this.setState({ editModalShow: false });
		return (
			<div>
				<Table className="mt-4 " striped bordered hover size="sm">
					<thead>
						<tr>
							<th>Number</th>
							<th>StudentID</th>
							<th>ModuleID</th>
							<th>DateOfAttendance</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{attends.map((attend) => (
							<tr key={attend.Number}>
								<td>{attend.Number}</td>
								<td>{attend.StudentID}</td>
								<td>{attend.ModuleID}</td>
								<td>{attend.DateOfAttendance}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											variant="info"
											onClick={() =>
												this.setState({
													editModalShow: true,
													attendnum: attend.Number,
													attendsid: attend.StudentID,
													attendmid: attend.ModuleID,
													attenddoa: attend.DateOfAttendance,
												})
											}>
											Edit
										</Button>

										<Button
											className="mr-2"
											variant="danger"
											onClick={() => this.deleteAttendance(attend.Number)}>
											Delete
										</Button>

										<EditAttendanceModal
											show={this.state.editModalShow}
											onHide={editModalClose}
											attendnum={attendnum}
											attendsid={attendsid}
											attendmid={attendmid}
											attenddoa={attenddoa}
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
						Add Attendance
					</Button>

					<AddAttendanceModal
						show={this.state.addModalShow}
						onHide={addModalClose}
					/>
				</ButtonToolbar>
			</div>
		);
	}
}
