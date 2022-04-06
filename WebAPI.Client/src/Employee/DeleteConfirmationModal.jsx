import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';

const DeleteConfirmationModal = (props) => {
	const axios = require('axios');
	const { info, show, depInfo, onHide, isEmployee } = props;
	const headers = {
		'Content-Type': 'application/json',
	};

	const handleSubmit = async () => {
		if (isEmployee) {
			try {
				const response = await axios.delete(
					process.env.REACT_APP_API + 'employee/' + info.EmployeeId,
					{
						headers: headers,
					}
				);
			} catch (error) {}
		} else {
			try {
				const response = await axios.delete(
					process.env.REACT_APP_API + 'dependent/' + depInfo.DependentId,
					{
						headers: headers,
					}
				);
			} catch (error) {
			}
		}
	};

	return (
		<Modal show={show} centered size='lg'>
			<Modal.Header>
				<Modal.Title>Delete Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Warning!! Deleting this {isEmployee ? 'employee' : 'dependent'},{' '}
				{depInfo && !isEmployee ? depInfo.DependentFirstName : ''}{' '}
				{depInfo && !isEmployee ? depInfo.DependentLastName : ''}
				{info && isEmployee ? info.EmployeeFirstName : ''}{' '}
				{info && isEmployee ? info.EmployeeLastName : ''}, can not be undone. Do you
				wish to continue?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Cancel
				</Button>{' '}
				<Form>
					<Button variant='danger' type='submit' onClick={handleSubmit}>
						Yes, delete {isEmployee ? 'employee' : 'dependent'}
					</Button>
				</Form>
			</Modal.Footer>
		</Modal>
	);
};

DeleteConfirmationModal.propTypes = {};

export default DeleteConfirmationModal;
