import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';

const DependentModal = (props) => {
	const axios = require('axios');
	const { employeeInfo, show, actionType, onHide } = props;
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'JWT fefege...',
	};

	const addNewDependent = (values) => {
		try {
			axios.post(process.env.REACT_APP_API + 'employee', values, {
				headers: headers,
			});
		} catch (error) {
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
						DependentId: 0,
						DependentFirstName: '',
						DependentLastName: '',
						DependentSsn: '',
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
						<Form noValidate onSubmit={() => addNewDependent(values)}>
							{JSON.stringify(errors)}
							<Row className='mb-3'>
								<Form.Group as={Col} md='3' controlId='validationFormik01'>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type='text'
										name='DependentFirstName'
										value={values.DependentFirstName}
										onChange={handleChange}
										isValid={touched.DependentFirstName && !errors.DependentFirstName}
										isInvalid={touched.DependentFirstName && !!errors.DependentFirstName}
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type='invalid'>
										{errors.DependentFirstName}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md='3' controlId='validationFormik02'>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type='text'
										name='DependentLastName'
										value={values.DependentLastName}
										onChange={handleChange}
										isValid={touched.DependentLastName && !errors.DependentLastName}
										isInvalid={touched.DependentLastName && !!errors.DependentLastName}
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type='invalid'>
										{errors.DependentLastName}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md='3' controlId='validationFormik02'>
									<Form.Label>Dependent SSN</Form.Label>
									<Form.Control
										type='string'
										name='DependentSsn'
										value={values.DependentSsn}
										onChange={handleChange}
										isValid={touched.DependentSsn && !errors.DependentSsn}
										isInvalid={touched.DependentSsn && !!errors.DependentSsn}
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type='invalid'>
										{errors.DependentSsn}
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

DependentModal.propTypes = {};

export default DependentModal;
