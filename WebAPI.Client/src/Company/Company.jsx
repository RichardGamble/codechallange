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
	Card,
} from 'react-bootstrap';
import Payroll from './Payroll';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { companySchema } from './CompanyValidation';
import Employees from '../Employee/Employees';

const Company = (props) => {
	const axios = require('axios');
	let { slug } = useParams();
	const { companyInfo, show, onHide } = props;
	let location = useLocation();
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();
	const [isLoadingPayperiods, setIsLoadingPayperiods] = useState(true);
	const [isLoadingCompany, setIsLoadingCompany] = useState(true);
	const [saveStatusCode, setSaveStatusCode] = useState(0);
	const [company, setCompany] = useState(null);
	const [payperiods, setPayperiods] = useState();
	const [errorMessage, setErrorMessage] = useState();
	const [employees, setEmployees] = useState();
	const [latestPayperiod, setLatestPayperiod] = useState();

	useEffect(() => {
		var id =
			location.pathname.split('/')[location.pathname.split('/').length - 1];
		getEmployees(id);
		getCompany(id);
		getPayroll(id);
	}, [location]);

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
	async function getPayroll(companyId) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'company/payroll/' + companyId
			);
			setPayperiods(response.data);
			setLatestPayperiod(response.data[0].PayrollId);
			setIsLoadingPayperiods(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	const getEmployees = async (companyId) => {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + `employee/company/${companyId}`
			);
			setEmployees(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const companySchema = yup.object().shape({
		CompanyId: yup.number(),
		CompanyName: yup.string().required('Company name is required'),
	});

	const displayModal = () => {
		setShowModal(true);
	};
	const [modalShow, setModalShow] = useState(false);
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertError, setShowAlertError] = useState(false);
	let modalClose = () => setModalShow(false);

	const headers = {
		'Content-Type': 'application/json; charset=utf-8',
	};
	const updateCompany = async (values) => {
		values.CompanyName = values.CompanyName.trim();
		try {
			const response = await axios.put(
				process.env.REACT_APP_API + 'company/' + company.CompanyId,
				values,
				{
					headers: headers,
				}
			);
			setShowAlertSuccess(true);
			setSaveStatusCode(response.status);
			setCompany(response.data);

			setTimeout(function () {
				setShowAlertSuccess(false);
			}, 3000);
		} catch (error) {
			setSaveStatusCode(error.response.status);
			setErrorMessage(error.response.data);
			setShowAlertError(true);
			setCompany(company);
			setTimeout(function () {
				setShowAlertError(false);
			}, 7000);
		}
	};

	const generatePaychecks = async (payrollId) => {
		try {
			const paycheckResponse = await axios.post(
				process.env.REACT_APP_API +
					`paycheck/generatechecks/${company.CompanyId}/${payrollId}`
			);
			const payrollResponse = await axios.post(
				process.env.REACT_APP_API + `company/payroll/${company.CompanyId}`
			);
			getPayroll(company.CompanyId);
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
							<Col>
								<Card>
									<Card.Body>
										{!isLoadingCompany && (
											<Formik
												enableReinitialize
												validationSchema={companySchema}
												onSubmit={(values) => {
													updateCompany(values);
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
												}) => (
													<Form noValidate onSubmit={handleSubmit}>
														<Row>
															<Form.Group as={Col} md='2' controlId='validationFormik01'>
																<Form.Label>Company Created</Form.Label>
																<Form.Control
																	type='date'
																	name='DateCreated'
																	readOnly={true}
																	value={moment(values.DateCreated).format('YYYY-MM-DD')}
																	onChange={handleChange}
																/>
															</Form.Group>
															<Form.Group as={Col} md='2' controlId='validationFormik01'>
																<Form.Label>Company Updated</Form.Label>
																<Form.Control
																	type='date'
																	name='DateUpdated'
																	readOnly={true}
																	value={moment(values.DateUpdated).format('YYYY-MM-DD')}
																	onChange={handleChange}
																/>
															</Form.Group>
															<Form.Group as={Col} md='2' controlId='validationFormik01'>
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
															<Form.Group
																as={Col}
																md='3'
																className='mt-2'
																controlId='validationFormik01'>
																<Form.Label></Form.Label>
																<div className='d-flex justify-content-end'>
																	<div>
																		<Button
																			variant='outline-secondary'
																			disabled={!isSubmitting}
																			onClick={resetForm}>
																			Reset
																		</Button>{' '}
																		<Button type='submit' disabled={isSubmitting || !dirty}>
																			Update Company
																		</Button>
																	</div>
																</div>
															</Form.Group>
														</Row>
													</Form>
												)}
											</Formik>
										)}
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<br />
						{showAlertSuccess && (
							<Row>
								<Col>
									<Alert
										variant='success'
										onClose={() => setShowAlertSuccess(false)}
										dismissible>
										<Alert.Heading>Company has been updated!</Alert.Heading>
									</Alert>
								</Col>
							</Row>
						)}
						{showAlertError && (
							<Row>
								<Col>
									<Alert
										variant='danger'
										onClose={() => setShowAlertError(false)}
										dismissible>
										<Alert.Heading>{errorMessage}</Alert.Heading>
									</Alert>
								</Col>
							</Row>
						)}
						<br />
						<Row>
							<Col>
								{!isLoadingPayperiods && payperiods.length > 0 && (
									<table class='table align-middle mb-0 bg-white table-striped'>
										<thead class='bg-light'>
											<tr>
												<th>Created Date</th>
												<th>Pay Period Start Date</th>
												<th>Pay Period End Date</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{payperiods.map((pay) => (
												<tr key={pay.PayperiodId}>
													<td>{moment(pay.CreateDate).format('MM/DD/YYYY')}</td>
													<td>{moment(pay.StartDate).format('MM/DD/YYYY')}</td>
													<td>{moment(pay.EndDate).format('MM/DD/YYYY')}</td>
													<td>
														{employees && (
															<Button
																variant='primary'
																disabled={
																	employees.length < 1 || pay.PayrollId !== latestPayperiod
																}
																onClick={() => generatePaychecks(pay.PayrollId)}>
																Generate Checks
															</Button>
														)}
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
					{company && (
						<Tab eventKey='employees' title='Employees'>
							<Employees companyId={company.CompanyId} />
						</Tab>
					)}
				</Tabs>
			</Container>
		</div>
	);
};

Company.propTypes = {};

export default Company;
