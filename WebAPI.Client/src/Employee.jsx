import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
	Modal,
	Button,
	Row,
	Col,
	Form,
	InputGroup,
	Container,
	Tab,
	Tabs,
	Alert
} from 'react-bootstrap';
import DependentModal from './EmployeeModal';
import Paychecks from './Paychecks';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

const Employee = (props) => {
	const axios = require('axios');
	let { slug } = useParams();
	const { employeeInfo, show, onHide } = props;
	let location = useLocation();
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();
	const [dependents, setDependents] = useState([{}]);
	const [employee, setEmployee] = useState([{}]);
	const [isLoadingDependents, setIsLoadingDependents] = useState(true);
	const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);

	useEffect(() => {
		var id =
			location.pathname.split('/')[location.pathname.split('/').length - 1];
		getEmployee(id);
		getDependents(id);
	}, [location]);

	async function getEmployee(id) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'employee/' + id
			);
			setEmployee(response.data);
			setIsLoadingEmployee(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
	async function getDependents(empId) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'dependent/all/' + empId
			);
			setDependents(response.data);
			setIsLoadingDependents(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	const schema = yup.object().shape({
		EmployeeId: yup.string(),
		EmployeeFirstName: yup
			.string()
			.required('Employee First Name is a required field'),
		EmployeeLastName: yup
			.string()
			.required('Employee Last Name is a required field'),
		EmployeeSsn: yup
			.string()
			.required('Employee SSN is a required field')
			.matches(/\d{9}/, 'Must only be numbers'),
		DateOfBirth: yup
			.date()
			.required('Employee Date of Birth is a required field'),
		IsTerminated: yup.bool().required(),
	});

	const [selectedDependent, setSelectedDependent] = useState({
		EmployeeId: 1,
		EmployeeName: 'test',
	});

	const displayModal = () => {
		setShowModal(true);
	};
	const [modalShow, setModalShow] = useState(false);
	let modalClose = () => setModalShow(false);

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'JWT fefege...',
	};
	const updateEmployee = (values) => {
		try {
			axios.put(process.env.REACT_APP_API + 'employee/' + employee.EmployeeId, {
				headers: headers,
				data: values,
			});
		} catch (error) {}
	};

	return (
		<div>
			<Container>
				<Tabs
					defaultActiveKey='employee'
					id='uncontrolled-tab-example'
					className='mb-3'>
					<Tab eventKey='employee' title='Employee Information'>
						<Row>
							{!isLoadingEmployee && (
								<Formik
									validationSchema={schema}
									onSubmit={console.log}
									initialValues={{
										EmployeeId: employee.EmployeeId,
										EmployeeFirstName: '',
										EmployeeLastName: '',
										EmployeeSsn: '',
										DateOfBirth: '',
										IsTerminated: false,
										DateCreated: null,
										Dependents: [],
										DateUpdated: null,
									}}>
									{({
										handleSubmit,
										handleChange,
										handleBlur,
										values,
										touched,
										isValid,
										errors,
										dirty,
									}) => (
										<Form noValidate onSubmit={() => updateEmployee(values)}>
											{/* {JSON.stringify(errors)} */}
											<Row className='mb-3'>
												<Form.Group as={Col} md='3' controlId='validationFormik01'>
													<Form.Label>First Name</Form.Label>
													<Form.Control
														type='text'
														name='EmployeeFirstName'
														value={values.EmployeeFirstName}
														onChange={handleChange}
														isValid={touched.EmployeeFirstName && !errors.EmployeeFirstName}
														isInvalid={
															touched.EmployeeFirstName && !!errors.EmployeeFirstName
														}
													/>
													<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
													<Form.Control.Feedback type='invalid'>
														{errors.EmployeeFirstName}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md='3' controlId='validationFormik02'>
													<Form.Label>Last Name</Form.Label>
													<Form.Control
														type='text'
														name='EmployeeLastName'
														value={values.EmployeeLastName}
														onChange={handleChange}
														isValid={touched.EmployeeLastName && !errors.EmployeeLastName}
														isInvalid={touched.EmployeeLastName && !!errors.EmployeeLastName}
													/>
													<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
													<Form.Control.Feedback type='invalid'>
														{errors.EmployeeLastName}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md='3' controlId='validationFormik02'>
													<Form.Label>Employee SSN</Form.Label>
													<Form.Control
														type='string'
														name='EmployeeSsn'
														value={values.EmployeeSsn}
														onChange={handleChange}
														isValid={touched.EmployeeSsn && !errors.EmployeeSsn}
														isInvalid={touched.EmployeeSsn && !!errors.EmployeeSsn}
													/>
													<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
													<Form.Control.Feedback type='invalid'>
														{errors.EmployeeSsn}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md='3' controlId='validationFormik02'>
													<Form.Label>Date of Birth</Form.Label>
													<Form.Control
														type='date'
														name='DateOfBirth'
														value={values.DateOfBirth}
														onChange={handleChange}
														isValid={touched.DateOfBirth && !errors.DateOfBirth}
														isInvalid={touched.DateOfBirth && !!errors.DateOfBirth}
													/>
													<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
													<Form.Control.Feedback type='invalid'>
														{errors.DateOfBirth}
													</Form.Control.Feedback>
												</Form.Group>
											</Row>
											<Row className='mb-3'>
												<Form.Group as={Col} md='12' controlId='validationFormik02'>
													<Form.Check
														name='IsTerminated'
														label='Employee is actively employed?'
														onChange={handleChange}
														isValid={touched.IsTerminated && !errors.IsTerminated}
														feedback={errors.IsTerminated}
														feedbackType='invalid'
														id='validationFormik0'
													/>
												</Form.Group>
											</Row>
											<Row className='mb-3'>
												<Col>
													<div className='d-flex justify-content-end'>
														<div>
															<Button type='submit'>Save Changes</Button>
														</div>
													</div>
												</Col>
											</Row>
										</Form>
									)}
								</Formik>
							)}
						</Row>
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
						{dependents.length < 1 && (
							<Alert variant='info'>
								<Alert.Heading>Uh-oh</Alert.Heading>
								<p>
									Looks like you don't have any dependents created for <b>{employee.EmployeeFirstName + " " + employee.EmployeeLastName  }</b>. Simply,
									click the "Add Dependent" button to add dependents.
								</p>								
							</Alert>
						)}
						<Row>
							<Col>
								{!isLoadingDependents && dependents.length > 0 && (
									<table class='table align-middle mb-0 bg-white table-striped'>
										<thead class='bg-light'>
											<tr>
												<th>First Name</th>
												<th>Last Name</th>
												<th>Created Date </th>
												<th>Updated Date</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{dependents.map((dep) => (
												<tr key={dep.DependentId}>
													<td>{dep.DependentFirstName}</td>
													<td>{dep.DependentLastName}</td>
													<td>{moment(dep.DateCreated).format('MM/DD/YYYY')}</td>
													<td>{moment(dep.DateUpdated).format('MM/DD/YYYY')}</td>
													<td>
														<>
															<button
																type='button'
																class='btn btn-primary'
																onClick={() => setModalShow(true)}>
																Edit
															</button>{' '}
															<button
																type='button'
																class='btn btn-danger'
																onClick={() => this.deletedep(dep.DependentId)}>
																Delete
															</button>
														</>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								)}
								{isLoadingDependents && (
									<div class='d-flex justify-content-center'>
										<div class='spinner-border' role='status'>
											<span class='visually-hidden'>Loading...</span>
										</div>
									</div>
								)}
							</Col>
						</Row>
					</Tab>
					<Tab eventKey='paycheck' title='Paychecks'>
						<Paychecks employeeId={employee.EmployeeId} />
					</Tab>				
				</Tabs>
			</Container>

			<DependentModal
				show={modalShow}
				employeeInfo={selectedDependent}
				action={actionType}
				onHide={modalClose}
				isEmployee={false}
			/>
		</div>
	);
};

Employee.propTypes = {};

export default Employee;
