import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, { Component } from "react";

export class AddStudentModuleModal extends Component {
	constructor(props) {
		super(props);
		this.state = { stumodus: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event4) {
		event4.preventDefault();
		fetch("http://localhost:5000/api/classroom_stu_modu", {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				StudentID: event4.target.StudentID.value,
				StudentName: event4.target.StudentName.value,
				ModuleID: event4.target.ModuleID.value,
				ModuleName: event4.target.ModuleName.value,
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
							Add Student Module
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

									<Form.Group>
										<Button variant="primary" type="submit">
											Add Student Module
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
