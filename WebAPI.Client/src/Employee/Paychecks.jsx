import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import PaycheckModal from './PaycheckModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Paychecks = (props) => {
	const { employeeId, companyId } = props;
	const axios = require('axios');
	const navigate = useNavigate();
	const [modalShow, setModalShow] = useState(false);
	const [modalShowDelete, setModalShowDelete] = useState(false);
	const [actionType, setActionType] = useState();
	const [paychecks, setPaychecks] = useState([{}]);
	const [isLoadingPaychecks, setIsLoadingPaychecks] = useState(true);
	const [selectedPaycheck, setSelectedPaycheck] = useState({});

	useEffect(() => {
		getPaychecks(employeeId);
	}, [employeeId]);

	async function getPaychecks(employeeId) {
		if (employeeId) {
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
	}

	function handleClickNavigate() {
		navigate('/company/' + companyId);
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
				{(paychecks.length < 1 || !paychecks) && (
					<Alert variant='info'>
						<Alert.Heading>Uh-oh</Alert.Heading>
						<p>
							Looks like there are no paychecks created in the system. Simply, navigate
							to the companies page to generate a paycheck.
						</p>
						<div className='d-flex justify-content-end'>
							<Button onClick={() => handleClickNavigate()}>Take me there</Button>
						</div>
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
