import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navigation() {
	return (
		<Navbar bg='dark' expand='lg'>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav>
					<LinkContainer to='/'>
						<Nav.Link className='d-inline p-2 bg-dark text-white'>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/employee'>
						<Nav.Link className='d-inline p-2 bg-dark text-white'>Employee</Nav.Link>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
