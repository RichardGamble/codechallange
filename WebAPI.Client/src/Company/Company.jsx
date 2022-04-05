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
import Payroll from './Payroll';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { companySchema } from './CompanyValidation';

const Company = (props) => {
	const axios = require('axios');
	let { slug } = useParams();
	const { companyInfo, show, onHide } = props;
	let location = useLocation();
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();
	const [isLoadingPayperiods, setIsLoadingPayperiods] = useState(true);
	const [isLoadingCompany, setIsLoadingCompany] = useState(true);
	const [showSuccess, setShowSuccess] = useState(false);
	const [saveStatusCode, setSaveStatusCode] = useState(0);
	const [company, setCompany] = useState({});
	const [companies, setCompanies] = useState();
	const [payperiods, setPayperiods] = useState();
	const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);

	useEffect(() => {
		var id =
			location.pathname.split('/')[location.pathname.split('/').length - 1];
		getCompany(id);
		getPayperiods(id);		
	}, [location]);

	async function getCompany(id) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'company/' + id
			);
			
			let company = response.data;
			company.DateOfBirth = moment(company.DateOfBirth).format('YYYY-MM-DD').toString();
			setCompany(response.data);			
			setIsLoadingCompany(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
	async function getPayperiods(empId) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'dependent/all/' + empId
			);
			setPayperiods(response.data);
			setIsLoadingPayperiods(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	const schema = yup.object().shape({
		CompanyId: yup.string(),
		CompanyFirstName: yup
			.string()
			.required('Company First Name is a required field'),
		CompanyLastName: yup
			.string()
			.required('Company Last Name is a required field'),
		CompanySsn: yup
			.string()
			.required('Company SSN is a required field')
			.matches(/\d{9}/, 'Must only be numbers'),
		DateOfBirth: yup
			.date()
			.required('Company Date of Birth is a required field'),
		IsTerminated: yup.bool().required(),
	});

	const [selectedDependent, setSelectedDependent] = useState({
		CompanyId: 1,
		CompanyName: 'test',
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
	const updateCompany = async (values) => {
		try {
			const response = await axios.put(
				process.env.REACT_APP_API + 'company/' + company.CompanyId,
				values,
				{
					headers: headers,
				}
			);
			setShowAlert(true);
			setSaveStatusCode(response.status);
			setShowSuccess(true);
			setCompany(response.data);

			setTimeout(function () {
				setShowAlert(false);
			}, 3000);
		} catch (error) {
			setSaveStatusCode(error.response.status);
		}
	};

	return (
		<div>
			<Container>
				<Tabs
					defaultActiveKey='company'
					id='uncontrolled-tab-example'
					className='mb-3'>
					<Tab eventKey='company' title='Company Information'>
						<Row>
							{!isLoadingCompany && (
								<Formik
									validationSchema={companySchema}
									onSubmit={(values, { resetForm }) => {
										updateCompany(values);
										resetForm({ values });
									}}
									initialValues={company}>
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
														name='CompanyFirstName'
														value={values.CompanyFirstName}
														onChange={handleChange}
														isValid={touched.CompanyFirstName && !errors.CompanyFirstName}
														isInvalid={!!errors.CompanyFirstName}
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.CompanyFirstName}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md='2' controlId='validationFormik02'>
													<Form.Label>Last Name</Form.Label>
													<Form.Control
														type='text'
														name='CompanyLastName'
														value={values.CompanyLastName}
														onChange={handleChange}
														isValid={touched.CompanyLastName && !errors.CompanyLastName}
														isInvalid={!!errors.CompanyLastName}
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.CompanyLastName}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md='2' controlId='validationFormik02'>
													<Form.Label>Company SSN</Form.Label>
													<Form.Control
														type='string'
														name='CompanySsn'
														value={values.CompanySsn}
														onChange={handleChange}
														isValid={touched.CompanySsn && !errors.CompanySsn}
														isInvalid={!!errors.CompanySsn}
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.CompanySsn}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md='2' controlId='validationFormik02'>
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
															<option key ={company.CompanyId} value={company.CompanyId}>{company.CompanyName}</option>
														))}
													</Form.Control>
												</Form.Group>
											</Row>
											<Row className='mb-3'>
												<Form.Group as={Col} md='8' controlId='validationFormik02'>
													<Form.Check
														name='IsTerminated'
														label='Company has been terminated?'
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
																variant='outline-secondary'
																disabled={isSubmitting || !dirty}
																onClick={() => resetForm()}>
																Reset
															</Button>{' '}
															<Button type='submit' disabled={isSubmitting || !dirty}>
																Update Company
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
										<Alert.Heading>Company has been updated!</Alert.Heading>
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
									onClick={() => displayModal()}>
									Add Dependent
								</button>
							</Col>
						</Row>
						<br />
						<Row>
							<Col>
								{!isLoadingPayperiods && payperiods.length > 0 && (
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
											{payperiods.map((dep) => (
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
								{isLoadingPayperiods && (
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
						<Payroll companyId={company.CompanyId} />
					</Tab>
				</Tabs>
			</Container>		
		</div>
	);
};

Company.propTypes = {};

export default Company;
