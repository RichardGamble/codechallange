import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';

const DeleteConfirmationModal = (props) => {
    const axios = require('axios');
	const { info, show, actionType, onHide, isEmployee } = props;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': 'JWT fefege...',
	};

	const handleSubmit = (event) => {
		try {
			const response = axios.delete(process.env.REACT_APP_API + 'employee/'+ info.EmployeeId, {
				headers: headers,
			});
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Modal show={show} centered size='lg'>
			<Modal.Header>
				<Modal.Title>Delete Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Warning!! Deleting this {isEmployee ? 'employee' : 'dependent'} can not be
				undone. Do you wish to continue?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Cancel
				</Button>
				<Button variant='danger' type ="submit" onClick={handleSubmit}>
					Yes, delete {isEmployee ? 'employee' : 'dependent'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

DeleteConfirmationModal.propTypes = {};

export default DeleteConfirmationModal;
