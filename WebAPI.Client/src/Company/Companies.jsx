import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import CompanyModal from './CompanyModal';
 import DeleteConfirmationModal from './DeleteConfirmationModal';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Companies = (props) => {
	const axios = require('axios');
	const [modalShow, setModalShow] = useState(false);
	const [modalShowDelete, setModalShowDelete] = useState(false);
	const [actionType, setActionType] = useState();
	const [companies, setCompanies] = useState([{}]);
	const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
	const [selectedCompany, setSelectedCompany] = useState({});

	useEffect(() => {
		getCompanies();
	}, []);

	// Want to use async/await? Add the `async` keyword to your outer function/method.
	async function getCompanies() {
		try {
			const response = await axios.get(process.env.REACT_APP_API + 'company');
			setCompanies(response.data);
			setIsLoadingCompanies(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	let modalClose = () => {
		setModalShow(false);
		getCompanies();
	};

	let modalCloseDelete = () => {
		setModalShowDelete(false);
		getCompanies();
	};

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<button
							type='button'
							class='btn btn-primary'
							onClick={() => setModalShow(true)}>
							Add Company
						</button>
					</Col>
				</Row>
				<br />

				{companies.length < 1 && (
					<Alert variant='success'>
						<Alert.Heading>Hi and welcome to Paymentum</Alert.Heading>
						<p>
							Looks like you don't have any companies created in the system. Simply,
							click the "Add Company" button to begin using this application.
						</p>
						<hr />
						<p className='mb-0'>
							This application was built to simulate a real-world environment where
							employers input companies and their dependents, and get a preview of the
							costs.
						</p>
					</Alert>
				)}
				{companies.length > 0 && (
					<Row>
						<Col>
							{!isLoadingCompanies && (
								<table class='table align-middle mb-0 bg-white table-striped'>
									<thead class='bg-light'>
										<tr>
											<th>Name</th>
											<th>Created Date </th>
											<th>Updated Date</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{companies.map((comp) => (
											<tr key={comp.CompanyId}>
												<td>{comp.CompanyName}</td>
												<td>{moment(comp.DateCreated).format('MM/DD/YYYY')}</td>
												<td>{moment(comp.DateUpdated).format('MM/DD/YYYY')}</td>
												<td>
													<>
														<Link
															to={{
																pathname: `/company/${comp.CompanyId}`,
																state: { id: comp.CompanyId },
															}}>
															<Button>Edit</Button>
														</Link>{' '}
														<button
															type='button'
															class='btn btn-danger'
															onClick={() => {
																setSelectedCompany(comp);
																setModalShowDelete(true);
															}}>
															Delete
														</button>
													</>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
							{isLoadingCompanies && (
								<div class='d-flex justify-content-center'>
									<div class='spinner-border' role='status'>
										<span class='visually-hidden'>Loading...</span>
									</div>
								</div>
							)}
						</Col>
					</Row>
				)}
			</Container>
 
			<CompanyModal
				show={modalShow}
				companyInfo={selectedCompany}
				action={actionType}
				onHide={modalClose}
			/>

			<DeleteConfirmationModal
				show={modalShowDelete}
				info={selectedCompany}
				onHide={modalCloseDelete}
			/>
		</div>
	);
};

Companies.propTypes = {};

export default Companies;
