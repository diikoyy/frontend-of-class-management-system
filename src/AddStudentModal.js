import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, { Component } from "react";

export class AddStudentModal extends Component {
	constructor(props) {
		super(props);
		this.state = { stus: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event5) {
		event5.preventDefault();
		fetch("http://localhost:5000/api/classroom_student", {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				StudentID: event5.target.StudentID.value,
				StudentName: event5.target.StudentName.value,
				Major: event5.target.Major.value,
				Intake: event5.target.Intake.value,
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
							Add Student
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

									<Form.Group controlId="StudentName">
										<Form.Label>StudentName</Form.Label>
										<Form.Control
											type="text"
											name="StudentName"
											required
											placeholder="StudentName"
										/>
									</Form.Group>

									<Form.Group controlId="Major">
										<Form.Label>Major</Form.Label>
										<Form.Control
											type="text"
											name="Major"
											required
											placeholder="Major"
										/>
									</Form.Group>

									<Form.Group controlId="Intake">
										<Form.Label>Intake</Form.Label>
										<Form.Control
											type="text"
											name="Intake"
											required
											placeholder="Intake"
										/>
									</Form.Group>

									<Form.Group>
										<Button variant="primary" type="submit">
											Add Student
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
