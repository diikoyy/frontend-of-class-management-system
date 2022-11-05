import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, { Component } from "react";

export class EditExamRegisModal extends Component {
	constructor(props) {
		super(props);
		this.state = { examregs: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch("http://localhost:5000/api/classroom_exam_regis", {
			method: "PUT",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Number: event.target.Number.value,
				StudentID: event.target.StudentID.value,
				StudentName: event.target.StudentName.value,
				ModuleID: event.target.ModuleID.value,
				ModuleName: event.target.ModuleName.value,
				Attempt: event.target.Attempt.value
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
							Edit Exam Registraion
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
											disabled
											defaultValue={this.props.examregnum}
											placeholder="Number"
										/>
									</Form.Group>

									<Form.Group controlId="StudentID">
										<Form.Label>StudentID</Form.Label>
										<Form.Control
											type="text"
											name="StudentID"
											required
											disabled
											defaultValue={this.props.examregsid}
											placeholder="StudentID"
										/>
									</Form.Group>

									<Form.Group controlId="StudentName">
										<Form.Label>StudentName</Form.Label>
										<Form.Control
											type="text"
											name="StudentName"
											required
											disabled
											defaultValue={this.props.examregsname}
											placeholder="StudentName"
										/>
									</Form.Group>

									<Form.Group controlId="ModuleID">
										<Form.Label>ModuleID</Form.Label>
										<Form.Control
											type="text"
											name="ModuleID"
											required
											disabled
											defaultValue={this.props.examregmid}
											placeholder="ModuleID"
										/>
									</Form.Group>

									<Form.Group controlId="ModuleName">
										<Form.Label>ModuleName</Form.Label>
										<Form.Control
											type="text"
											name="ModuleName"
											required
											disabled
											defaultValue={this.props.examregmname}
											placeholder="ModuleName"
										/>
									</Form.Group>

									<Form.Group controlId="Attempt">
										<Form.Label>Attempt</Form.Label>
										<Form.Control
											type="text"
											name="Attempt"
											required
											defaultValue={this.props.examregattempt}
											placeholder="Attempt"
										/>
									</Form.Group>

									<Form.Group>
										<Button variant="primary" type="submit">
											Update Exam Registraion
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
