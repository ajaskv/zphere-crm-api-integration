import React from 'react';
import { useFormik } from 'formik';

import Card, {
	CardActions, CardFooterLeft, CardLabel, CardTitle, CardBody, CardFooter, CardFooterRight, CardHeader
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';

import useApi from '../../../../api/hooks/useApi';
import SettingFunction from '../../../../api/apifunctions/systemsetting';

const ZoomMeetingSetting = () => {
	const API_updateSettings = useApi(SettingFunction.updateSettings);

	const updateSetting = async (value: any, mode: string) => {
		const retVal = await API_updateSettings.request({ value, name: mode, user_id: 2 });
		if (retVal) {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				`The ${mode} have been successfully updated.`,
			);
		}
	}

	const formikZoomSetting = useFormik({
		initialValues: {
			status: "1",
			ZoomAPIKey: "",
			ZoomAPISecret: "",
		},
		validate: () => { },
		onSubmit: (values) => {
			updateSetting(values, 'zoom_meeting_setting');
		},
	});

	return (
		<>
			<Card
				stretch
				tag='form'
				noValidate
				onSubmit={formikZoomSetting.handleSubmit}>
				<CardHeader size={'sm'} borderSize={1} className='d-block'>
					<div className='fw-bold fs-5'>Zoom meeting Setting</div>
					<div className='fs-6'>Edit your Zoom settings</div>
				</CardHeader>
				<CardBody isScrollable>
					<div className='row g-4'>
						<div className='col-lg-12'>
							<FormGroup
								id='ZoomAPIKey'
								label='Zoom API Key'
								isFloating>
								<Input
									onChange={formikZoomSetting.handleChange}
									onBlur={formikZoomSetting.handleBlur}
									value={formikZoomSetting.values.ZoomAPIKey}
									isValid={formikZoomSetting.isValid}
									isTouched={formikZoomSetting.touched.ZoomAPIKey}
									invalidFeedback={
										formikZoomSetting.errors.ZoomAPIKey
									}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>

						<div className='col-lg-12'>
							<FormGroup id='ZoomAPISecret' label='Zoom API Secret' isFloating>
								<Input
									onChange={formikZoomSetting.handleChange}
									onBlur={formikZoomSetting.handleBlur}
									value={formikZoomSetting.values.ZoomAPISecret}
									isValid={formikZoomSetting.isValid}
									isTouched={formikZoomSetting.touched.ZoomAPISecret}
									invalidFeedback={formikZoomSetting.errors.ZoomAPISecret}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>

					</div>
				</CardBody>
				<CardFooter style={{ borderTop: '1px solid #d4dbe3' }}>
					<CardFooterLeft>
						<Button
							color='info'
							isLink
							type='reset'
							onClick={formikZoomSetting.resetForm}>
							Reset
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button className='my-2 mx-3' color='primary'
							type='submit'
							isDisable={
								!formikZoomSetting.isValid &&
								!!formikZoomSetting.submitCount
							}>
							Save Changes
						</Button>
					</CardFooterRight>
				</CardFooter>
			</Card>
		</>
	);
};

export default ZoomMeetingSetting;
