import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, { Component } from "react";

export class AddExamRegisModal extends Component {
	constructor(props) {
		super(props);
		this.state = { examregs: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event2) {
		event2.preventDefault();
		fetch("http://localhost:5000/api/classroom_exam_regis", {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                StudentID: event2.target.StudentID.value,
                StudentName: event2.target.StudentName.value,
                ModuleID: event2.target.ModuleID.value,
                ModuleName: event2.target.ModuleName.value,
				Attempt: event2.target.Attempt.value,
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
							Add Exam Registration
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

									<Form.Group controlId="ModuleID">
										<Form.Label>ModuleID</Form.Label>
										<Form.Control
											type="text"
											name="ModuleID"
											required
											placeholder="ModuleID"
										/>
									</Form.Group>

									<Form.Group controlId="ModuleName">
										<Form.Label>ModuleName</Form.Label>
										<Form.Control
											type="text"
											name="ModuleName"
											required
											placeholder="ModuleName"
										/>
									</Form.Group>

									<Form.Group controlId="Attempt">
										<Form.Label>Attempt</Form.Label>
										<Form.Control
											type="text"
											name="Attempt"
											required
											placeholder="Attempt"
										/>
									</Form.Group>

									<Form.Group>
										<Button variant="primary" type="submit">
											Add Exam Registration
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
