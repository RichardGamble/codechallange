import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { companySchema } from './CompanyValidation';

const CompanyModal = (props) => {
	const axios = require('axios');
	const { companyInfo, show, actionType, onHide } = props;
	const navigate = useNavigate();
	const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
	const [companies, setCompanies] = useState(true);
	const [showSuccess, setShowSuccess] = useState(false);
	const [saveStatusCode, setSaveStatusCode] = useState(0);
	const [company, setCompany] = useState({});

	const headers = {
		'Content-Type': 'application/json; charset=utf-8',
	};

	useEffect(() => {
		getCompanies();
	}, []);

	const addNewCompany = async (values) => {
		try {
			const response = await axios.post(
				process.env.REACT_APP_API + 'company',
				values,
				{
					headers: headers,
				}
			);
			setSaveStatusCode(response.status);
			setShowSuccess(true);
			setCompany(response.data);
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

	const schema = yup.object().shape({
		CompanyId: yup.number(),
		CompanyName: yup.string().required('Company name is required'),
	});

	function handleClick() {
		navigate('/company/' + company.CompanyId);
	}

	return (
		<Modal show={show} closeButton centered size='sm'>
			<Modal.Header>
				<Modal.Title>Add New Company</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{saveStatusCode === 201 && company != null && (
					<Alert show={showSuccess} variant='success'>
						<Alert.Heading>Success</Alert.Heading>
						<p>
							{company.CompanyName} has been added.
							Click the button below to navigate to the company page where you will
							find the options to add dependents and view paychecks.
						</p>
						<div className='d-flex justify-content-end'>
							<Button onClick={handleClick} variant='outline-success'>
								Ok
							</Button>
						</div>
					</Alert>
				)}
				{saveStatusCode == 0 && (
					<Formik
						validationSchema={schema}
						onSubmit={(values) => addNewCompany(values)}
						initialValues={{
							CompanyId: 0,
							CompanyName: '',
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
						}) => (
							<Form noValidate onSubmit={handleSubmit}>
								{JSON.stringify(values)}
								<br />
								{'save succeeded: ' + saveStatusCode}
								<Row className='mb-3'>
									<Form.Group as={Col} md='12' controlId='validationFormik01'>
										<Form.Label>Company Name</Form.Label>
										<Form.Control
											type='text'
											name='CompanyName'
											value={values.CompanyName}
											onChange={handleChange}
											isValid={touched.CompanyName && !errors.CompanyName}
											isInvalid={!!errors.CompanyName}
										/>
										<Form.Control.Feedback type='invalid'>
											{errors.CompanyName}
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

CompanyModal.propTypes = {};

export default CompanyModal;
