import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

import Card, {
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
// import Badge from '../../../components/bootstrap/Badge';
import COLORS from '../../../common/data/enumColors';
import Board from '../../../components/Board/Board';
import USERS from '../../../common/data/userDummyData';

import TAGS from '../../../common/data/boardTagsData';
// import CommonAvatarTeam from '../../../common/other/CommonAvatarTeam';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import TableWidget from '../../../widgets/Table';
import Icon from '../../../components/icon/Icon';
import Avatar from '../../../components/Avatar';
import PresentaionPagesSubHeader from '../../../widgets/PresentaionPagesSubHeader';
// import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
// import Textarea from '../../../components/bootstrap/forms/Textarea';
import request from '../../../utils/request';
import { LoadingButton } from '@mui/lab';
import SnackbarAlert from '../../common/SnackbarAlert';
import * as Yup from 'yup';

import LeadsList from './LeadsList';

import { FormHelperText, MenuItem, TextField, Select, NativeSelect, InputLabel, FormControl } from '@mui/material';

// enum EProjectSystemTasksView {
// 	LIST = 'list',
// 	GRID = 'grid',
// }
const ProjectManagementsProject = () => {
	const initialValue = [
		{ id: 0, name: " " }];
	const [isListView, setIsListView] = useState(false);
	const { darkModeStatus } = useDarkMode();
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [userList, setUserList] = useState(initialValue);
	const [leadsList, setLeadsList] = useState([]);
	const [showSnackBarAlert, setShowSnackBarAlert] = useState({
		status: false,
		type: 'success',
		message: ''
	});
	const [formData, setFormData] = useState({
		// Initialize the form fields with default values or empty strings
		name: '',
		email: '',
		subject:'',
		phone:'',
		user_id:''
	
	  });
	const [buttonBisableInput, setButtonDisableInputs] = useState(false);

	const LeadSchema = Yup.object().shape({
		subject: Yup.string()
			.typeError('Subject is required')
			.required('Subject is required'),
		name: Yup.string()
			.typeError('Name is required')
			.required('Name is required'),
		phone: Yup.number().required('Phone is required')
			.min(10, 'Add minimum 10 characters'),
		
		user_id: Yup.number()
			.typeError('User  is required')
			.required('User  is required'),
		email: Yup.string()
			.typeError('MailID is required')
			.required('MailID  is required'),
	});

	useEffect(() => {
		getUserLIst();
		getLeadLIst();
	}, []);
	const getUserLIst = () => {
		request({
			url: 'api/User',
			method: 'GET'
		})
			.then((response: any) => {
				if (response) {
				
					setUserList(response.data);
				}
			})
			.catch(function (err) {

				setShowSnackBarAlert({
					status: true,
					type: 'error',
					message: err,
				});

			});
	};

	const getLeadLIst = () => {
		request({
			url: 'api/lead',
			method: 'GET'
		})
			.then((response: any) => {
				if (response) {
					
					setLeadsList(response.data);
				}
			})
			.catch(function (err) {

				setShowSnackBarAlert({
					status: true,
					type: 'error',
					message: err,
				});

			});
	};

	const formik = useFormik({
		// initialValues: {
		// 	subject: '',
		// 	name: '',
		// 	phone: '',
		// 	user_id: '',
		// 	email: '',

		// },
		initialValues:formData,
		validationSchema: LeadSchema,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values,{resetForm}) => {
			let postData = {
				subject: values.subject,
				name: values.name,
				phone: values.phone,
				user_id: values.user_id,
				email: values.email
			};

			request({
				url: 'api/store-lead',
				method: 'POST',
				data: postData,
			})
				.then((data: any) => {
					if (data.status === true) {

						setShowSnackBarAlert({
							status: true,
							type: 'success',
							message: data.message,
						});
					
					    resetForm();
						setEditModalStatus(false);
					}
					else {

						setShowSnackBarAlert({
							status: true,
							type: 'error',
							message: data.message,
						});

					}


				})
				.catch(function (err: any) {


					setShowSnackBarAlert({
						status: true,
						type: 'error',
						message: 'Something went wrong'
					})
				}.bind(this)
				);

		},
	});
	function generateDummyData(count: number) {
		const dummyData = {
			id: 'Starburst',
			Name: 'Laborum Iste aute c',
			Namaase: 'Revised',
			Namaaase: (
				<>
					<Avatar
						size={25}
						srcSet={USERS.JOHN.srcSet}
						src={USERS.JOHN.src}
						color={USERS.JOHN.color}
					/>
					<Avatar
						size={25}
						srcSet={USERS.GRACE.srcSet}
						src={USERS.GRACE.src}
						color={USERS.GRACE.color}
					/>
				</>
			),
			actions: (
				<div>
					<Icon size='lg' className='mx-2' icon='Eye' color='info' />
					<Icon size='lg' className='mx-2' icon='Edit' color='info' />
					<Icon size='lg' className='mx-2' icon='Delete' color='info' />
				</div>
			),
		};

		const data = [];
		while (count > 0) {
			data?.push(dummyData);
			count--;
		}
		return data;
	}

	const columns = [
		{ name: 'NAME' },
		{ name: 'SUBJECT' },
		{ name: 'STAGE' },
		{ name: 'USERS' },
		{ name: 'ACTION' },
	];

	const data = [
		{
			id: 'lane1',
			title: 'Draft',
			color: darkModeStatus ? COLORS.LIGHT.name : COLORS.DARK.name,
			icon: '',
			cards: [
				{
					id: 'Card1',
					title: 'Mail App',
					subtitle: 'Facit Themes',
					description: 'Mail application and screens will be added',
					label: '7 day left',
					user: USERS.JOHN,
					tags: [TAGS.critical, TAGS.design, TAGS.code],
					tasks: [
						{ id: 1, text: 'Page UI & UX design', status: true },
						{ id: 2, text: 'HTML & SCSS coding', status: true },
						{ id: 3, text: 'React Components to do', status: false },
					],
					attachments: [
						{ id: 1, path: 'somefile.txt', file: 'TXT' },
						{ id: 2, path: 'somefile.txt', file: 'WORD' },
						{ id: 3, path: 'somefile.txt', file: 'PSD' },
					],
				},
				{
					id: 'Card2',
					title: 'Invoice',
					subtitle: 'Facit Themes',
					description: 'Invoice preview and new creation screens will be added',
					user: USERS.ELLA,
					label: '5 day left',
					tags: [TAGS.revise, TAGS.design],
					tasks: [
						{ id: 1, text: 'Lorem ipsum dolor', status: true },
						{ id: 2, text: 'Sit amet.', status: false },
					],
				},
			],
		},
		{
			id: 'lane2',
			title: 'Sent',
			color: COLORS.INFO.name,
			icon: '',
			cards: [
				{
					id: 'Card3',
					title: 'Landing Page Update',
					subtitle: 'Omtanke Team',
					description: 'Will be redesigned',
					label: '5 day left',
					user: USERS.GRACE,
					tags: [TAGS.design, TAGS.code],
					tasks: [
						{ id: 1, text: 'Draft drawings will be made', status: true },
						{ id: 2, text: 'Page will be updated', status: false },
						{ id: 3, text: 'Will be sent for review.', status: false },
					],
					attachments: [{ id: 2, path: 'somefile.txt', file: 'WORD' }],
				},
				{
					id: 'Card4',
					title: 'Write Blog',
					subtitle: 'Facit Themes',
					description: 'Explain why it should be chosen',
					label: '7 day left',
					user: USERS.JOHN,
					tags: [TAGS.design],
					tasks: [{ id: 1, text: 'Lorem ipsum dolor', status: true }],
					attachments: [{ id: 1, path: 'somefile.txt', file: 'TXT' }],
				},
				{
					id: 'Card7',
					title: 'Write Blog',
					subtitle: 'Facit Themes',
					description: 'Explain why it should be chosen',
					label: '7 day left',
					user: USERS.JOHN,
					tags: [TAGS.design],
					tasks: [{ id: 1, text: 'Lorem ipsum dolor', status: true }],
					attachments: [{ id: 1, path: 'somefile.txt', file: 'TXT' }],
				},
			],
		},
		{
			id: 'lane3',
			title: 'Open',
			color: COLORS.INFO.name,
			icon: '',
			cards: [],
		},
		{
			id: 'lane4',
			title: 'Revised',
			color: COLORS.INFO.name,
			icon: '',
			cards: [
				{
					id: 'Card5',
					title: 'Bug Fix',
					subtitle: 'Facit Themes',
					description: 'Minor bugs will be fixed',
					label: '5 day left',
					user: USERS.GRACE,
					tags: [TAGS.review, TAGS.design, TAGS.code],
					tasks: [
						{ id: 1, text: 'Lorem ipsum dolor', status: true },
						{ id: 2, text: 'Sit amet.', status: false },
						{ id: 3, text: 'Aliquam quis varius turpis.', status: false },
					],
					attachments: [
						{ id: 1, path: 'somefile.txt', file: 'TXT' },
						{ id: 2, path: 'somefile.txt', file: 'WORD' },
						{ id: 3, path: 'somefile.txt', file: 'PSD' },
					],
				},
			],
		},
		{
			id: 'lane5',
			title: 'Declined',
			color: COLORS.SUCCESS.name,
			icon: '',
			cards: [
				{
					id: 'Card9',
					title: 'Landing Page Update',
					subtitle: 'Omtanke Team',
					description: 'Will be redesigned',
					label: '5 day left',
					user: USERS.GRACE,
					tags: [TAGS.design, TAGS.code],
					tasks: [
						{ id: 1, text: 'Draft drawings will be made', status: true },
						{ id: 2, text: 'Page will be updated', status: false },
						{ id: 3, text: 'Will be sent for review.', status: false },
					],
					attachments: [{ id: 2, path: 'somefile.txt', file: 'WORD' }],
				},
			],
		},
	];
	const [boardData, setBoardData] = useState(data);
	const handleSnackbarClose = () => {
		setShowSnackBarAlert({ status: false, type: '', message: '' });
	};
	const SubHeaderActions = () => (
		<>
			<Button
				color='dark'
				icon='CardList'
				onClick={() => setIsListView((prevState) => !prevState)}>
				{isListView ? 'Board view' : 'List view'}</Button>

			<Button
				color='dark'
				icon='Add'
				onClick={() => setEditModalStatus(true)}>
			</Button>
		</>
	);
	return (

		<>
			<SnackbarAlert
				showSnackBarAlert={showSnackBarAlert}
				handleSnackbarClose={handleSnackbarClose}
			/>
			<PageWrapper title=''>
				<PresentaionPagesSubHeader
					showAddNewButton={false}
					showSubHeaderRight
					customSubHeaderRightActions={SubHeaderActions}
					title='Manage Leads'
				/>
				{/* <SubHeader>
				<SubHeaderLeft>
					<Button
						color='info'
						isLink
						icon='CardList'
						onClick={() => setIsListView((prevState) => !prevState)}>
						{isListView ? 'Board view' : 'List view'}
					</Button>
					<SubheaderSeparator />
					<span>
						There are{' '}
						<Badge color='info' isLight>
							2 teams
						</Badge>{' '}
						you are in and{' '}
						<Badge color='success' isLight>
							5 projects
						</Badge>
						.
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>zphere</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader> */}
				<Page container='fluid'>
					{isListView ? (
						<LeadsList data={leadsList}  />
					) : (
						<Board data={boardData} setData={setBoardData} />
					)}
				</Page>
			</PageWrapper>

			<Modal setIsOpen={setEditModalStatus} isOpen={editModalStatus} size='lg' isScrollable>


				<ModalHeader className='px-4' setIsOpen={setEditModalStatus}>
					<ModalTitle id='project-edit'>New Card</ModalTitle>
				</ModalHeader>
				<form onSubmit={formik.handleSubmit}>
					<ModalBody className='px-4'>
						<div className='row'>
							<div className='col-md-8'>
								<Card shadow='sm'>
									<CardHeader>
										<CardLabel icon='Info' iconColor='success'>
											<CardTitle>Task Information</CardTitle>
										</CardLabel>
									</CardHeader>
								</Card>
							</div>


							<div className='row g-4'>
								<FormGroup
									className='col-6'
									id="subject"
									name='subject'
									label='Subject'>
									{/* <Input
												onChange={formik.handleChange}
												value={formik.values.subject}
											/> */}

									<TextField
										size="small"

										id="subject"
										sx={{ m: 1, width: '95%' }}
										onChange={formik.handleChange}
										name="subject"
										value={formik.values.subject}
										error={
											formik.touched.subject &&
											Boolean(formik.errors.subject)
										}
										helperText={
											formik.touched.subject && formik.errors.subject
										}
									/>
								</FormGroup>

								<FormGroup className='col-6' id='user_id' label='User' >
									{/* <Select
										ariaLabel='Board select'
										placeholder='Select User'
										name='user_id'
										onChange={formik.handleChange}
										value={formik.values.user_id}
										error={
											formik.touched.user_id &&
											Boolean(formik.errors.user_id)
										  }>
										{userList.map((group) => (
										<Option key={group.id} value={group.id}>
										{group.name}
										</Option>
										))}
										
										</Select> */}

									<NativeSelect
										sx={{ m: 1, width: '95%' }}
										size="small"
									  
										defaultValue=""
										id="user_id"
										// disabled={buttonBisableInput}
										
										name="user_id"
										value={formik.values.user_id}
										onChange={formik.handleChange}
										error={
											formik.touched.user_id &&
											Boolean(formik.errors.user_id)
										}
										inputProps={{
											style: { borderColor: 'red' }, // Customize the border color here
										  }}
									>
										<option   key='' value=''>
												{'Select User'}
											</option  >
										{userList.map((type, index) => (
											<option   key={index} value={type.id}>
												{type.name}
											</option  >
										))}
									</NativeSelect>
									<FormHelperText sx={{ color: 'red' }}>
										{formik.touched.user_id &&
											formik.errors.user_id}
									</FormHelperText>

								</FormGroup>
								<FormGroup
									className='col-6'
									id='name'
									label='Name'>
									{/* <Input
												onChange={formik.handleChange}
												value={formik.values.name}
											/> */}

									<TextField
										size="small"

										id="name"
										sx={{ m: 1, width: '95%' }}
										onChange={formik.handleChange}
										name="name"
										value={formik.values.name}
										error={
											formik.touched.name &&
											Boolean(formik.errors.name)
										}
										helperText={
											formik.touched.name && formik.errors.name
										}
									/>
								</FormGroup>
								<FormGroup
									className='col-6'
									id="email"
									name='email'
									label='Phone'>

									<TextField
										size="small"

										id="phone"
										sx={{ m: 1, width: '95%' }}
										onChange={formik.handleChange}
										name="phone"
										value={formik.values.phone}
										error={
											formik.touched.phone &&
											Boolean(formik.errors.phone)
										}
										helperText={
											formik.touched.phone && formik.errors.phone
										}
									/>
								</FormGroup>




								<FormGroup
									className='col-12'
									id="email"
									name='email'
									label='Email'>
									{/* <Input
												onChange={formik.handleChange}
												value={formik.values.email}
											/> */}

									<TextField
										size="small"

										id="email"
										sx={{ m: 1, width: '95%' }}
										onChange={formik.handleChange}
										name="email"
										value={formik.values.email}
										error={
											formik.touched.email &&
											Boolean(formik.errors.email)
										}
										helperText={
											formik.touched.email && formik.errors.email
										}
									/>
								</FormGroup>

							</div>
						</div>
					</ModalBody>
					<ModalFooter className='px-4 pb-4'>
						<LoadingButton
							color='primary'
							className='w-100'
							type='submit'
										sx={{ m: 1, width: '95%' }}
										style={{'background': '#7474e1',
											'color': 'white',
											}}
										
									
							disabled={buttonBisableInput} 	>

							Save
						</LoadingButton>
					</ModalFooter>
				</form>
			</Modal>

		</>
	);

};

export default ProjectManagementsProject;
