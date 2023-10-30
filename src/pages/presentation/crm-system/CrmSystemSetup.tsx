import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Icon from '../../../components/icon/Icon';
import TableWidget from '../../../widgets/Table';
import PresentaionPagesSubHeader from '../../../widgets/PresentaionPagesSubHeader';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import serverConnectAPI from '../../../api/config/server-connect-api';
import { ApiResponse } from 'apisauce';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import { OffCanvasTitle } from '../../../components/bootstrap/OffCanvas';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { Input } from '../../../components/icon/material-icons';
import { Textarea } from '../../../components/icon/bootstrap';
import Checks from '../../../components/bootstrap/forms/Checks';
import Popovers from '../../../components/bootstrap/Popovers';

// TODO Add select for Lead stages and Deal stages

type TColumnTitles =
	| 'Pipeline'
	| 'Lead Stages'
	| 'Deal Stages'
	| 'Sources'
	| 'Labels'
	| 'Contract Type';

const columns = {
	Pipeline: ['PIPELINE', 'ACTION'],
	'Lead Stages': ['LEAD STAGES', 'ACTION'],
	'Deal Stages': ['DEAL STAGES', 'ACTION'],
	Sources: ['SOURCES', 'ACTION'],
	Labels: ['LABELS', 'ACTION'],
	'Contract Type': ['NAME', 'ACTION'],
};

const HrmSystemSetup = () => {
	const TABS = {
		PIPELINE: 'Pipeline',
		LEAD_STAGES: 'Lead Stages',
		DEAL_STAGES: 'Deal Stages',
		SOURCES: 'Sources',
		LABELS: 'Labels',
		CONTRACT_TYPE: 'Contract Type',
	};
	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<TColumnTitles>('Pipeline');
	const [tableData, setTableData] = useState<any>([]);
	const [tableContent, setTableContent] = useState<any>([]);
	const handleUpcomingEdit = () => {
		setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	};
	const generateColumns = useMemo(() => {
		const titles = columns[activeTab];
		return titles?.map((name) => ({ name }));
	}, [activeTab]);


	useEffect(() => {

		setTableData([]);
		loadData();

	}, [activeTab])
	const deleteItem = function (id: number) {
		let isConfirm = confirm("Are you sure to delete item?");
		if (isConfirm) {
			let formData = new FormData();
			formData.append("id", id.toString());
			switch (activeTab) {
				case 'Labels':
					serverConnectAPI.post('del-labels', formData).then((response: ApiResponse<any, any>) => {
						alert("Pipeline Deleted succesfully")
						loadData();
					})
					break;
				case 'Pipeline':
					serverConnectAPI.post('del-pipeline', formData).then((response: ApiResponse<any, any>) => {
						alert("Pipeline Deleted succesfully")
						loadData();
					})
					break;
				case 'Lead Stages':
					serverConnectAPI.post('del-lead-stage', formData).then((response: ApiResponse<any, any>) => {
						alert("Lead Stage Deleted succesfully")
						loadData();
					})
					break;
				case 'Deal Stages':
					serverConnectAPI.post('del-deal-stage', formData).then((response: ApiResponse<any, any>) => {
						alert("Deal Stage Deleted succesfully")
						loadData();
					})
					break;
				case 'Sources':
					serverConnectAPI.post('del-sources', formData).then((response: ApiResponse<any, any>) => {
						alert("Source Deleted succesfully")
						loadData();
					})
					break;
				case 'Contract Type':
					formData.append("contract_id", id.toString());
					serverConnectAPI.post('del-contract', formData).then((response: ApiResponse<any, any>) => {
						alert("Source Deleted succesfully")
						loadData();
					})
					break;
			}
		}
	}
	const loadData = useCallback(() => {
		const titles = columns[activeTab];
		setTableData([]);
		switch (activeTab) {
			case 'Labels':
				serverConnectAPI.get('labels').then((response: ApiResponse<any, any>) => {
					response.data?.data?.map((element: any) => {
						let obj: any = {};
						titles?.forEach((name) => {
							const key = name !== 'ACTION' && !obj.hasOwnProperty('id') ? 'id' : `${name}`;
							const value =
								name === 'ACTION' ? (
									<>
										<Icon size='lg' className='mx-2' icon='Edit' color='success' />
										<Icon size='lg' className='mx-2' onClick={() => deleteItem(element?.id)} icon='Trash' color='danger' />
									</>
								) : (
									element?.name
								);
							obj = { ...obj, [key]: value };
						});
						setTableData((oldValue: any) => [obj, ...oldValue]);
					});
				}).catch((error) => {
					console.log("Error", error);
				})
				break;
			case 'Pipeline':
				serverConnectAPI.get('pipeline').then((response: ApiResponse<any, any>) => {
					response.data?.data?.map((element: any) => {
						let obj: any = {};
						titles?.forEach((name) => {
							const key = name !== 'ACTION' && !obj.hasOwnProperty('id') ? 'id' : `${name}`;
							const value =
								name === 'ACTION' ? (
									<>
										<Icon size='lg' className='mx-2' icon='Edit' color='success' />
										<Icon size='lg' className='mx-2' onClick={() => deleteItem(element?.id)} icon='Trash' color='danger' />
									</>
								) : (
									element?.name
								);
							obj = { ...obj, [key]: value };
						});
						setTableData((oldValue: any) => [obj, ...oldValue]);
					});
				}).catch((error) => {
					console.log("Error", error);
				})
				break;
			case 'Lead Stages':
				serverConnectAPI.get('lead-stage').then((response: ApiResponse<any, any>) => {
					response.data?.data?.map((element: any) => {
						let obj: any = {};
						titles?.forEach((name) => {
							const key = name !== 'ACTION' && !obj.hasOwnProperty('id') ? 'id' : `${name}`;
							const value =
								name === 'ACTION' ? (
									<>
										<Icon size='lg' className='mx-2' icon='Edit' color='success' />
										<Icon size='lg' className='mx-2' onClick={() => deleteItem(element?.id)} icon='Trash' color='danger' />
									</>
								) : (
									element?.name
								);
							obj = { ...obj, [key]: value };
						});
						setTableData((oldValue: any) => [obj, ...oldValue]);
					});
				}).catch((error) => {
					console.log("Error", error);
				})
				break;
			case 'Deal Stages':
				serverConnectAPI.get('deal-stage').then((response: ApiResponse<any, any>) => {
					response.data?.data?.map((element: any) => {
						let obj: any = {};
						titles?.forEach((name) => {
							const key = name !== 'ACTION' && !obj.hasOwnProperty('id') ? 'id' : `${name}`;
							const value =
								name === 'ACTION' ? (
									<>
										<Icon size='lg' className='mx-2' icon='Edit' color='success' />
										<Icon size='lg' className='mx-2' onClick={() => deleteItem(element?.id)} icon='Trash' color='danger' />
									</>
								) : (
									element?.name
								);
							obj = { ...obj, [key]: value };
						});
						setTableData((oldValue: any) => [obj, ...oldValue]);
					});
				}).catch((error) => {
					console.log("Error", error);
				})
				break;
			case 'Sources':
				serverConnectAPI.get('sources').then((response: ApiResponse<any, any>) => {
					response.data?.data?.map((element: any) => {
						let obj: any = {};
						titles?.forEach((name) => {
							const key = name !== 'ACTION' && !obj.hasOwnProperty('id') ? 'id' : `${name}`;
							const value =
								name === 'ACTION' ? (
									<>
										<Icon size='lg' className='mx-2' icon='Edit' color='success' />
										<Icon size='lg' className='mx-2' onClick={() => deleteItem(element?.id)} icon='Trash' color='danger' />
									</>
								) : (
									element?.name
								);
							obj = { ...obj, [key]: value };
						});
						setTableData((oldValue: any) => [obj, ...oldValue]);
					});
				}).catch((error) => {
					console.log("Error", error);
				})
				break;
			case 'Contract Type':
				serverConnectAPI.get('contract-type').then((response: ApiResponse<any, any>) => {
					response.data?.data?.map((element: any) => {
						let obj: any = {};
						titles?.forEach((name) => {
							const key = name !== 'ACTION' && !obj.hasOwnProperty('id') ? 'id' : `${name}`;
							const value =
								name === 'ACTION' ? (
									<>
										<Icon size='lg' onClick={handleUpcomingEdit} className='mx-2' icon='Edit' color='success' />
										<Icon size='lg' className='mx-2' onClick={() => deleteItem(element?.id)} icon='Trash' color='danger' />
									</>
								) : (
									element?.name
								);
							obj = { ...obj, [key]: value };
						});
						setTableData((oldValue: any) => [obj, ...oldValue]);
					});
				}).catch((error) => {
					console.log("Error", error);
				})
				break;
		}
	}, [activeTab]);
	const generateDummyData = useCallback(
		(count: number) => {
			const titles = columns[activeTab];
			let i = count;
			const data = [];
			while (i > 0) {
				let obj = {};
				titles?.forEach((name) => {
					const key = name !== 'ACTION' && !obj.hasOwnProperty('id') ? 'id' : name;
					const value =
						name === 'ACTION' ? (
							<>
								<Icon size='lg' className='mx-2' icon='Edit' color='success' />
								<Icon size='lg' className='mx-2' icon='Trash' color='danger' />
							</>
						) : (
							'demo text'
						);
					obj = { ...obj, [key]: value };
				});
				data.push(obj);
				i--;
			}
			return data;
		}, [activeTab],);

	return (
		<PageWrapper title='Zphere'>
			<PresentaionPagesSubHeader title='CRM System Setup' />
			<Page container='fluid'>
				<div className='row h-100'>
					<div className='col-xxl-3 col-xl-4 col-lg-6'>
						<Card stretch>
							<CardBody isScrollable>
								<div className='row g-3'>
									{Object.values(TABS)?.map((tab: any) => {
										return (
											<div key={tab} className='col-12'>
												<Button
													color='info'
													className='w-100 p-3'
													isLight={tab !== activeTab}
													onClick={() => setActiveTab(tab)}>
													{tab}
												</Button>
											</div>
										);
									})}
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-xxl-9 col-xl-8 col-lg-6'>
						<button>Click me</button>
						<TableWidget
							data={tableData as any}
							tableColumns={generateColumns}
						/>
					</div>
				</div>
				<Modal
					setIsOpen={setUpcomingEventsEditOffcanvas}
					isOpen={upcomingEventsEditOffcanvas}
					titleId='upcomingEdit'
					isCentered
					isScrollable
					size='lg'>
					<ModalHeader setIsOpen={setUpcomingEventsEditOffcanvas}>
						<OffCanvasTitle id='upcomingEdit'>Edit Appointments</OffCanvasTitle>
					</ModalHeader>
					<ModalBody>
						<div className='row g-4'>
							<div className='col-12'>
								<FormGroup id='customerName' label='Customer' isFloating>
									<Input
										placeholder='Customer'
									// onChange={formik.handleChange}
									// value={formik.values.customerName}
									/>
								</FormGroup>
							</div>
						</div>
					</ModalBody>
					<ModalFooter className='bg-transparent'>
						<Button
							color='info'
							className='w-100'
							onClick={() => setUpcomingEventsEditOffcanvas(false)}>
							Save
						</Button>
					</ModalFooter>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default HrmSystemSetup;
