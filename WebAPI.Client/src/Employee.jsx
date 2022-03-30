import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';
import DependentModal from './EmployeeModal';
import moment from 'moment';


const Employee = props => {
	const axios = require('axios');
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();
	const [dependents, setDependents] = useState([{}]);
	const [employee, setEmployee] = useState([{}]);
	const [isLoadingDependents, setIsLoadingDependents] = useState(true);
	const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);

	useEffect(() => {
		getEmployee(props.match.params.id);
        getDependents(props.match.params.id);
	}, []);

	 function getEmployee() {
		try {
			const response =  axios.get(process.env.REACT_APP_API + 'employee');
			setEmployee(response.data);
			setIsLoadingEmployee(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
	 function getDependents(empId) {
		try {
			const response = axios.get(process.env.REACT_APP_API + 'dependent');
			setDependents(response.data);
			setIsLoadingDependents(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	const [selectedDependent, setSelectedDependent] = useState({
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
							Add Dependent
						</button>
					</Col>
				</Row>
				<br />
				<Row>
					<Col>
						{!isLoadingDependents && (
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
									{dependents.map((dep) => (
										<tr key={dep.EmployeeId}>
											<td>{dep.EmployeeFirstName}</td>
											<td>{dep.EmployeeLastName}</td>
											<td>{moment(dep.DateCreated).format('MM/DD/YYYY')}</td>
											<td>{moment(dep.DateUpdated).format('MM/DD/YYYY')}</td>
											<td>{dep.IsTerminated === true ? 'Yes' : 'False'}</td>
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
														onClick={() => this.deletedep(dep.EmployeeId)}>
														Delete
													</button>
												</>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
						{isLoadingDependents&& (
							<div class='d-flex justify-content-center'>
								<div class='spinner-border' role='status'>
									<span class='visually-hidden'>Loading...</span>
								</div>
							</div>
						)}
					</Col>
				</Row>
			</Container>

			<DependentModal
				show={modalShow}
				employeeInfo={selectedDependent}
				action={actionType}
				onHide={modalClose}
			/>
		</div>
    );
};

Employee.propTypes = {
    
};

export default Employee;