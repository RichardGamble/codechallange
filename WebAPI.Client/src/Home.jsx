import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import EmployeeModal from './Employee/EmployeeModal';
import DeleteConfirmationModal from './Employee/DeleteConfirmationModal';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Home = (props) => {
	const axios = require('axios');
	const [modalShow, setModalShow] = useState(false);
	const [modalShowDelete, setModalShowDelete] = useState(false);
	const [actionType, setActionType] = useState();
	const [employees, setEmployees] = useState([{}]);
	const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
	const [selectedEmployee, setSelectedEmployee] = useState({});

	useEffect(() => {
		getEmployees();
	}, []);

	async function getEmployees() {
		try {
			const response = await axios.get(process.env.REACT_APP_API + 'employee');
			setEmployees(response.data);
			setIsLoadingEmployees(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	let modalClose = () => {
		setModalShow(false);
		getEmployees();
	};

	let modalCloseDelete = () => {
		setModalShowDelete(false);
		getEmployees();
	};

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<button
							type='button'
							class='btn btn-primary'
							onClick={() => setModalShow(true)}>
							Add Employee
						</button>
					</Col>
				</Row>
				<br />

				{employees.length < 1 && (
					<Alert variant='success'>
						<Alert.Heading>Hi and welcome to Paymentum</Alert.Heading>
						<p>
							Looks like you don't have any employees created in the system. Simply,
							click the "Add Employee" button to begin using this application.
						</p>
						<hr />
						<p className='mb-0'>
							This application was built to simulate a real-world environment where
							employers input employees and their dependents, and get a preview of the
							costs.
						</p>
					</Alert>
				)}
				{employees.length > 0 && (
					<Row>
						<Col>
							{!isLoadingEmployees && (
								<table class='table align-middle mb-0 bg-white table-striped'>
									<thead class='bg-light'>
										<tr>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Created Date </th>
											<th>Updated Date</th>
											<th>Terminated</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{employees.map((emp) => (
											<tr key={emp.EmployeeId}>
												<td>{emp.EmployeeFirstName}</td>
												<td>{emp.EmployeeLastName}</td>
												<td>{moment(emp.DateCreated).format('MM/DD/YYYY')}</td>
												<td>{moment(emp.DateUpdated).format('MM/DD/YYYY')}</td>
												<td>{emp.IsTerminated === true ? 'Yes' : 'No'}</td>
												<td>
													<>
														<Link
															to={{
																pathname: `/employee/${emp.EmployeeId}`,
																state: { id: emp.EmployeeId },
															}}>
															<Button>Edit</Button>
														</Link>{' '}
														<button
															type='button'
															class='btn btn-danger'
															onClick={() => {
																setSelectedEmployee(emp);
																setModalShowDelete(true);
															}}>
															Delete
														</button>
													</>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
							{isLoadingEmployees && (
								<div class='d-flex justify-content-center'>
									<div class='spinner-border' role='status'>
										<span class='visually-hidden'>Loading...</span>
									</div>
								</div>
							)}
						</Col>
					</Row>
				)}
			</Container>

			<EmployeeModal
				show={modalShow}
				employeeInfo={selectedEmployee}
				action={actionType}
				onHide={modalClose}
			/>

			<DeleteConfirmationModal
				show={modalShowDelete}
				info={selectedEmployee}
				isEmployee={true}
				onHide={modalCloseDelete}
			/>
		</div>
	);
};

Home.propTypes = {};

export default Home;
