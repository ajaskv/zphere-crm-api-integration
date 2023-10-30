import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import ReactSelect from 'react-select';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import PresentaionPagesSubHeader from '../../../widgets/PresentaionPagesSubHeader';
import TableWidget from '../../../widgets/Table';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { useFormik } from 'formik';
import { FormikErrors, FormikValues } from 'formik';
import { getUnitStatusText, getProductTypeText } from '../../../utils/constantArrays';

import useApi from '../../../api/hooks/useApi';
import ProductsFunction from '../../../api/apifunctions/products';

const ProductAndServices = () => {
	const APIGetAllProductServices = useApi(ProductsFunction.getProductAndService);
	const APICreateProductServices = useApi(ProductsFunction.createProductData);
	const APIUpdateProductServices = useApi(ProductsFunction.updateProductData);
	const APIDeleteProductServices = useApi(ProductsFunction.removeProductData);
	const APIGetCategoryItems = useApi(ProductsFunction.getCategoryItems);

	const navigate = useNavigate();
	const categoryid = useLocation();

	const [productServices, setproductServices] = useState<any>([]);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [categoryProduct, setCategoryProduct] = useState<any>([]);

	useEffect(() => {
		if (!isOpenModal) {
			setSelectedProduct(null);
		}
	}, [isOpenModal]);

	useEffect(() => {
		fetchProductService();
		fetchCategoryItems();
	}, []);

	const fetchProductService = async () => {
		const retVal = await APIGetAllProductServices.request();
		if (retVal) {
			setproductServices(retVal.data);
		}
	};

	const fetchCategoryItems = async () => {
		const retVal = await APIGetCategoryItems.request();
		if (retVal) {
			setCategoryProduct(retVal.data);
		}
	};

	const addProductData = async (newProductValues: any) => {
		const retVal = await APICreateProductServices.request(newProductValues);
		if (retVal && retVal.ok) {
			productServices([...productServices, retVal.data]);
			return true;
		} else {
			return APICreateProductServices.errorMessage;
		}
	};

	const updateProductData = async (data: any) => {
		const retVal = await APIUpdateProductServices.request(data);
		if (retVal && retVal.ok) {
			setproductServices(
				productServices.map((productdata: any) => {
					if (productdata.id != data.id) {
						return productdata;
					} else {
						return retVal.data;
					}
				}),
			);
			return true;
		} else {
			return APIUpdateProductServices.errorMessage;
		}
	};

	const deleteProductData = (id: number) => {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this Product Details!',
			icon: 'warning',
			buttons: {
				cancel: {
					text: 'Cancel',
					value: null,
					visible: true,
					closeModal: true,
				},
				confirm: {
					text: 'Confirm',
					value: true,
					visible: true,
					closeModal: true,
				},
			},
			dangerMode: true,
		}).then(async (willDelete) => {
			if (willDelete) {
				const retVal = await APIDeleteProductServices.request({ id });
				if (retVal) {
					setproductServices(
						productServices.filter((productdata: any) => productdata.id != id),
					);
					return true;
				} else {
					return APIDeleteProductServices.errorMessage;
				}
			}
		});
	};

	function GenerateProductData() {
		const productData: any = [];

		productServices.map((product: any) => {
			if (categoryid.search && categoryid.search.split('=')[1])
				categoryid.search.split('=')[1] === product.category_id &&
					productData.push({
						name: product.name,
						sku: product.sku,
						saleprice: product.sale_price,
						purchaseprice: product.purchase_price,
						tax: product.tax_id
							? JSON.parse(product.tax_id).map((item: any) => item + '\n')
							: null,
						category: categoryProduct?.find(
							(category: any) => category.id == product.category_id,
						).name,
						unit: getUnitStatusText(product.unit_id),
						quantity: product.quantity,
						type: getProductTypeText(product.type),
						actions: (
							<>
								<Button
									className='mx-2'
									icon='edit'
									color='info'
									onClick={() => {
										setSelectedProduct(product);
										setIsOpenModal(true);
									}}
								/>
								<Button
									className='mx-2'
									icon='trash'
									color='danger'
									onClick={() => deleteProductData(product.id)}
								/>
							</>
						),
					});
			else {
				productData.push({
					name: product.name,
					sku: product.sku,
					saleprice: product.sale_price,
					purchaseprice: product.purchase_price,
					tax: product.tax_id
						? JSON.parse(product.tax_id).map((item: any) => item + '\n')
						: null,
					category: categoryProduct?.find(
						(category: any) => category.id == product.category_id,
					).name,
					unit: getUnitStatusText(product.unit_id),
					quantity: product.quantity,
					type: getProductTypeText(product.type),
					actions: (
						<>
							<Button
								className='mx-2'
								icon='edit'
								color='info'
								onClick={() => {
									setSelectedProduct(product);
									setIsOpenModal(true);
								}}
							/>
							<Button
								className='mx-2'
								icon='trash'
								color='danger'
								onClick={() => deleteProductData(product.id)}
							/>
						</>
					),
				});
			}
		});

		return productData;
	}

	const ProductTableColumns = [
		{ name: 'NAME' },
		{ name: 'SKU' },
		{ name: 'SALE PRICE' },
		{ name: 'PURCHASE PRICE' },
		{ name: 'TAX' },
		{ name: 'CATEGORY' },
		{ name: 'UNIT' },
		{ name: 'QUANTITY' },
		{ name: 'TYPE' },
		{ name: 'ACTION' },
	];

	const customSubHeaderRightActions = () => (
		<>
			<div className='col-md-6'>
				<Select
					ariaLabel='Category select'
					placeholder='Select Category'
					onChange={(e: any) => {
						navigate(`?categoryId=${e.target.value}`);
					}}>
					{categoryProduct?.map((productt: any) => (
						<Option key={productt.id} value={productt.id}>
							{productt.name}
						</Option>
					))}
				</Select>
			</div>
			{/* <Button className='p-2' icon='search' color='success' /> */}
			<Button
				className='p-2'
				icon='trash'
				color='danger'
				onClick={() => {
					// alert('hiii')
					// formikEvent.submitForm();
					// updateProductData();
					// setIsOpenModal(false);
				}}></Button>
			<Button
				className='p-2'
				icon='add'
				color='primary'
				onClick={() => {
					setIsOpenModal(true);
				}}></Button>
		</>
	);

	return (
		<PageWrapper title=''>
			<PresentaionPagesSubHeader
				showSubHeaderRight
				showAddNewButton={false}
				customSubHeaderRightActions={customSubHeaderRightActions}
				title='Product Details'
			/>
			<Page container='fluid'>
				{(productServices && productServices.length && (
					<TableWidget data={GenerateProductData()} tableColumns={ProductTableColumns} />
				)) || <div className='pt-20 text-center text-danger'>No data found!</div>}
				<AddEditProductModal
					isOpenModal={isOpenModal}
					setIsOpenModal={setIsOpenModal}
					fetchProductService={fetchProductService}
					product={selectedProduct}
					addProductData={addProductData}
					updateProductData={updateProductData}
					deleteProductData={deleteProductData}
					categoryProduct={categoryProduct}
				/>
			</Page>
		</PageWrapper>
	);
};

export default ProductAndServices;

const AddEditProductModal = ({
	isOpenModal,
	setIsOpenModal,
	product,
	addProductData,
	updateProductData,
	categoryProduct,
	fetchProductService,
}: {
	isOpenModal: any;
	setIsOpenModal: any;
	product: any;
	addProductData: any;
	updateProductData: any;
	categoryProduct: any;
	deleteProductData: any;
	fetchProductService: any;
}) => {
	useEffect(() => {
		if (product) {
			formikEvent.setFieldValue('id', product.id);
			formikEvent.setFieldValue('name', product.name);
			formikEvent.setFieldValue('sku', product.sku);
			formikEvent.setFieldValue('description', product.description);
			formikEvent.setFieldValue('sale_price', product.sale_price);
			formikEvent.setFieldValue('purchase_price', product.purchase_price);
			formikEvent.setFieldValue('tax_id', product.tax_id);
			formikEvent.setFieldValue('category_id', product.category_id);
			formikEvent.setFieldValue('unit_id', product.unit_id);
			formikEvent.setFieldValue('quantity', product.quantity);
		}
	}, [product]);

	useEffect(() => {
		if (!isOpenModal) {
			formikEvent.resetForm();
		}
	}, [isOpenModal]);

	const UnitValue = [
		{ value: '0', text: 'Inch' },
		{ value: '1', text: 'Meter' },
		{ value: '2', text: 'Piece' },
		{ value: '3', text: 'Set' },
		{ value: '4', text: 'Mass' },
		{ value: '5', text: 'KG' },
	];

	const taxValue = [
		{ value: 'CGST(10%)', text: 'CGST' },
		{ value: 'SGST(5%)', text: 'SGST' },
	];

	const handleSubmit = async (data: any) => {
		if (product) {
			updateProductData({
				id: product.id,
				...data,
			});
			swal({
				title: 'Product Successfully Updated..',
				icon: 'success',
			});
		} else {
			addProductData(JSON.stringify(data));
			swal({
				title: 'Product Successfully Added..',
				icon: 'success',
			});
		}
	};

	const formikEvent = useFormik({
		initialValues: {
			id: '',
			name: '',
			sku: '',
			description: '',
			sale_price: '',
			purchase_price: '',
			tax_id: '',
			category_id: '',
			unit_id: '',
			type: '1',
			quantity: '',
		},

		validate: (values) => {
			let errors: FormikErrors<any> = {};
			if (!values.name) {
				errors.name = 'Name Required';
			} else if (!values.sku) {
				errors.sku = 'sku Required';
			} else if (!values.description) {
				errors.description = 'description Required';
			} else if (!values.sale_price) {
				errors.sale_price = 'sale_price Required';
			} else if (!values.purchase_price) {
				errors.purchase_price = 'purchase_price Required';
			} else if (!values.tax_id) {
				errors.tax_id = 'tax_id Required';
			} else if (!values.category_id) {
				errors.category_id = 'category_id Required';
			} else if (!values.tax_id) {
				errors.unit_id = 'unit_id Required';
			} else if (!values.type) {
				errors.type = 'type Required';
			} else if (!values.quantity) {
				errors.quantity = 'quantity Required';
			}

			return errors;
		},

		onSubmit: async (values) => {
			await handleSubmit({ ...values, created_by: 2 });
			setIsOpenModal(false);
			formikEvent.resetForm();
		},
	});

	return (
		<Modal size='lg' isOpen={isOpenModal} setIsOpen={setIsOpenModal} titleId='Product Modal'>
			<ModalHeader setIsOpen={setIsOpenModal} className='border-bottom-0'>
				<ModalTitle id=''>
					<span> product Details</span>
				</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<div className='p-8'>
					<div className='row'>
						<div className='col-md-6'>
							<FormGroup
								// onSubmit={formikEvent.submitForm}
								id='name'
								label='Product Name'
								className='pb-4 '>
								<Input
									// placeholder='Enter Product Name'
									autoComplete='additional-name'
									name='name'
									onChange={formikEvent.handleChange}
									onBlur={formikEvent.handleBlur}
									value={formikEvent.values.name}
									isValid={formikEvent.isValid}
									isTouched={formikEvent.touched.name}
									invalidFeedback={formikEvent.errors.name}
								/>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							<FormGroup id='sku' label='sku' className='pb-4'>
								<Input
									// placeholder='Enter Sku'
									autoComplete='additional-name'
									name='sku'
									onChange={formikEvent.handleChange}
									onBlur={formikEvent.handleBlur}
									value={formikEvent.values.sku}
									isValid={formikEvent.isValid}
									isTouched={formikEvent.touched.sku}
									invalidFeedback={formikEvent.errors.sku}
								/>
							</FormGroup>
						</div>
					</div>

					<FormGroup className='col-12 pb-4' id='description' label='Description'>
						<Textarea
							name='description'
							onChange={formikEvent.handleChange}
							value={formikEvent.values.description}
							isValid={formikEvent.isValid}
							isTouched={formikEvent.touched.description}
							invalidFeedback={formikEvent.errors.description}
						/>
					</FormGroup>
					<div className='row'>
						<div className='col-md-6'>
							<FormGroup id='sale_price' label='Sale Price' className='pb-4'>
								<Input
									// placeholder='Sale Price'
									autoComplete='additional-name'
									name='sale_price'
									onChange={formikEvent.handleChange}
									onBlur={formikEvent.handleBlur}
									value={formikEvent.values.sale_price}
									isValid={formikEvent.isValid}
									isTouched={formikEvent.touched.sale_price}
									invalidFeedback={formikEvent.errors.sale_price}
								/>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							<FormGroup id='purchase_price' label='Purchase Price' className='pb-4'>
								<Input
									// placeholder='Purchase Price'
									autoComplete='additional-name'
									name='purchase_price'
									onChange={formikEvent.handleChange}
									onBlur={formikEvent.handleBlur}
									value={formikEvent.values.purchase_price}
									isValid={formikEvent.isValid}
									isTouched={formikEvent.touched.purchase_price}
									invalidFeedback={formikEvent.errors.purchase_price}
								/>
							</FormGroup>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							<FormGroup id='tax_id' label='Tax' className='pb-4'>
								<ReactSelect
									options={taxValue.map((product: any) => ({
										value: product.value,
										label: product.text,
									}))}
									isMulti
									onChange={(option: any) =>
										formikEvent.setFieldValue(
											'tax_id',
											option
												? JSON.stringify(
														option.map((item: any) => item.value),
												  )
												: null,
										)
									}
								/>
							</FormGroup>
						</div>

						<div className='col-md-6'>
							<FormGroup id='category_id' label='Category' className='pb-4'>
								<Select
									ariaLabel='Category select'
									placeholder='Select Category'
									onChange={formikEvent.handleChange}
									value={formikEvent.values.category_id}>
									{categoryProduct?.map((productt: any) => (
										<Option key={productt.id} value={productt.id}>
											{productt.name}
										</Option>
									))}
								</Select>
							</FormGroup>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6'>
							<FormGroup id='unit_id' label='Unit' className='pb-4'>
								<Select
									ariaLabel='Unit select'
									placeholder='Select Unit'
									onChange={formikEvent.handleChange}
									value={formikEvent.values.unit_id}>
									{UnitValue.map((unitdata: any) => (
										<Option key={unitdata.id} value={unitdata.value}>
											{unitdata.text}
										</Option>
									))}
								</Select>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							<FormGroup id='productimage' label='Product Image' className='pb-4'>
								<Input
									placeholder='Product Image'
									autoComplete='additional-name'
									name='productimage'
									type='file'
								/>
							</FormGroup>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-3'>
							<FormGroup label='product' className='py-4'>
								<input
									type='radio'
									name='type'
									id='type'
									// label='Default radio'
									value='1'
									onChange={formikEvent.handleChange}
									checked={formikEvent.values.type === '1'}
								/>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup label='service' className='py-4'>
								<input
									type='radio'
									name='type'
									id='type'
									value='2'
									onChange={formikEvent.handleChange}
									checked={formikEvent.values.type === '2'}
									// type='radio'
									// name='flexRadioDefault'
									// id='flexRadioDefault1'
									// label='Default radio'
									// value='first'
									// onChange={flexRadios.handleChange}
									// checked={flexRadios.values.flexRadioDefault}
								/>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							{formikEvent.values.type === '1' && (
								<FormGroup id='quantity' label='Quantity' className='pb-4'>
									<Input
										placeholder='Quantity'
										autoComplete='additional-name'
										name='quantity'
										onChange={formikEvent.handleChange}
										onBlur={formikEvent.handleBlur}
										value={formikEvent.values.quantity}
										isValid={formikEvent.isValid}
										isTouched={formikEvent.touched.quantity}
										invalidFeedback={formikEvent.errors.quantity}
									/>
								</FormGroup>
							)}
						</div>
					</div>
				</div>
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
						fetchProductService();
					}}>
					Yes
				</Button>
			</ModalFooter>
		</Modal>
	);
};
