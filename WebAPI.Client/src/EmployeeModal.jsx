import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';

const EmployeeModal = (props) => {
	const axios = require('axios');
	const { employeeInfo, show, actionType, onHide } = props;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': 'JWT fefege...',
	};

	const addNewEmpoyee = (values) => {
		try {
			const response = axios.post(process.env.REACT_APP_API + 'employee', values, {
				headers: headers,
			});
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
		EmployeeSSN: yup
			.string()
			.required('Employee SSN is a required field')
			.matches(/\d{9}/, 'Must only be numbers'),
		DateOfBirth: yup
			.string()
			.required('Employee Date of Birth is a required field'),
		IsTerminated: yup.bool().required(),
	});

	return (
		<Modal show={show} closeButton centered size='xl'>
			<Modal.Header>
				<Modal.Title>Add New Employee</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					validationSchema={schema}
					onSubmit={console.log}
					initialValues={{
						EmployeeId: 0,
						EmployeeFirstName: '',
						EmployeeLastName: '',
						EmployeeSSN: '',
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
						<Form noValidate onSubmit={() => addNewEmpoyee(values)}>
							{JSON.stringify(errors)}
							<Row className='mb-3'>
								<Form.Group as={Col} md='3' controlId='validationFormik01'>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type='text'
										name='EmployeeFirstName'
										value={values.EmployeeFirstName}
										onChange={handleChange}
										isValid={touched.EmployeeFirstName && !errors.EmployeeFirstName}
										isInvalid={touched.EmployeeFirstName && !!errors.EmployeeFirstName}
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
										name='EmployeeSSN'
										value={values.EmployeeSSN}
										onChange={handleChange}
										isValid={touched.EmployeeSSN && !errors.EmployeeSSN}
										isInvalid={touched.EmployeeSSN && !!errors.EmployeeSSN}
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type='invalid'>
										{errors.EmployeeSSN}
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
											<Button variant='secondary' onClick={onHide}>
												Close
											</Button>{' '}
											<Button type='submit' disabled={!(isValid && dirty)}>
												Submit form
											</Button>
										</div>
									</div>
								</Col>
							</Row>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	);
};

EmployeeModal.propTypes = {};

export default EmployeeModal;
