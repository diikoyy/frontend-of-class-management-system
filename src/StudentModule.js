import { Button, ButtonToolbar } from "react-bootstrap";
import React, { Component } from "react";

import { AddStudentModuleModal } from "./AddStudentModuleModal";
import { EditStudentModuleModal } from "./EditStudentModuleModal";
import { Table } from "react-bootstrap";

export class StudentModule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stumodus: [],
			addModalShow: false,
			editModalShow: false,
		};
	}

	componentDidMount() {
		this.refreshList();
	}
	refreshList() {
		fetch("http://localhost:5000/api/classroom_stu_modu")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ stumodus: data });
			});
	}

	componentDidUpdate() {
		this.refreshList();
	}

	deleteStudentModule(stumodusid) {
		if (window.confirm("Are you sure?")) {
			fetch(`http://localhost:5000/api/classroom_stu_modu/${stumodusid}`, {
				method: "DELETE",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
			});
		}
	}
	render() {
		const {
            stumodus,
            stumodunum,
			stumodusid,
			stumodusname,
			stumodumid,
			stumodumname,
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
							<th>StudentName</th>
							<th>ModuleID</th>
							<th>ModuleName</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{stumodus.map((stumodu) => (
							<tr key={stumodu.Number}>
								<td>{stumodu.Number}</td>
								<td>{stumodu.StudentID}</td>
								<td>{stumodu.StudentName}</td>
								<td>{stumodu.ModuleID}</td>
								<td>{stumodu.ModuleName}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											variant="info"
											onClick={() =>
												this.setState({
													editModalShow: true,
													stumodunum: stumodu.Number,
													stumodusid: stumodu.StudentID,
													stumodusname: stumodu.StudentName,
													stumodumid: stumodu.ModuleID,
													stumodumanme: stumodu.ModuleName,
												})
											}>
											Edit
										</Button>

										<Button
											className="mr-2"
											variant="danger"
											onClick={() => this.deleteStudentModule(stumodu.Number)}>
											Delete
										</Button>

										<EditStudentModuleModal
											show={this.state.editModalShow}
											onHide={editModalClose}
											stumodunum={stumodunum}
											stumodusid={stumodusid}
											stumodusname={stumodusname}
											stumodumid={stumodumid}
											stumodumname={stumodumname}
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
						Add Student Module
					</Button>

					<AddStudentModuleModal
						show={this.state.addModalShow}
						onHide={addModalClose}
					/>
				</ButtonToolbar>
			</div>
		);
	}
}
