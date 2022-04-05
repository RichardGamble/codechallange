import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import PaycheckModal from './PaycheckModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Paychecks = (props) => {
	const { employeeId } = props;
	const axios = require('axios');
	const [modalShow, setModalShow] = useState(false);
	const [modalShowDelete, setModalShowDelete] = useState(false);
	const [actionType, setActionType] = useState();
	const [paychecks, setPaychecks] = useState([{}]);
	const [isLoadingPaychecks, setIsLoadingPaychecks] = useState(true);
	const [selectedPaycheck, setSelectedPaycheck] = useState({});

	useEffect(() => {
		getPaychecks(employeeId);
	}, [employeeId]);

	// Want to use async/await? Add the `async` keyword to your outer function/method.
	async function getPaychecks() {
		try {
			const response = await axios.get(
				process.env.REACT_APP_API + 'paycheck/all/' + employeeId
			);
			setPaychecks(response.data);
			setIsLoadingPaychecks(false);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	let modalClose = () => {
		setModalShow(false);
		getPaychecks();
	};

	let modalCloseDelete = () => {
		setModalShowDelete(false);
		getPaychecks();
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
							Add Paycheck
						</button>
					</Col>
				</Row>
				<br />

				{(paychecks.length < 1 || !paychecks) && (
					<Alert variant='success'>
						<Alert.Heading>Hi and welcome to Paymentum</Alert.Heading>
						<p>
							Looks like you don't have any paychecks created in the system. Simply,
							click the "Add Paycheck" button to begin using this application.
						</p>
						<hr />
						<p className='mb-0'>
							This application was built to simulate a real-world environment where
							employers input paychecks and their dependents, and get a preview of the
							costs.
						</p>
					</Alert>
				)}

				{paychecks.length > 0 && (
					<Row>
						<Col>
							{!isLoadingPaychecks && (
								<table class='table align-middle mb-0 bg-white table-striped'>
									<thead class='bg-light'>
										<tr>
											<th>Paycheck Number</th>
											<th>Gross Income</th>
											<th>Total Deductions</th>
											<th>Net Pay</th>
											<th>Date Generated</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{paychecks.map((pay) => (
											<tr key={pay.PaycheckId}>
												<td>{pay.PaycheckId}</td>
												<td>{pay.GrossPay}</td>
												<td>{pay.DeductionsTotal}</td>
												<td>{pay.NetPay}</td>
												<td>{moment(pay.CreatedDate).format('MM/DD/YYYY')}</td>
												<td>
													<>
														<Link
															to={{
																pathname: `/employee/${pay.PaycheckId}`,
																state: { id: pay.PaycheckId },
															}}>
															<Button>View</Button>
														</Link>{' '}
														{/* <button
															type='button'
															class='btn btn-danger'
															onClick={() => {
																setSelectedPaycheck(pay);
																setModalShowDelete(true);
															}}>
															Delete
														</button> */}
													</>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
							{isLoadingPaychecks && (
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

			<PaycheckModal
				show={modalShow}
				employeeInfo={selectedPaycheck}
				action={actionType}
				onHide={modalClose}
			/>

			<DeleteConfirmationModal
				show={modalShowDelete}
				info={selectedPaycheck}
				isPaycheck={true}
				onHide={modalCloseDelete}
			/>
		</div>
	);
};

Paychecks.propTypes = {};

export default Paychecks;
