import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import React, { Component } from "react";

export class EditEmpModal extends Component {
	constructor(props) {
		super(props);
		this.state = { deps: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileSelected = this.handleFileSelected.bind(this);
	}

	photofilename = "anonymous.png";
	imagesrc = "http:localhost:5000/Photos/" + this.photofilename;

	componentDidMount() {
		fetch("http://localhost:5000/api/department")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ deps: data });
			});
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch("http://localhost:5000/api/employee", {
			method: "PUT",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                EmployeeId: event.target.EmployeeId.value,
                EmployeeName: event.target.EmployeeName.value,
				Department: event.target.Department.value,
				DateOfJoining: event.target.DateOfJoining.value,
				PhotoFileName: this.photofilename,
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

	handleFileSelected(event) {
		event.preventDefault();
		this.photofilename = event.target.files[0].name;
		const formData = new FormData();
		formData.append(
			"myFile",
			event.target.files[0],
			event.target.files[0].name
		);

		fetch("http://localhost:5000/api/employee/savefile", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then(
				(result) => {
					this.imagesrc = "http://localhost:5000/Photos/" + result;
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
							Edit Employee
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    
									<Form.Group controlId="EmployeeId">
										<Form.Label>EmployeeId</Form.Label>
										<Form.Control
											type="text"
											name="EmployeeId"
											required
                                            placeholder="EmployeeId"
                                            disabled
                                            defaultValue={this.props.empid}
										/>
                                    </Form.Group>
                                    
									<Form.Group controlId="EmployeeName">
										<Form.Label>EmployeeName</Form.Label>
										<Form.Control
											type="text"
											name="EmployeeName"
                                            required
                                            defaultValue={this.props.empname}
											placeholder="EmployeeName"
										/>
									</Form.Group>

									<Form.Group controlId="Department">
										<Form.Label>Department</Form.Label>
										<Form.Control as="select" defaultValue={this.props.depmt} >
											{this.state.deps.map((dep) => (
												<option key={dep.DepartmentId}>
													{dep.DepartmentName}
												</option>
											))}
										</Form.Control>
									</Form.Group>

									<Form.Group controlId="DateOfJoining">
										<Form.Label>DateOfJoining</Form.Label>
										<Form.Control
											type="date"
											name="DateOfJoining"
                                            required
                                            defaultValue={this.props.dof}
											placeholder="DateOfJoining"
										/>
									</Form.Group>

									<Form.Group>
										<Button variant="primary" type="submit">
											Update Employee
										</Button>
									</Form.Group>
								</Form>
							</Col>

							<Col sm={6}>
								<Image width="200px" height="200px" src={'http://localhost:5000/Photos/' + this.props.photofilename} />
								<input onChange={this.handleFileSelected} type="File" />
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
