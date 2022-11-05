import { Button, ButtonToolbar } from "react-bootstrap";
import React, { Component } from "react";

import { AddStudentModal } from "./AddStudentModal";
import { EditStudentModal } from "./EditStudentModal";
import { Table } from "react-bootstrap";

export class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stus: [],
            addModalShow: false,
            editModalShow: false,
        };
    }

	componentDidMount() {
		this.refreshList();
	}
	refreshList() {
		fetch("http://localhost:5000/api/classroom_student")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ stus: data });
			});
	}

	componentDidUpdate() {
		this.refreshList();
	}

	deleteStudent(stusid) {
		if (window.confirm("Are you sure?")) {
			fetch(`http://localhost:5000/api/classroom_student/${stusid}`, {
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
			stus,
			stunum,
			stusid,
			stusname,
			stumajor,
			stuintake,
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
							<th>Major</th>
							<th>Intake</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{stus.map((stu) => (
							<tr key={stu.Number}>
								<td>{stu.Number}</td>
								<td>{stu.StudentID}</td>
								<td>{stu.StudentName}</td>
								<td>{stu.Major}</td>
								<td>{stu.Intake}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											variant="info"
											onClick={() =>
												this.setState({
													editModalShow: true,
													stunum: stu.Number,
													stusid: stu.StudentID,
													stusname: stu.StudentName,
													stumajor: stu.Major,
													stuintake: stu.Intake,
												})
											}>
											Edit
										</Button>

										<Button
											className="mr-2"
											variant="danger"
											onClick={() => this.deleteStudent(stu.Number)}>
											Delete
										</Button>

										<EditStudentModal
											show={this.state.editModalShow}
											onHide={editModalClose}
											stunum={stunum}
											stusid={stusid}
											stusname={stusname}
											stumajor={stumajor}
											stuintake={stuintake}
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
						Add Student
					</Button>

					<AddStudentModal
						show={this.state.addModalShow}
						onHide={addModalClose}
					/>
				</ButtonToolbar>
			</div>
		);
	}
}
