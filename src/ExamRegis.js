import { Button, ButtonToolbar } from "react-bootstrap";
import React, { Component } from "react";

import { AddExamRegisModal } from './AddExamRegisModal';
import { EditExamRegisModal } from './EditExamRegisModal';
import { Table } from "react-bootstrap";

export class ExamRegis extends Component {
	constructor(props) {
		super(props);
		this.state = {
			examregs: [],
			addModalShow: false,
			editModalShow: false,
		};
	}

	componentDidMount() {
		this.refreshList();
	}
	refreshList() {
		fetch("http://localhost:5000/api/classroom_exam_regis")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ examregs: data });
			});
	}

	componentDidUpdate() {
		this.refreshList();
	}

	deleteExamRegis(examregsid) {
		if (window.confirm("Are you sure?")) {
			fetch(`http://localhost:5000/api/classroom_exam_regis/${examregsid}`, {
				method: "DELETE",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
			});
		}
	}
	render() {
		const { examregs, examregnum, examregsid,examregsname, examregmid, examregmname, examregattempt } = this.state;
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
							<th>Attempt</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{examregs.map((examreg) => (
							<tr key={examreg.Number}>
								<td>{examreg.Number}</td>
								<td>{examreg.StudentID}</td>
								<td>{examreg.StudentName}</td>
								<td>{examreg.ModuleID}</td>
								<td>{examreg.ModuleName}</td>
								<td>{examreg.Attempt}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											variant="info"
											onClick={() =>
												this.setState({
													editModalShow: true,
													examregnum: examreg.Number,
													examregsid: examreg.StudentID,
													examregsname: examreg.StudentName,
													examregmid: examreg.ModuleID,
													examregmname: examreg.ModuleName,
													examregattempt: examreg.Attempt,
												})
											}>
											Edit
										</Button>

										<Button
											className="mr-2"
											variant="danger"
											onClick={() => this.deleteExamRegis(examreg.Number)}>
											Delete
										</Button>

										<EditExamRegisModal
											show={this.state.editModalShow}
											onHide={editModalClose}
											examregnum={examregnum}
											examregsid={examregsid}
											examregsname={examregsname}
											examregmid={examregmid}
											examregmname={examregmname}
											examregattempt={examregattempt}
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
						Add Exam Registration
					</Button>

					<AddExamRegisModal
						show={this.state.addModalShow}
						onHide={addModalClose}
					/>
				</ButtonToolbar>
			</div>
		);
	}
}
