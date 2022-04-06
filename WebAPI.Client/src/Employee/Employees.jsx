import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Employees = ({companyId}) => {
	const axios = require('axios');
	const navigate = useNavigate();
	const [employees, setEmployees] = useState([{}]);
	const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);

	useEffect(() => {
		getEmployees(companyId);
	}, [companyId]);

	async function getEmployees(companyId) {
		try {
			const response = await axios.get(process.env.REACT_APP_API + 'employee/company/' + companyId);
			setEmployees(response.data);
			setIsLoadingEmployees(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	function handleClickNavigate() {
		navigate('/');
	}

	return (
		<div>
			<Container>
				{employees.length < 1 && (
					<Alert variant='info'>
						<p>
							Looks like you don't have any employees created in the system. Navigate to the home page to add employees.
						</p>
						<div className='d-flex justify-content-end'>
							<Button onClick={handleClickNavigate} >
								Home 
							</Button>
						</div>
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
														</Link>														
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
		</div>
	);
};

Employees.propTypes = {};

export default Employees;
