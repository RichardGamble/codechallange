import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';

const EmployeeModal = (props) => {
	const { employeeInfo, show, actionType, onHide } = props;

	const schema = yup.object().shape({
		EmployeeId: yup.string(),
		EmployeeFirstName: yup.string().required(),
		EmployeeLastName: yup.string().required(),
		EmployeeSSN: yup.number().required(),
		DateOfBirth: yup.string().required(),
		IsTerminated: yup.bool().required(),
	});

	return (
		<div>
			<Modal show={show} closeButton centered size='xl'>
				<Modal.Header>
					<Modal.Title>Action Type</Modal.Title>
				</Modal.Header>
				<Modal.Body>					
					<Formik
						validationSchema={schema}
						onSubmit={console.log}
						initialValues={{
							EmployeeFirstName: '',
							EmployeeLastName: '',
							EmployeeSSN: '',
							DateOfBirth: '',
							IsTerminated: false,
						}}>
						{({
							handleSubmit,
							handleChange,
							handleBlur,
							values,
							touched,
							isValid,
							errors,
						}) => (
							<Form noValidate onSubmit={handleSubmit}>
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
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									</Form.Group>
									<Form.Group as={Col} md='3' controlId='validationFormik02'>
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											type='text'
											name='EmployeeLastName'
											value={values.EmployeeLastName}
											onChange={handleChange}
											isValid={touched.EmployeeLastName && !errors.EmployeeLastName}
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									</Form.Group>
									<Form.Group as={Col} md='2' controlId='validationFormik02'>
										<Form.Label>Employee SSN</Form.Label>
										<Form.Control
											type='number'
											name='EmployeeSSN'
											value={values.EmployeeSSN}
											onChange={handleChange}
											isValid={touched.EmployeeSSN && !errors.EmployeeSSN}
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									</Form.Group>
									<Form.Group as={Col} md='3' controlId='validationFormik02'>
										<Form.Label>Date of Birth</Form.Label>
										<Form.Control
											type='date'
											name='DateOfBirth'
											value={values.DateOfBirth}
											onChange={handleChange}
											isValid={touched.DateOfBirth && !errors.DateOfBirth}
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									</Form.Group>
								</Row>
								<Row className='mb-3'>
									<Form.Group as={Col} md='12' controlId='validationFormik02'>
										<Form.Check
											required
											name='terms'
											label='Employee is actively employed?'
											onChange={handleChange}
											isInvalid={!!errors.terms}
											feedback={errors.terms}
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
												<Button type='submit'>Submit form</Button>
											</div>
										</div>
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				</Modal.Body>
			</Modal>
		</div>
	);
};

EmployeeModal.propTypes = {};

export default EmployeeModal;
