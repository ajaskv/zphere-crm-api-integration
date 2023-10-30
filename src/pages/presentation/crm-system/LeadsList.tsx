import React, { useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../../components/bootstrap/Card';
import CommonTableRow from '../../../pages/common/CommonTableRow';
import dummyData, { ITableData } from '../../../common/data/dummyProductData';
import useSelectTable from '../../../hooks/useSelectTable';
import PaginationButtons from '../../../components/PaginationButtons';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import request from '../../../utils/request';
import SnackbarAlert from '../../common/SnackbarAlert';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
interface ITableProps {
	title?: string;
	tableColumns?: { name: string }[];
	data?: any;
	displayPagintaion?: boolean;
	displayLoadMore?: boolean;
	displaySearch?: boolean;
	customTableActions?: any;
}

const LeadsList = ({
    data,
	displayPagintaion = true,
	displaySearch = true,
	customTableActions,
}: ITableProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const filteredData = data;
	const { selectTable } = useSelectTable(filteredData);

	const shouldShowHeader = displayPagintaion || displaySearch;
	const [showSnackBarAlert, setShowSnackBarAlert] = useState({
		status: false,
		type: 'success',
		message: ''
	});
    const DeleteLeads =(id:number)=>{
        request({
			url: 'api/del-lead',
			method: 'POST',
            data :{lead_id:id}
		})
			.then((response: any) => {
				if (response) {
				
					setShowSnackBarAlert({
                        status: true,
                        type: 'success',
                        message: 'Lead delete successfully',
                    });
    
				}
			})
			.catch(function (err) {

				setShowSnackBarAlert({
					status: true,
					type: 'error',
					message: err,
				});

			});

    }
    const handleSnackbarClose = () => {
		setShowSnackBarAlert({ status: false, type: '', message: '' });
	};
	return (
		<>
        	<SnackbarAlert
				showSnackBarAlert={showSnackBarAlert}
				handleSnackbarClose={handleSnackbarClose}
			/>
			<Card stretch>
				{shouldShowHeader && (
					<CardHeader>
						{/* {'Manage Leads' && <CardTitle>{'Manage Leads'}</CardTitle>} */}
						<CardActions className='d-flex justify-content-between align-items-center w-100'>
							{displayPagintaion && (
								<div>
									<PaginationButtons
										data={filteredData}
										label='items'
										setCurrentPage={setCurrentPage}
										currentPage={currentPage}
										perPage={perPage}
										setPerPage={setPerPage}
									/>
								</div>
							)}
							{displaySearch && (
								<div>
									<Input placeholder='Search' />
								</div>
							)}
							{customTableActions && customTableActions}
						</CardActions>
					</CardHeader>
				)}
				<CardBody className='table-responsive' isScrollable>
					<table className='table table-modern table-hover'>
						<thead>
							<tr className='table-body-row'>
							
									<th scope='col' key={'Name'}>Name</th>
                                    <th scope='col' key={'SUBJECT'}>SUBJECT</th>
                                    <th scope='col' key={'STAGE'}>STAGE</th>
                                    <th scope='col' key={'USERS'}>USERS</th>
                                    <th scope='col' key={'ACTION'}>ACTION</th>
							
							</tr>
						</thead>
						<tbody>
							{filteredData.map((tbdata:any) => (
								// <CommonTableRow
								// 	key={i.id}
								// 	// eslint-disable-next-line react/jsx-props-no-spreading
								// 	{...i}
								// 	data={i}
								// 	selectName='selectedList'
								// 	// selectOnChange={selectTable.handleChange}
								// 	// selectChecked={selectTable.values.selectedList.includes(
								// 	// 	i.id.toString() as never,
								// 	// )}
								// />
                                <tr>
			
						<td key={tbdata.id}>
							<span>{tbdata.name}</span>
						</td>
                        <td key={tbdata.id}>
							<span>{tbdata.subject}</span>
						</td>
                        <td key={tbdata.id}>
							<span>{tbdata.stage_id}</span>
						</td>
                        <td key={tbdata.id}>
							<span>{tbdata.user_id}</span>
						</td>
                        <td key={tbdata.id}>
                        <div>
					
                    <Tooltip title="View">
                    <IconButton  onClick={()=>DeleteLeads(tbdata.id)}>
                    <VisibilityIcon  />
                    </IconButton>
                    </Tooltip>
					
                    <Tooltip title="Edit">
                    <IconButton  onClick={()=>DeleteLeads(tbdata.id)}>
                    <EditTwoToneIcon  />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                    <IconButton  onClick={()=>DeleteLeads(tbdata.id)}>
                    <DeleteIcon  />
                    </IconButton>
                    </Tooltip>
					
                   
				</div> </td>
					
				 </tr>
							))}
						</tbody>
					</table>
				</CardBody>
				{displayPagintaion && (
					<CardFooter className='justify-content-center'>
						<Button color='dark' className='px-5 py-3'>
							Load More
						</Button>
					</CardFooter>
				)}
			</Card>
		</>
	);
};

export default LeadsList;
