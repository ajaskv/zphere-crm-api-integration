import React, { useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import swal from 'sweetalert';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';

import USERS from '../../../common/data/userDummyData';
import Avatar from '../../../components/Avatar';
import Badge from '../../../components/bootstrap/Badge';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import PresentaionPagesSubHeader from '../../../widgets/PresentaionPagesSubHeader';
import TableWidget from '../../../widgets/Table';

import useApi from '../../../api/hooks/useApi';
import ZoomFunction from '../../../api/apifunctions/zoommeeting';
import ProjectFunction from '../../../api/apifunctions/projectsystem';

const ZoomMeeting = () => {

	const API_getAll_ZoomMeetingData = useApi(ZoomFunction.getZoomMeetingData);
	const API_getAll_ProjectData = useApi(ProjectFunction.getProjectSystemData);
	const API_addZoomMeetingData = useApi(ZoomFunction.addZoomMeetingData);
	const API_UpdateZoomData = useApi(ZoomFunction.updateZoomData);
	const API_DeleteZoomData = useApi(ZoomFunction.removeZoomData);

	const [zoomMeetingData, setZoomMeetingData] = useState<string[]>([]);
	const [projectSystems, setProjectSystems] = useState<string[]>([]);
	const [selectedZoomMeeting, setSelectedZoomMeeting] = useState<any>(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [calenderView, setCalenderView] = useState<boolean>(false);
	// const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		fetch_ProductService();
		fetch_ProjectSystem();
	}, []);

	const fetch_ProductService = async () => {
		const retVal = await API_getAll_ZoomMeetingData.request();
		if (retVal) {
			setZoomMeetingData(retVal.data);
		}
	};

	const fetch_ProjectSystem = async () => {
		const retVal = await API_getAll_ProjectData.request();
		if (retVal) {
			setProjectSystems(retVal.data);
		}
	};

	const addZoomMeeting = async (data: any) => {
		const retVal = await API_addZoomMeetingData.request(data);
		if (retVal) {
			setZoomMeetingData([...zoomMeetingData, data]);
			setIsOpenModal(false)
			return retVal;

		} else {
			return retVal
		}
	};

	const updateZoomMeeting = async (data: any) => {
		const retVal = await API_UpdateZoomData.request(data);
		if (retVal && retVal.ok) {
			setZoomMeetingData(
				zoomMeetingData.map((zoomData: any) => {
					if (zoomData.id != data.id) {
						return zoomData;
					} else {
						return retVal.data;
					}
				}),
			);
			return true;
		} else {
			return retVal;
		}
	};

	const deleteZoomData = (id: number) => {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this zoom meeting!',
			icon: 'warning',
			buttons: {
				cancel: {
					text: 'Cancel',
					value: null,
					visible: true,
					closeModal: true
				},
				confirm: {
					text: 'Confirm',
					value: true,
					visible: true,
					closeModal: true
				}
			},
			dangerMode: true,
		})
			.then(async willDelete => {
				if (willDelete) {
					const retVal = await API_DeleteZoomData.request({ id });
					if (retVal) {
						setZoomMeetingData(zoomMeetingData.filter((zoomData: any) => zoomData.id != id));
						swal("Deleted!", "Your zoom meeting data has been deleted!", "success");
						return true;
					} else {
						return API_DeleteZoomData.errorMessage;
					}
				}
			});

	};

	function GenerateZoomMeetingData(count: number) {
		// console.log('hiiii', zoomMeetingData.length);
		const zoomMettingData: any = [];
		zoomMeetingData.map((zoomData: any) =>
			zoomMettingData.push({
				// employeeid: product.id,
				title: zoomData.title,
				project_name: zoomData.project_name,
				user_id: zoomData.user_id,
				client_name: zoomData.client_name,
				start_date: moment(zoomData.start_date).format('MMM Do YYYY h:mm a'),
				duration: zoomData.duration,
				join_url: zoomData.join_url,
				status: (
					<Badge className='py-2 px-3' color='danger'>
						{zoomData.status}
					</Badge>
				),
				actions: (
					<>
						{/* <Button
							className='mx-2'
							icon='edit'
							color='info'
							onClick={() => {
								setSelectedZoomMeeting(zoomData);
								setIsOpenModal(true);
							}}
						/> */}
						<Button
							className='mx-2'
							icon='trash'
							color='danger'
							onClick={() => deleteZoomData(zoomData.id)}
						/>
					</>
				),
			}),
		);
		return zoomMettingData;
	}

	const columns = [
		{ name: 'TITLE' },
		{ name: 'PROJECT' },
		{ name: 'USER' },
		{ name: 'CLIENT' },
		{ name: 'MEETING TIME' },
		{ name: 'DURATION' },
		{ name: 'JOIN URL' },
		{ name: 'STATUS' },
		{ name: 'ACTION' },
	];
	const customSubHeaderRightActions = () => (
		<>
			<Button className='p-2' icon={!calenderView ? 'CalendarDateFill' : ''} color='dark' onClick={() => setCalenderView(!calenderView)}>
				Calendar View
			</Button>
			<Button className='p-2' icon='trash' color='danger' />
		</>
	);

	return (
		<PageWrapper title=''>
			<PresentaionPagesSubHeader
				showSubHeaderRight
				showAddNewButton={() => setIsOpenModal(true)}
				customSubHeaderRightActions={customSubHeaderRightActions}
				title='Zoom Meeting'
			/>
			<Page container='fluid'>
				{/* {calenderView &&
					<CalenderView />
					|| */}
				{zoomMeetingData && zoomMeetingData.length &&
					<TableWidget data={GenerateZoomMeetingData(zoomMeetingData.length)} tableColumns={columns} />
					|| <div className='p-5 text-center text-danger'>No data found!</div>}
				{/* } */}
			</Page>

			<AddEdit_ZoomData zommData={selectedZoomMeeting} updateZoomMeeting={updateZoomMeeting} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} projectSystems={projectSystems} addZoomMeeting={addZoomMeeting} />
		</PageWrapper>
	);
};

export default ZoomMeeting;

// const CalenderView = ({ }) => {
// 	const [values, setValues] = useState(
// 		[1, 2, 3].map((number: any) =>
// 			new DateObject().set({
// 				day: number,
// 				hour: number,
// 				minute: number,
// 				second: number,
// 			})
// 		)
// 	);
// 	return (
// 		<DatePicker
// 			value={values}
// 			onChange={() => setValues}
// 			format="MM/DD/YYYY HH:mm:ss"
// 			multiple
// 			plugins={[
// 				<TimePicker position="bottom" />,
// 				<DatePanel markFocused />
// 			]}
// 		/>
// 	)
// }
const AddEdit_ZoomData = ({
	zommData, updateZoomMeeting, isOpenModal, setIsOpenModal, projectSystems, addZoomMeeting
}: {
	zommData: any; updateZoomMeeting: any; isOpenModal: any; setIsOpenModal: any; projectSystems: string[]; addZoomMeeting: any
}) => {
	useEffect(() => {
		if (zommData) {
			formikEvent.setFieldValue('title', zommData.title);
			formikEvent.setFieldValue('project_id', zommData.project_id);
			formikEvent.setFieldValue('user_id', zommData.user_id);
			formikEvent.setFieldValue('start_date', zommData.start_date);
			formikEvent.setFieldValue('duration', zommData.duration);
			formikEvent.setFieldValue('password', zommData.password);
			formikEvent.setFieldValue('meeting_id', zommData.meeting_id);
			formikEvent.setFieldValue('client_id', zommData.client_id);
			formikEvent.setFieldValue('start_url', zommData.start_url);
			formikEvent.setFieldValue('join_url', zommData.join_url);
			formikEvent.setFieldValue('status', zommData.status);
		}
	}, [zommData]);

	useEffect(() => {
		if (!isOpenModal) {
			formikEvent.resetForm();
		}
	}, [isOpenModal]);
	const [start_date, setStartDate] = useState(new Date());
	const [errorMessages, setErrorMessages] = useState("");

	const handleSubmit = async (data: any) => {
		setErrorMessages("");

		const retVal = zommData ? await updateZoomMeeting(data) : await addZoomMeeting(data);
		if (retVal && retVal.is_success) {
			setIsOpenModal(false);
		} else {
			setErrorMessages(retVal.msg)
		}
	}
	const formikEvent = useFormik({
		initialValues: {
			title: '',
			project_id: '',
			user_id: '',
			start_date: start_date,
			duration: '',
			password: '',
			meeting_id: '',
			client_id: '1',
			start_url: '',
			join_url: '',
			status: '2',
			created_by: '2'
		},
		// eslint-disable-next-line no-unused-vars
		// console.log(initialValues);
		onSubmit: (values) => {
			handleSubmit(JSON.stringify(values, null, 2));
			// addZoomMeeting(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} titleId='tour-title'>
			<ModalHeader setIsOpen={setIsOpenModal}>
				<ModalTitle id='tour-title' className='d-flex align-items-end'>
					{/* <Logo height={28} /> <span className='ps-2'>Assistant</span> */}
					<span className='ps-2'>Zoom Meeting</span>
				</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<FormGroup id='saleprice' label='Topic' className='pb-4' isFloating>
					<Input
						placeholder='enter topic'
						autoComplete='additional-name'
						name='title'
						onChange={formikEvent.handleChange}
						onBlur={formikEvent.handleBlur}
						value={formikEvent.values.title}
						isValid={formikEvent.isValid}
						isTouched={formikEvent.touched.title}
						invalidFeedback={formikEvent.errors.title}
						validFeedback='Looks good!'
					/>
				</FormGroup>
				<div className='d-flex flex-row  gap-2'>
					<div className='col-md-6 p-8'>
						<FormGroup
							onChange={formikEvent.handleChange}
							id='project_id'
							label='Project'
							className='pb-4 '
							isFloating>
							<Select
								className=''
								size='sm'
								ariaLabel='Per'
							// onChange={(e: { target: { value: string } }) => {
							// 	setPerPage(parseInt(e.target.value, 10));
							// 	setCurrentPage(1);
							// }}
							// value={perPage.toString()}
							>
								{projectSystems.map((project: any, index: number) => (
									<Option key={index} value={project.id}>
										{project.project_name}
									</Option>
								))}
							</Select>
						</FormGroup>

						<FormGroup id='start_date' label='' className='pb-4' isFloating>
							<DatePicker className="w-100 p-3 rounded border border-white bg-light" selected={start_date} onChange={(date: Date) => setStartDate(date)} />

						</FormGroup>
						<FormGroup id='user_id' label='Meeting ID' className='pb-4' isFloating>
							<Input
								placeholder='Meeting ID'
								autoComplete='additional-name'
								name='meeting_id'
								onChange={formikEvent.handleChange}
								onBlur={formikEvent.handleBlur}
								value={formikEvent.values.meeting_id}
								isValid={formikEvent.isValid}
								isTouched={formikEvent.touched.meeting_id}
								invalidFeedback={formikEvent.errors.meeting_id}
								validFeedback='Looks good!'
							/>
						</FormGroup>
						<FormGroup id='start_url' label='Start URL' className='pb-4' isFloating>
							<Input
								placeholder='Start URL'
								autoComplete='additional-name'
								name='start_url'
								onChange={formikEvent.handleChange}
								onBlur={formikEvent.handleBlur}
								value={formikEvent.values.start_url}
								isValid={formikEvent.isValid}
								isTouched={formikEvent.touched.start_url}
								invalidFeedback={formikEvent.errors.start_url}
								validFeedback='Looks good!'
							/>
						</FormGroup>

					</div>
					<div className='col-md-6 p-8'>
						<FormGroup id='user_id' label='User Name' className='pb-4' isFloating>
							<Input
								placeholder='User Name'
								autoComplete='additional-name'
								name='user_id'
								onChange={formikEvent.handleChange}
								onBlur={formikEvent.handleBlur}
								value={formikEvent.values.user_id}
								isValid={formikEvent.isValid}
								isTouched={formikEvent.touched.user_id}
								invalidFeedback={formikEvent.errors.user_id}
								validFeedback='Looks good!'
							/>
						</FormGroup>
						<FormGroup id='duration' label='Duration' className='pb-4' isFloating>
							<Input
								placeholder='duration'
								autoComplete='additional-name'
								name='duration'
								onChange={formikEvent.handleChange}
								onBlur={formikEvent.handleBlur}
								value={formikEvent.values.duration}
								isValid={formikEvent.isValid}
								isTouched={formikEvent.touched.duration}
								invalidFeedback={formikEvent.errors.duration}
								validFeedback='Looks good!'
							/>
						</FormGroup>
						<FormGroup id='password' label='Password' className='pb-4' isFloating>
							<Input
								placeholder='password'
								autoComplete='additional-name'
								name='password'
								onChange={formikEvent.handleChange}
								onBlur={formikEvent.handleBlur}
								value={formikEvent.values.password}
								isValid={formikEvent.isValid}
								isTouched={formikEvent.touched.password}
								invalidFeedback={formikEvent.errors.password}
								validFeedback='Looks good!'
							/>
						</FormGroup>
						<FormGroup id='join_url' label='Join URL' className='pb-4' isFloating>
							<Input
								placeholder='Join URL'
								autoComplete='additional-name'
								name='join_url'
								onChange={formikEvent.handleChange}
								onBlur={formikEvent.handleBlur}
								value={formikEvent.values.join_url}
								isValid={formikEvent.isValid}
								isTouched={formikEvent.touched.join_url}
								invalidFeedback={formikEvent.errors.join_url}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
				</div>
				{errorMessages &&
					<div className="text-danger">
						{errorMessages}
					</div>
				}
			</ModalBody>
			<ModalFooter>
				<Button icon='Close' color='danger' isLink onClick={() => setIsOpenModal(false)}>
					No
				</Button>
				<Button
					icon='DoneOutline'
					color='success'
					isLight
					onClick={() => {
						formikEvent.submitForm();
						// setIsOpenModal(false);
						// navigate('/');
						// setTimeout(() => setIsOpen(true), 1000);
					}}>
					Yes
				</Button>
			</ModalFooter>
		</Modal>
	);
};
