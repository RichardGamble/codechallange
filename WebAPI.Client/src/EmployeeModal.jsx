import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

const EmployeeModal = (props) => {
	const { employeeInfo, isOpen, actionType } = props;
    const [show, setShow] = useState(false);
	const handleClose = () => setShow(isOpen);

	const submitForm = () => {};

	return (
		<div>
			<Modal show={show}>
				<Modal.Header>
					<Modal.Title>Action Type</Modal.Title>
				</Modal.Header>
				<Modal.Body>Form w/formik</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={() => submitForm()}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

EmployeeModal.propTypes = {};

export default EmployeeModal;
