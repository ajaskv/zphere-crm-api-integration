import React from 'react';
import Icon from '../../../components/icon/Icon';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import PresentaionPagesSubHeader from '../../../widgets/PresentaionPagesSubHeader';
import TableWidget from '../../../widgets/Table';

const EmployeeAssetSetup = () => {
	function generateDummyData(count: number) {
		const dummyData = {
			id: 'China',
			Name: ' DemoTese DemoTese DemoTese Demo',
			actions: (
				<div>
					<Icon size='lg' className='mx-2' icon='Verified' color='info' />
					<Icon size='lg' className='mx-2' icon='Copy' color='info' />
					<Icon size='lg' className='mx-2' icon='Edit' color='info' />
					<Icon size='lg' className='mx-2' icon='Delete' color='info' />
					<Icon size='lg' className='mx-2' icon='Verified' color='info' />
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

	const columns = [{ name: 'NAME' }, { name: 'RESPONSE' }, { name: 'ACTIONS' }];
	return (
		<PageWrapper title=''>
			<PresentaionPagesSubHeader title='Manage Form Builder' />
			<Page container='fluid'>
				<TableWidget data={generateDummyData(3)} tableColumns={columns} title='' />
			</Page>
		</PageWrapper>
	);
};

export default EmployeeAssetSetup;
