import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import moment from 'moment';
import {
	Modal,
	Button,
	Row,
	Col,
	Form,
	Alert,
	Container,
	FloatingLabel,
} from 'react-bootstrap';

const PaycheckModal = (props) => {
	const { paycheckInfo, show, onHide, companyInfo, employeeInfo } = props;
	const [employee, setEmployee] = useState(employeeInfo);
	const [company, setCompany] = useState(companyInfo);
	const [paycheck, setPaycheck] = useState({});

	useEffect(() => {
		setEmployee(employeeInfo);
		setCompany(companyInfo);
		setPaycheck(paycheckInfo);
	}, [companyInfo, employeeInfo, paycheckInfo]);

	return (
		<Modal show={show} centered size='xl'>
			{company && (
				<>
					<Modal.Header>
						<Modal.Title>Earnings Statement #{paycheck.PaycheckId}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Row>
								<Col md={3}>
									<h5 className='d-flex justify-content-between '>
										<b>Company:</b>
										{company.CompanyName}
									</h5>
								</Col>
							</Row>
							<Row>
								<Col md={3}>
									<h5 className='d-flex justify-content-between '>
										<b>{'Name: '}</b> {employee.EmployeeFirstName}{' '}
										{employee.EmployeeLastName}
									</h5>
								</Col>
							</Row>
							<Row>
								<Col md={{ span: 4, offset: 8 }}>
									<h5 className='d-flex justify-content-between '>
										<div>Period Beginning: </div>
										<div>
											{moment(paycheck.Payroll?.StartDate).format('MMM DD, YYYY')}
										</div>
									</h5>
								</Col>
							</Row>
							<Row>
								<Col md={{ span: 4, offset: 8 }}>
									<h5 className='d-flex justify-content-between '>
										<div>Period Ending:</div>
										<div>{moment(paycheck.Payroll?.EndDate).format('MMM DD, YYYY')}</div>
									</h5>
								</Col>
							</Row>
							<Row>
								<Col md={{ span: 4, offset: 8 }}>
									<h5 className='d-flex justify-content-between '>
										<div>Gross Pay:</div>
										<div>${paycheck.GrossPay}</div>
									</h5>
								</Col>
							</Row>
                            <Row className='mb-1'>
								<Col md={{ span: 4, offset: 8 }}>
									<h5 className='d-flex justify-content-between '>
										<div>Total Deductions:</div>
										<div>${paycheck.DeductionsTotal}</div>
									</h5>
								</Col>
							</Row>
                            <Row className='mb-1'>
								<Col md={{ span: 4, offset: 8 }}>
                                <hr/>
								</Col>
							</Row>
							<Row className='mb-5'>
								<Col md={{ span: 4, offset: 8 }}>
									<h5 className='d-flex justify-content-between '>
										<div>Net Pay:</div>
										<div>${paycheck.NetPay}</div>
									</h5>
								</Col>
							</Row>

							<Row>
								<Col md={{ span: 6, offset: 3 }}>
									<table class='table align-middle mb-0 bg-white table-striped'>
										<thead class='bg-light'>
											<tr>
												<th>Dependent Name</th>
												<th>Discount</th>
												<th>Cost</th>
											</tr>
										</thead>
										<tbody>
											{paycheck.Deductions?.map((deduction) => (
												<tr key={deduction.DeductionId}>
													<td>{deduction.Name}</td>
													<td>{deduction.Discount}</td>
													<td>{deduction.Cost}</td>
												</tr>
											))}
										</tbody>
									</table>
								</Col>
							</Row>

							<Row></Row>

							<Row className='mb-3'>
								<Col>
									<div className='d-flex justify-content-end'>
										<div>
											<Button variant='secondary' onClick={onHide}>
												Close
											</Button>
										</div>
									</div>
								</Col>
							</Row>
						</Container>
					</Modal.Body>
				</>
			)}
		</Modal>
	);
};

PaycheckModal.propTypes = {};

export default PaycheckModal;
