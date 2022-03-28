import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';
import EmployeeModal from './EmployeeModal';
import moment from 'moment';

const Home = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();
	const [employees, setEmployees] = useState([
		{
			EmployeeId: 1,
			EmployeeFirstName: 'Lee',
			EmployeeLastName: 'Abbott',
			EmployeeSSN: '999999999',
			DateCreated: '2022-03-26T00:00:00',
			DateUpdated: '2022-03-26T00:00:00',
			DateOfBirth: null,
			IsTerminated: false,
			Dependents: [],
		},
		{
			EmployeeId: 2,
			EmployeeFirstName: 'Georg',
			EmployeeLastName: 'Trapp',
			EmployeeSSN: '555555555',
			DateCreated: '2022-03-26T00:00:00',
			DateUpdated: '2022-03-26T00:00:00',
			DateOfBirth: null,
			IsTerminated: false,
			Dependents: [],
		},
	]);
	const [selectedEmployee, setSelectedEmployee] = useState({
		EmployeeId: 1,
		EmployeeName: 'test',
	});

	const displayModal = () => {
		setShowModal(true);
	};

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
													onClick={() => displayModal()}>
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
					</Col>
				</Row>
			</Container>

			<EmployeeModal
				isOpen={showModal}
				employeeInfo={selectedEmployee}
				action={actionType}
			/>
		</div>
	);
};

Home.propTypes = {};

export default Home;
