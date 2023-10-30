import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import request from '../../../utils/request';
import axios from 'axios';
import SnackbarAlert from '../../common/SnackbarAlert';
// eslint-disable-next-line react/prop-types
const Login = () => {
// function Login (){



	const { darkModeStatus } = useDarkMode();

	const [usernameInput, setUsernameInput] = useState(false);
	const [isNewUser, setIsNewUser] = useState(false);

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);
	const [searchString, setSearchString] = useState();
	const [showSnackBarAlert, setShowSnackBarAlert] = useState({
		status: false,
		type: 'success',
		message: ''
	  });
	const LoginHeader = () => {
		if (isNewUser) {
			return (
				<>
					<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
					<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
				</>
			);
		}
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
				<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
			</>
		);
	};
	const formik = useFormik({
		
		initialValues: {
			username:'',
			passwrods:'',
			email:'',
			name:'',
			signpassword:'',
		  },
		  
		  onSubmit: (values) => {
			let url =""; let postData={};
			if(isNewUser)
			{
				 url ='api/User-store'
				 postData = {
					email: values.email,
					name: values.name,
					password: values.signpassword,
				  };
			}
			else
			{
				 url ='api/login';
				 postData = {
					email: values.username,
					password: values.passwrods,
				  };
			}
			  request({
				url:url,
				method: 'POST',
				data: postData
			  })
				// eslint-disable-next-line
				
				.then((data:any) => {
					console.log(data.token)
					if(data.token)
					{
						
						let message = isNewUser ? 'User save successfully':'Login Success';
						setShowSnackBarAlert({
							status: true,
							type: 'success',
							message: message
						  });
						  localStorage.setItem('userDetails', JSON.stringify(data));
						  window.location.href = '/dashboard';
					}
					else
					{
					
						setShowSnackBarAlert({
							status: false,
							type: 'error',
							message: 'unprocessable entity'
						  });
					}
			
				})
				.catch(function(err:any) {
					
						
						setShowSnackBarAlert({
						  status: true,
						  type: 'error',
						  message: 'Something went wrong'
						})
					  }.bind(this)
				);
		}
	});
	const handleSnackbarClose = () => {
		setShowSnackBarAlert({ status: false, type: '', message: '' });
	  };
	return (
	<> 	<SnackbarAlert
	showSnackBarAlert={showSnackBarAlert}
	handleSnackbarClose={handleSnackbarClose}
  />
	
		<PageWrapper
			title={isNewUser ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-warning': !isNewUser, 'bg-info': !!isNewUser })}>
				
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={200} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-lo10-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setUsernameInput(false);
													setIsNewUser(false);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setUsernameInput(false);
													setIsNewUser(true);
												}}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader  />

							
									{isNewUser ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Your email'>
													<Input type='email'  name="email"  onChange={formik.handleChange}
															value={formik.values.email}/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Your Name'>
													<Input type='text' name="name"  onChange={formik.handleChange}
															value={formik.values.name}/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Your Password'>
													<Input type='password'  name="signpassword" onChange={formik.handleChange}
															value={formik.values.signpassword}/>
												</FormGroup>
											</div>
											
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={formik.handleSubmit}>
													Sign Up
												</Button>
											</div>
										</>
									) : (
										<>
									<form onSubmit={formik.handleSubmit}>
											<div className='col-12'>
												{!usernameInput ? (

											
<FormGroup
														id='username'
														isFloating
														label='Email'>
														<Input name="username"
															onChange={formik.handleChange}
															value={formik.values.username}
														/>
													</FormGroup>


													
												) : (
													<FormGroup
														id='passwrods'
														isFloating
														label='Password'>
														<Input type="password"
														 name="passwrods"	
															onChange={formik.handleChange}
															value={formik.values.passwrods}
															
														/>
													</FormGroup>
												)}
											</div></form>
											<div className='col-12'>
												{!usernameInput ? (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={() => setUsernameInput(true)}>
														Continue
													</Button>
												) : (
													<Button
													color='warning'
													className='w-100 py-3'
													onClick={formik.handleSubmit}>
												
												    Login
												  </Button>
												)}
											</div>
									
										</>
									)}

									{/* BEGIN :: Social Login */}
									{!usernameInput && (
										<>
											<div className='col-12 mt-3 text-center text-muted'>
												OR
											</div>
											<div className='col-12 mt-3'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomApple'
													onClick={handleOnClick}>
													Sign in with Apple
												</Button>
											</div>
											<div className='col-12'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomGoogle'
													onClick={handleOnClick}>
													Continue with Google
												</Button>
											</div>
										</>
									)}
									{/* END :: Social Login */}
								
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': isNewUser,
									'link-dark': !isNewUser,
								})}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': isNewUser,
									'link-dark': !isNewUser,
								})}>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
		</>
	);
};


export default Login;
