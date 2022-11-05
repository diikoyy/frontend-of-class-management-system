import { Button, ButtonToolbar, Col, Form, Modal, Row } from "react-bootstrap";
import React, { Component } from "react";

export class AddAttendanceModal extends Component {
	constructor(props) {
		super(props);
		this.state = { attends: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch("http://localhost:5000/api/classroom_attendance", {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				StudentID: event.target.StudentID.value,
				ModuleID: event.target.ModuleID.value,
				DateOfAttendance: event.target.DateOfAttendance.value,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					alert(result);
				},
				(error) => {
					alert("Failed!");
				}
			);
	}
	render() {
		return (
			<div className="container">
				<Modal
					{...this.props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							Add Attendance
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="StudentID">
										<Form.Label>StudentID</Form.Label>
										<Form.Control
											type="text"
											name="StudentID"
											required
											placeholder="StudentID"
										/>
									</Form.Group>

									<Form.Group controlId="ModuleID">
										<Form.Label>ModuleID</Form.Label>
										<Form.Control
											type="text"
											name="ModuleID"
											required
											placeholder="ModuleID"
										/>
									</Form.Group>

									<Form.Group controlId="DateOfAttendance">
										<Form.Label>DateOfAttendance</Form.Label>
										<Form.Control
											type="text"
											name="DateOfAttendance"
											required
											placeholder="DateOfAttendance"
										/>
									</Form.Group>

									<Form.Group>
										<Button variant="primary" type="submit">
											Add Attendance
										</Button>
									</Form.Group>
								</Form>
							</Col>
						</Row>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="danger" onClick={this.props.onHide}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
