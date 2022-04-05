import './App.css';

import Navigation from './Navigation';
import Employee from './Employee/Employee';
import Home from './Home';

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import Company from './Company/Company';
import Companies from './Company/Companies';

function App() {
	return (
		<Router>
			<div className='App'>
				<h3 className='m-3 d-flex justify-content-center'>Paymentum</h3>

				<Navigation />
				<br/>

				<Routes>
					<Route path='/' element={<Home/>} exact></Route>
					<Route path='/employee/:id' element={<Employee/>}></Route>
					<Route path='/companies' element={<Companies/>}></Route>
					<Route path='/company/:id' element={<Company/>}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
