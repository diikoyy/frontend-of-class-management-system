import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, { Component } from "react";

export class EditModuleModal extends Component {
	constructor(props) {
		super(props);
		this.state = { mods: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch("http://localhost:5000/api/classroom_module", {
			method: "PUT",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Number: event.target.Number.value,
				ModuleID: event.target.ModuleID.value,
				ModuleName: event.target.ModuleName.value,
				ExamDate: event.target.ExamDate.value,
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
							Edit Module
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
											defaultValue={this.props.modnum}
											placeholder="Number"
										/>
									</Form.Group>

									<Form.Group controlId="ModuleID">
										<Form.Label>ModuleID</Form.Label>
										<Form.Control
											type="text"
											name="ModuleID"
											required
											disabled
											defaultValue={this.props.modid}
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
											defaultValue={this.props.modname}
											placeholder="ModuleName"
										/>
									</Form.Group>

									<Form.Group controlId="ExamDate">
										<Form.Label>ExamDate</Form.Label>
										<Form.Control
											type="text"
											name="ExamDate"
											required
											defaultValue={this.props.moddate}
											placeholder="ExamDate"
										/>
									</Form.Group>

									<Form.Group>
										<Button variant="primary" type="submit">
											Update Module
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
