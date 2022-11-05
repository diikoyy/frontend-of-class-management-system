import { Button, ButtonToolbar } from "react-bootstrap";
import React, { Component } from "react";

import { AddModuleModal } from "./AddModuleModal";
import { EditModuleModal } from "./EditModuleModal";
import { Table } from "react-bootstrap";

export class Module extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mods: [],
			addModalShow: false,
			editModalShow: false,
		};
	}

	componentDidMount() {
		this.refreshList();
	}
	refreshList() {
		fetch("http://localhost:5000/api/classroom_module")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ mods: data });
			});
	}

	componentDidUpdate() {
		this.refreshList();
	}

	deleteModule(modid) {
		if (window.confirm("Are you sure?")) {
			fetch(`http://localhost:5000/api/classroom_module/${modid}`, {
				method: "DELETE",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
			});
		}
	}
	render() {
		const { mods, modnum, modid, modname, moddate } = this.state;
		let addModalClose = () => this.setState({ addModalShow: false });
		let editModalClose = () => this.setState({ editModalShow: false });
		return (
			<div>
				<Table className="mt-4 " striped bordered hover size="sm">
					<thead>
						<tr>
							<th>Number</th>
							<th>ModuleID</th>
							<th>ModuleName</th>
							<th>Exam Date</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{mods.map((mod) => (
							<tr key={mod.Number}>
								<td>{mod.Number}</td>
								<td>{mod.ModuleID}</td>
								<td>{mod.ModuleName}</td>
								<td>{mod.ExamDate}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											variant="info"
											onClick={() =>
												this.setState({
													editModalShow: true,
													modnum: mod.Number,
													modid: mod.ModuleID,
													modname: mod.ModuleName,
													moddate: mod.ExamDate,
												})
											}>
											Edit
										</Button>

										<Button
											className="mr-2"
											variant="danger"
											onClick={() => this.deleteModule(mod.Number)}>
											Delete
										</Button>

										<EditModuleModal
											show={this.state.editModalShow}
											onHide={editModalClose}
											modnum={modnum}
											modid={modid}
											modname={modname}
											moddate={moddate}
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
						Add Module
					</Button>

					<AddModuleModal
						show={this.state.addModalShow}
						onHide={addModalClose}
					/>
				</ButtonToolbar>
			</div>
		);
	}
}
