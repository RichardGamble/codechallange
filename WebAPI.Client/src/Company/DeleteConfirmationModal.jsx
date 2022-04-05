import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Form } from 'react-bootstrap';

const DeleteConfirmationModal = (props) => {
	const axios = require('axios');
	const { info, show, onHide } = props;
	const headers = {
		'Content-Type': 'application/json',
	};

	const handleSubmit = async() => {
		try {
			const response = await axios.delete(
				process.env.REACT_APP_API + 'company/' + info.CompanyId,
				{
					headers: headers,
				}
			);
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
				Warning!! Deleting this company can not be
				undone. <b>Everything </b> associated with this company will be deleted i.e:<ul>
                    <li>Employeesdependents</li>
                    <li>Employee's dependents</li>
                    <li>Employee's paychecks</li>
                    <li>Payroll</li>
                </ul>
                Do you wish to continue deleting {info.CompanyName}?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Cancel
				</Button>{' '}
				<Form>
					<Button variant='danger' type='submit' onClick={handleSubmit}>
						Yes, delete {info.CompanyName}
					</Button>
				</Form>
			</Modal.Footer>
		</Modal>
	);
};

DeleteConfirmationModal.propTypes = {};

export default DeleteConfirmationModal;
