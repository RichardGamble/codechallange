import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import { Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap';

const DependentModal = (props) => {
	const axios = require('axios');
	const { dependentInfo, show, onHide, addMode, employeeId } = props;
	const [dependent, setDependent] = useState(null);
	const [doneSettingDependent, setDoneSettingDependent] = useState(false);
	const [modalSize, setModalSize] = useState('xl');

	const headers = {
		'Content-Type': 'application/json',
	};
	const [saveStatusCode, setSaveStatusCode] = useState(0);

	useEffect(() => {
		setSaveStatusCode(0);
		setModalSize('xl')		
		setDependentValues();
	}, [dependentInfo]);

	function setDependentValues() {
		if (!addMode && dependentInfo) {
			dependentInfo.DateOfBirth = moment(dependentInfo.DateOfBirth)
				.format('YYYY-MM-DD')
				.toString();
			setDependent(dependentInfo);
			setDoneSettingDependent(true);
		}
	}

	const addNewDependent = async (values) => {
		try {
			const response = await axios.post(
				process.env.REACT_APP_API + 'dependent',
				values,
				{
					headers: headers,
				}
			);
			setModalSize('md');
			setDependent(response.data);
			setSaveStatusCode(response.status);
		} catch (error) {}
	};
	const editDependent = async (values) => {
		try {
			const response = await axios.put(
				process.env.REACT_APP_API + 'dependent/' + dependentInfo.DependentId,
				values,
				{
					headers: headers,
				}
			);
			setModalSize('md');
			setDependent(response.data);
			setSaveStatusCode(response.status);
		} catch (error) {}
	};

	function submitForm(values) {
		values.EmployeeId = employeeId;
		if (addMode) {
			addNewDependent(values);
		} else {
			editDependent(values);
		}
	}

	const schema = yup.object().shape({
		DependentId: yup.string(),
		DependentFirstName: yup
			.string()
			.required("Dependent's First Name is a required field"),
		DependentLastName: yup
			.string()
			.required("Dependent's Last Name is a required field"),
		DependentSsn: yup
			.string()
			.required("Dependent's SSN is a required field")
			.matches(/\d{9}/, 'Must only be numbers'),
		DateOfBirth: yup
			.date()
			.required("Dependent's Date of Birth is a required field"),
	});

	return (
		<Modal show={show} centered size={modalSize}>
			{saveStatusCode == 0 && (
				<Modal.Header>
					<Modal.Title>
						{addMode ? 'Add New Dependent' : 'Edit Dependent'}
					</Modal.Title>
				</Modal.Header>
			)}
			<Modal.Body>
				{dependent != null && (
					<Alert show={saveStatusCode >= 200} variant='success'>
						<Alert.Heading>Success</Alert.Heading>
						<p>
							{dependent.DependentFirstName} {dependent.DependentLastName} has been{' '}
							{saveStatusCode == 201 ? 'added' : 'updated'}. Click the button below to
							close window.
						</p>
						<div className='d-flex justify-content-end'>
							<Button onClick={onHide} variant='outline-success'>
								Ok
							</Button>
						</div>
					</Alert>
				)}
				{saveStatusCode === 0 && (
					<Formik
						validationSchema={schema}
						onSubmit={(values) => submitForm(values)}
						initialValues={dependentInfo}>
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
							<Form noValidate onSubmit={handleSubmit}>
								<Row>
									<Row className='mb-3'>
										<Form.Group as={Col} md='3' controlId='validationFormik01'>
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type='text'
												name='DependentFirstName'
												value={values.DependentFirstName}
												onChange={handleChange}
												isValid={touched.DependentFirstName && !errors.DependentFirstName}
												isInvalid={!!errors.DependentFirstName}
											/>
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
												isInvalid={!!errors.DependentLastName}
											/>
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
												isInvalid={!!errors.DependentSsn}
											/>
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
												isInvalid={!!errors.DateOfBirth}
											/>
											<Form.Control.Feedback type='invalid'>
												{errors.DateOfBirth}
											</Form.Control.Feedback>
										</Form.Group>
									</Row>
								</Row>
								<Row>
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
				)}
			</Modal.Body>
		</Modal>
	);
};

DependentModal.propTypes = {};

export default DependentModal;
