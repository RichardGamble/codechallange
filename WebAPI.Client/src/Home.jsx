import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';
import EmployeeModal from './EmployeeModal';
import moment from 'moment';

const Home = (props) => {
	const axios = require('axios');
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();
	const [employees, setEmployees] = useState([{}]);
	const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);

	useEffect(() => {
		getEmployees();
	}, []);

	// Want to use async/await? Add the `async` keyword to your outer function/method.
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

	const [selectedEmployee, setSelectedEmployee] = useState({
		EmployeeId: 1,
		EmployeeName: 'test',
	});

	const displayModal = () => {
		setShowModal(true);
	};
	const[modalShow,setModalShow] = useState(false)
	let modalClose=()=>setModalShow(false)

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<button
							type='button'
							class='btn btn-primary'
							onClick={() => displayModal()}>
							Add Employee
						</button>
					</Col>
				</Row>
				<br />
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
											<td>{emp.IsTerminated === true ? 'Yes' : 'False'}</td>
											<td>
												<>
													<button
														type='button'
														class='btn btn-primary'
														onClick={()=>setModalShow(true)}>
														Edit
													</button>{' '}
													<button
														type='button'
														class='btn btn-danger'
														onClick={() => this.deleteemp(emp.EmployeeId)}>
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
			</Container>

			<EmployeeModal
				show={modalShow}
				employeeInfo={selectedEmployee}
				action={actionType}
				onHide={modalClose}
			/>
		</div>
	);
};

Home.propTypes = {};

export default Home;
