import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	Button,
	Row,
	Col,
	Form,wwwdwddw
	Container,
	Tab,
	Tabs,
	Alert,
	Card,
} from 'react-bootstrap';
import DependentModal from './Dependent/DependentModal';
import Paychecks from './Paychecks';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { employeeSchema } from './EmployeeValidation';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const Employee = (props) => {
	const axios = require('axios');
	let location = useLocation();
	const [addMode, setAddMode] = useState();
	const [dependents, setDependents] = useState([{}]);
	const [isLoadingDependents, setIsLoadingDependents] = useState(true);
	const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
	const [showSuccess, setShowSuccess] = useState(false);
	const [saveStatusCode, setSaveStatusCode] = useState(0);
	const [employee, setEmployee] = useState({});
	const [companies, setCompanies] = useState();
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [modalShowDelete, setModalShowDelete] = useState(false);
	const [company, setCompany] = useState({});
	const [isLoadingCompany, setIsLoadingCompany] = useState(true);

	const [selectedDependent, setSelectedDependent] = useState(null);

	let modalClose = () => {
		getDependents(employee.EmployeeId);
		setModalShow(false);
	};

	useEffect(() => {
		var id =
			location.pathname.split('/')[location.pathname.split('/').length - 1];
		getCompanies();
		getEmployee(id);
		getDependents(id);
	}, [location]);

	useEffect(() => {
		if (employee.CompanyId) {
			getCompany(employee.CompanyId);
		}
	}, [employee]);

	async function getEmployee(id) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'employee/' + id
			);

			let employee = response.data;
			employee.DateOfBirth = moment(employee.DateOfBirth)
				.format('YYYY-MM-DD')
				.toString();
			setEmployee(response.data);
			setIsLoadingEmployee(false);
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
		} catch (error) {
			console.error(error);
		}
	}

	const getCompanies = async () => {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'company/simple'
			);
			setCompanies(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	async function getCompany(id) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'company/' + id
			);

			let company = response.data;
			company.DateCreated = moment(company.DateCreated)
				.format('YYYY-MM-DD')
				.toString();
			company.DateUpdated = moment(company.DateUpdated)
				.format('YYYY-MM-DD')
				.toString();
			setCompany(response.data);
			setIsLoadingCompany(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	const headers = {
		'Content-Type': 'application/json; charset=utf-8',
	};

	const updateEmployee = async (values) => {
		try {
			const response = await axios.put(
				process.env.REACT_APP_API + 'employee/' + employee.EmployeeId,
				values,
				{
					headers: headers,
				}
			);
			setShowAlert(true);
			setSaveStatusCode(response.status);
			setShowSuccess(true);
			setEmployee(response.data);

			setTimeout(function () {
				setShowAlert(false);
			}, 3000);
		} catch (error) {
			setSaveStatusCode(error.response.status);
		}
	};

	let modalCloseDelete = () => {
		setModalShowDelete(false);
		getDependents(employee.EmployeeId);
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
							<Col>
								{!isLoadingEmployee && (
									<Card>
										<Card.Body>
											<Formik
												validationSchema={employeeSchema}
												onSubmit={(values, { resetForm }) => {
													updateEmployee(values);
													resetForm({ values });
												}}
												initialValues={employee}>
												{({
													handleSubmit,
													handleChange,
													handleBlur,
													values,
													touched,
													isValid,
													errors,
													isSubmitting,
													resetForm,
													dirty,
													setFieldValue,
													setFieldTouched,
												}) => (
													<Form noValidate onSubmit={handleSubmit}>
														<Row className='mb-3'>
															<Form.Group as={Col} md='2' controlId='validationFormik01'>
																<Form.Label>First Name</Form.Label>
																<Form.Control
																	type='text'
																	name='EmployeeFirstName'
																	value={values.EmployeeFirstName}
																	onChange={handleChange}
																	isValid={
																		touched.EmployeeFirstName && !errors.EmployeeFirstName
																	}
																	isInvalid={!!errors.EmployeeFirstName}
																/>
																<Form.Control.Feedback type='invalid'>
																	{errors.EmployeeFirstName}
																</Form.Control.Feedback>
															</Form.Group>
															<Form.Group as={Col} md='2' controlId='validationFormik02'>
																<Form.Label>Last Name</Form.Label>
																<Form.Control
																	type='text'
																	name='EmployeeLastName'
																	value={values.EmployeeLastName}
																	onChange={handleChange}
																	isValid={touched.EmployeeLastName && !errors.EmployeeLastName}
																	isInvalid={!!errors.EmployeeLastName}
																/>
																<Form.Control.Feedback type='invalid'>
																	{errors.EmployeeLastName}
																</Form.Control.Feedback>
															</Form.Group>
															<Form.Group as={Col} md='2' controlId='validationFormik02'>
																<Form.Label>Employee SSN</Form.Label>
																<Form.Control
																	type='string'
																	name='EmployeeSsn'
																	value={values.EmployeeSsn}
																	onChange={handleChange}
																	isValid={touched.EmployeeSsn && !errors.EmployeeSsn}
																	isInvalid={!!errors.EmployeeSsn}
																/>
																<Form.Control.Feedback type='invalid'>
																	{errors.EmployeeSsn}
																</Form.Control.Feedback>
															</Form.Group>
															<Form.Group as={Col} md='2' controlId='validationFormik02'>
																<Form.Label>Date of Birth</Form.Label>
																<Form.Control
																	type='date'
																	name='DateOfBirth'
																	value={values.DateOfBirth}
																	onChange={handleChange}
																	isValid={touched.DateOfBirth && !errors.DateOfBirth}
																	isInvalid={!!errors.DateOfBirth}
																/>
																<Form.Control.Feedback type='invalid'>
																	{errors.DateOfBirth}
																</Form.Control.Feedback>
															</Form.Group>
															<Form.Group as={Col} md='4' controlId='validationFormik02'>
																<Form.Label>Company</Form.Label>
																<Form.Control
																	as='select'
																	name='CompanyId'
																	value={values.CompanyId}
																	onChange={handleChange}
																	isValid={touched.CompanyId && !errors.CompanyId}
																	isInvalid={!!errors.CompanyId}>
																	<option>Select a company</option>{' '}
																	{companies.map((company) => (
																		<option key={company.CompanyId} value={company.CompanyId}>
																			{company.CompanyName}
																		</option>
																	))}
																</Form.Control>
															</Form.Group>
														</Row>
														<Row className='mb-3'>
															<Form.Group as={Col} md='8' controlId='validationFormik02'>
																<Form.Check
																	name='IsTerminated'
																	label='Employee has been terminated?'
																	onChange={handleChange}
																	isValid={touched.IsTerminated && !errors.IsTerminated}
																	feedback={errors.IsTerminated}
																	feedbackType='invalid'
																	id='validationFormik0'
																/>
															</Form.Group>
														</Row>
														<Row>
															<Col>
																<div className='d-flex justify-content-end'>
																	<div>
																		<Button
																			variant='outline-secondary'
																			disabled={isSubmitting || !dirty}
																			onClick={() => resetForm()}>
																			Reset
																		</Button>{' '}
																		<Button type='submit' disabled={isSubmitting || !dirty}>
																			Update Employee
																		</Button>
																	</div>
																</div>
															</Col>
														</Row>
													</Form>
												)}
											</Formik>
										</Card.Body>
									</Card>
								)}
							</Col>
						</Row>
						<br />
						{showAlert && (
							<Row>
								<Col>
									<Alert
										variant='success'
										onClose={() => setShowAlert(false)}
										dismissible>
										<Alert.Heading>Employee has been updated!</Alert.Heading>
										<p>This notification will close shortly.</p>
									</Alert>
								</Col>
							</Row>
						)}
						<Row>
							<Col>
								<button
									type='button'
									class='btn btn-primary'
									onClick={() => {
										setSelectedDependent({
											DependentId: 0,
											DependentFirstName: '',
											DependentLastName: '',
											DependentSsn: '',
											DateOfBirth: moment().format('YYYY-MM-DD').toString(),
											DateCreated: null,
											DateUpdated: null,
										});
										setAddMode(true);
										setModalShow(true);
									}}>
									Add Dependent
								</button>
							</Col>
						</Row>
						<br />
						{dependents.length < 1 && (
							<Alert variant='info'>
								<Alert.Heading>Uh-oh</Alert.Heading>
								<p>
									Looks like you don't have any dependents created for{' '}
									<b>{employee.EmployeeFirstName + ' ' + employee.EmployeeLastName}</b>.
									Simply, click the "Add Dependent" button to add dependents.
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
																onClick={() => {
																	setAddMode(false);
																	setSelectedDependent(dep);
																	setModalShow(true);
																}}>
																Edit
															</button>{' '}
															<button
																type='button'
																class='btn btn-danger'
																onClick={() => {
																	setSelectedDependent(dep);
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
						{employee && (
							<Paychecks
								employeeId={employee.EmployeeId}
								companyId={employee.CompanyId}
								employeeInfo={employee}
								companyInfo={company}
							/>
						)}
					</Tab>
				</Tabs>
			</Container>
			{selectedDependent !== null && (
				<div>
					<DependentModal
						show={modalShow}
						dependentInfo={selectedDependent}
						addMode={addMode}
						onHide={modalClose}
						employeeId={employee.EmployeeId}
					/>
					<DeleteConfirmationModal
						show={modalShowDelete}
						depInfo={selectedDependent}
						isEmployee={false}
						onHide={modalCloseDelete}
					/>
				</div>
			)}
		</div>
	);
};

Employee.propTypes = {};

export default Employee;
