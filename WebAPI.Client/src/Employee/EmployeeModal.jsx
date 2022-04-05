import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { employeeSchema } from './EmployeeValidation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EmployeeModal = (props) => {
	const axios = require('axios');
	const { employeeInfo, show, actionType, onHide } = props;
	const navigate = useNavigate();
	const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
	const [companies, setCompanies] = useState(true);
	const [showSuccess, setShowSuccess] = useState(false);
	const [saveStatusCode, setSaveStatusCode] = useState(0);
	const [employee, setEmployee] = useState({});

	const headers = {
		'Content-Type': 'application/json; charset=utf-8',
	};

	useEffect(() => {
		getCompanies();
	}, []);

	const addNewEmpoyee = async (values) => {
		try {
			const response = await axios.post(
				process.env.REACT_APP_API + 'employee',
				values,
				{
					headers: headers,
				}
			);
			setSaveStatusCode(response.status);
			setShowSuccess(true);
			setEmployee(response.data);
		} catch (error) {
			setSaveStatusCode(error.response.status);
		}
	};

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

	function handleClick() {
		navigate('/employee/' + employee.EmployeeId);
	}

	return (
		<Modal show={show} centered size='md'>
			<Modal.Header>
				<Modal.Title>Add New Employee</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{saveStatusCode === 201 && employee != null && (
					<Alert show={showSuccess} variant='success'>
						<Alert.Heading>Success</Alert.Heading>
						<p>
							{employee.EmployeeFirstName} {employee.EmployeeLastName} has been added.
							Click the button below to navigate to the employee page where you will
							find the options to add dependents and view paychecks.
						</p>
						<div className='d-flex justify-content-end'>
							<Button onClick={handleClick} variant='outline-success'>
								Ok
							</Button>
						</div>
					</Alert>
				)}
				{saveStatusCode === 0 && (
					<Formik
						validationSchema={employeeSchema}
						onSubmit={(values) => addNewEmpoyee(values)}
						initialValues={{
							EmployeeId: 0,
							EmployeeFirstName: '',
							EmployeeLastName: '',
							EmployeeSsn: '',
							DateOfBirth: moment().format('YYYY-MM-DD').toString(),
							CompanyId: '',
							IsTerminated: false,
							DateCreated: null,
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
							isSubmitting,
							setFieldValue,
							setFieldTouched,
						}) => (
							<Form noValidate onSubmit={handleSubmit}>
								{/* <Row>{"Values: " + JSON.stringify(values)}</Row> */}
								<Row className='mb-3'>
									<Form.Group as={Col} md='6' controlId='validationFormik01'>
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
									<Form.Group as={Col} md='6' controlId='validationFormik02'>
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
								</Row>
								<Row className='mb-3'>
									<Form.Group as={Col} md='6' controlId='validationFormik02'>
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
									<Form.Group as={Col} md='6' controlId='validationFormik02'>
										<Form.Label>Date of Birth</Form.Label>
										<Form.Control
											type='date'
											name='DateOfBirth'
											value={values.DateOfBirth}
											onChange={(e) => {
												setFieldValue('DateOfBirth', moment(e).format('YYYY-MM-DD'));
												setFieldTouched('DateOfBirth');
											}}
											isValid={touched.DateOfBirth && !errors.DateOfBirth}
											isInvalid={!!errors.DateOfBirth}
										/>
										<Form.Control.Feedback type='invalid'>
											{errors.DateOfBirth}
										</Form.Control.Feedback>
									</Form.Group>
								</Row>
								<Row className='mb-3'>
									<Form.Group as={Col} md='12' controlId='validationFormik02'>
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
												<Button variant='secondary' onClick={onHide}>
													Close
												</Button>{' '}
												<Button type='submit' disabled={isSubmitting}>
													Submit
												</Button>
											</div>
										</div>
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				)}
			</Modal.Body>
		</Modal>
	);
};

EmployeeModal.propTypes = {};

export default EmployeeModal;
