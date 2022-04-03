import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
	Modal,
	Button,
	Row,
	Col,
	Form,
	InputGroup,
	Container,
	Tab,
	Tabs,
} from 'react-bootstrap';
import DependentModal from './CompanyModal';
import Payroll from './Payroll';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

const Company = (props) => {
	const axios = require('axios');
	let { slug } = useParams();
	const { companyInfo, show, onHide } = props;
	let location = useLocation();
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();
	const [dependents, setDependents] = useState([{}]);
	const [company, setCompany] = useState([{}]);
	const [isLoadingDependents, setIsLoadingDependents] = useState(true);
	const [isLoadingCompany, setIsLoadingCompany] = useState(true);

	useEffect(() => {
		var id =
			location.pathname.split('/')[location.pathname.split('/').length - 1];
		getCompany(id);
		// getDependents(id);
	}, [location]);

	async function getCompany(id) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'company/' + id
			);
			setCompany(response.data);
			setIsLoadingCompany(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
	async function getDependents(empId) {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'dependent/' + empId
			);
			setDependents(response.data);
			setIsLoadingDependents(false);
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
	let modalClose = () => setModalShow(false);

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'JWT fefege...',
	};
	const updateCompany = (values) => {
		try {
			axios.put(process.env.REACT_APP_API + 'company/' + company.CompanyId, {
				headers: headers,
				data: values,
			});
		} catch (error) {}
	};

	return (
		<div>
			<Container>
				<Tabs
					defaultActiveKey='company'
					id='uncontrolled-tab-example'
					className='mb-3'>
					<Tab eventKey='company' title='Dependents'>
						<Row>
							{!isLoadingCompany && (
								<Formik
									validationSchema={schema}
									onSubmit={console.log}
									initialValues={{
										CompanyId: company.CompanyId,
										CompanyFirstName: '',
										CompanyLastName: '',
										CompanySsn: '',
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
										<Form noValidate onSubmit={() => updateCompany(values)}>
											{/* {JSON.stringify(errors)} */}
											<Row className='mb-3'>
												<Form.Group as={Col} md='3' controlId='validationFormik01'>
													<Form.Label>First Name</Form.Label>
													<Form.Control
														type='text'
														name='CompanyFirstName'
														value={values.CompanyFirstName}
														onChange={handleChange}
														isValid={touched.CompanyFirstName && !errors.CompanyFirstName}
														isInvalid={
															touched.CompanyFirstName && !!errors.CompanyFirstName
														}
													/>
													<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
													<Form.Control.Feedback type='invalid'>
														{errors.CompanyFirstName}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md='3' controlId='validationFormik02'>
													<Form.Label>Last Name</Form.Label>
													<Form.Control
														type='text'
														name='CompanyLastName'
														value={values.CompanyLastName}
														onChange={handleChange}
														isValid={touched.CompanyLastName && !errors.CompanyLastName}
														isInvalid={touched.CompanyLastName && !!errors.CompanyLastName}
													/>
													<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
													<Form.Control.Feedback type='invalid'>
														{errors.CompanyLastName}
													</Form.Control.Feedback>
												</Form.Group>
												<Form.Group as={Col} md='3' controlId='validationFormik02'>
													<Form.Label>Company SSN</Form.Label>
													<Form.Control
														type='string'
														name='CompanySsn'
														value={values.CompanySsn}
														onChange={handleChange}
														isValid={touched.CompanySsn && !errors.CompanySsn}
														isInvalid={touched.CompanySsn && !!errors.CompanySsn}
													/>
													<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
													<Form.Control.Feedback type='invalid'>
														{errors.CompanySsn}
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
														label='Company is actively employed?'
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
															<Button type='submit'>
																Save Changes
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
								{!isLoadingDependents && (
									<table class='table align-middle mb-0 bg-white table-striped'>
										<thead class='bg-light'>
											<tr>
												<th>First Name</th>
												<th>Last Name</th>
												<th>Created Date </th>
												<th>Updated Date</th>
												<th>Terminated</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{dependents.map((dep) => (
												<tr key={dep.CompanyId}>
													<td>{dep.CompanyFirstName}</td>
													<td>{dep.CompanyLastName}</td>
													<td>{moment(dep.DateCreated).format('MM/DD/YYYY')}</td>
													<td>{moment(dep.DateUpdated).format('MM/DD/YYYY')}</td>
													<td>{dep.IsTerminated === true ? 'Yes' : 'False'}</td>
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
																onClick={() => this.deletedep(dep.CompanyId)}>
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
					<Tab eventKey='payroll' title='Payroll'>
						<Payroll/>
					</Tab>
				</Tabs>
			</Container>

			<DependentModal
				show={modalShow}
				companyInfo={selectedDependent}
				action={actionType}
				onHide={modalClose}
			/>
		</div>
	);
};

Company.propTypes = {};

export default Company;
