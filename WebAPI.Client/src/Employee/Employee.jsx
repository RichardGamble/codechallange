import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	Button,
	Row,
	Col,
	Form,
	Container,
	Tab,
	Tabs,
	Alert,
} from 'react-bootstrap';
import DependentModal from './Dependent/DependentModal';
import Paychecks from './Paychecks';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { employeeSchema } from './EmployeeValidation';

const Employee = (props) => {
	const axios = require('axios');
	let { slug } = useParams();
	const { employeeInfo, show, onHide } = props;
	let location = useLocation();
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();
	const [dependents, setDependents] = useState([{}]);
	const [isLoadingDependents, setIsLoadingDependents] = useState(true);
	const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
	const [showSuccess, setShowSuccess] = useState(false);
	const [saveStatusCode, setSaveStatusCode] = useState(0);
	const [employee, setEmployee] = useState({});
	const [companies, setCompanies] = useState();
	const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);

	useEffect(() => {
		var id =
			location.pathname.split('/')[location.pathname.split('/').length - 1];
		getEmployee(id);
		getDependents(id);
		getCompanies();
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

	const getCompanies = async () => {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'company/simple'
			);
			setCompanies(response.data);
			setIsLoadingCompanies(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

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
	const [showAlert, setShowAlert] = useState(false);
	let modalClose = () => setModalShow(false);

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
			}, 7000);
		} catch (error) {
			setSaveStatusCode(error.response.status);
		}
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
														isValid={touched.EmployeeFirstName && !errors.EmployeeFirstName}
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
															<option value={company.CompanyId}>{company.CompanyName}</option>
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
											<Row className='mb-3'>
												<Col>
													<div className='d-flex justify-content-end'>
														<div>
															<Button
																variant='secondary'
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
							)}
						</Row>
						{showAlert && (
							<Row>
								<Col>
									<Alert
										variant='success'
										onClose={() => setShowAlert(false)}
										dismissible>
										<Alert.Heading>Employee has been updated!</Alert.Heading>
										<p>
											This notification will close shortly.
										</p>
									</Alert>
								</Col>
							</Row>
						)}
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
