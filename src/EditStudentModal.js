import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, { Component } from "react";

export class EditStudentModal extends Component {
	constructor(props) {
		super(props);
		this.state = { stus: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch("http://localhost:5000/api/classroom_student", {
			method: "PUT",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Number: event.target.Number.value,
				StudentID: event.target.StudentID.value,
				StudentName: event.target.StudentName.value,
				Major: event.target.Major.value,
				Intake: event.target.Intake.value,
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
							Edit Student
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="Number">
										<Form.Label>Number</Form.Label>
										<Form.Control
											type="text"
											name="Number"
											required
											defaultValue={this.props.stunum}
											placeholder="Number"
										/>
									</Form.Group>

									<Form.Group controlId="StudentID">
										<Form.Label>StudentID</Form.Label>
										<Form.Control
											type="text"
											name="StudentID"
											required
											defaultValue={this.props.stusid}
											placeholder="StudentID"
										/>
									</Form.Group>

									<Form.Group controlId="StudentName">
										<Form.Label>StudentName</Form.Label>
										<Form.Control
											type="text"
											name="StudentName"
											required
											defaultValue={this.props.stusname}
											placeholder="StudentName"
										/>
									</Form.Group>

									<Form.Group controlId="Major">
										<Form.Label>Major</Form.Label>
										<Form.Control
											type="text"
											name="Major"
											required
											defaultValue={this.props.stumajor}
											placeholder="Major"
										/>
									</Form.Group>

									<Form.Group controlId="Intake">
										<Form.Label>Intake</Form.Label>
										<Form.Control
											type="text"
											name="Intake"
											required
											defaultValue={this.props.stuintake}
											placeholder="Intake"
										/>
									</Form.Group>

									<Form.Group>
										<Button variant="primary" type="submit">
											Update Student
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
