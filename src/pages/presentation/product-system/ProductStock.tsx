import { useEffect, useState } from 'react';
import Button from '../../../components/bootstrap/Button';
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
import swal from 'sweetalert';
import { useFormik } from 'formik';
import Input from '../../../components/bootstrap/forms/Input';
import { FormikErrors } from 'formik';

import useApi from '../../../api/hooks/useApi';
import ProductsFunction from '../../../api/apifunctions/products';

const ProductStock = () => {
	const APIGetAllProductServices = useApi(ProductsFunction.getProductAndService);
	const APIUpdateProductStock = useApi(ProductsFunction.updateQuantityStock);

	const [productServices, setproductServices] = useState<any>([]);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);

	useEffect(() => {
		fetchProductService();
	}, []);

	useEffect(() => {
		if (!isOpenModal) {
			setSelectedProduct(null);
		}
	}, [isOpenModal]);

	const fetchProductService = async () => {
		const retVal = await APIGetAllProductServices.request();
		if (retVal) {
			setproductServices(retVal.data);
		}
	};

	const updateQuantityStock = async (data: any) => {
		const retVal = await APIUpdateProductStock.request(data);
		if (retVal && retVal.ok) {
			setproductServices(
				productServices.map((productData: any) => {
					if (productData.id != data.id) {
						return productData;
					} else {
						return retVal.data;
					}
				}),
			);
			return true;
		} else {
			return APIUpdateProductStock.errorMessage;
		}
	};

	function GenerateProductData(count: number) {
		const productData = productServices.map((product: any) => {
			return {
				name: product.name,
				sku: product.sku,
				quantity: product.quantity,
				actions: (
					<Button
						className='mx-2'
						icon='plus'
						color='info'
						onClick={() => {
							setSelectedProduct(product);
							setIsOpenModal(true);
						}}
					/>
				),
			};
		});
		return productData;
	}

	const columns = [
		{ name: 'NAME' },
		{ name: 'SKU' },
		{ name: 'CURRENT QUANTITY' },
		{ name: 'ACTION' },
	];

	return (
		<PageWrapper title=''>
			<PresentaionPagesSubHeader
				showSubHeaderRight
				showAddNewButton={false}
				title='Find Employee Payslip'
			/>
			<Page container='fluid'>
				{(productServices && productServices.length && (
					<TableWidget
						data={GenerateProductData(productServices.length)}
						tableColumns={columns}
					/>
				)) || <div className='p-5 text-center text-danger'>No data found!</div>}
				<AddProductQuantityModal
					isOpenModal={isOpenModal}
					setIsOpenModal={setIsOpenModal}
					product={selectedProduct}
					updateQuantityStock={updateQuantityStock}
				/>
			</Page>
		</PageWrapper>
	);
};

export default ProductStock;

const AddProductQuantityModal = ({
	isOpenModal,
	setIsOpenModal,
	product,
	updateQuantityStock,
}: {
	isOpenModal: any;
	setIsOpenModal: any;
	product: any;
	updateQuantityStock: any;
}) => {
	useEffect(() => {
		if (product) {
			formikEvent.setFieldValue('id', product.id);
			formikEvent.setFieldValue('name', product.name);
			formikEvent.setFieldValue('sku', product.sku);
			formikEvent.setFieldValue('quantity', product.quantity);
		}
	}, [product]);

	useEffect(() => {
		if (!isOpenModal) {
			formikEvent.resetForm();
		}
	}, [isOpenModal]);

	const handleSubmit = async (data: any) => {
		if (product) {
			updateQuantityStock({
				id: product.id,
				quantity: data.quantity,
			});
		}
	};

	const formikEvent = useFormik({
		initialValues: {
			id: '',
			name: '',
			sku: '',
			quantity: '',
		},

		onSubmit: async (values: any) => {
			// values.quantity = product.quantity + values.quantity;
			await handleSubmit({ ...values, created_by: 2 });
			setIsOpenModal(false);
			formikEvent.resetForm();
		},
		validate: (values) => {
			let errors: FormikErrors<any> = {};
			if (!values.quantity) {
				errors.quantity = 'Quantity Required';
			}
			return errors;
		},
	});
	return (
		<Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} titleId='Product Modal'>
			<ModalHeader setIsOpen={setIsOpenModal} className='border-bottom-0'>
				<ModalTitle id=''>
					<span> product Details</span>
				</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<div className='p-8'>
					<div className='row'>
						<div className='col-md-6'>
							<FormGroup id='name' label='Product Name' className='pb-4 '>
								<Input
									autoComplete='additional-name'
									name='name'
									onChange={formikEvent.handleChange}
									onBlur={formikEvent.handleBlur}
									value={formikEvent.values.name}
									isValid={formikEvent.isValid}
									isTouched={formikEvent.touched.name}
									invalidFeedback={formikEvent.errors.name}
									validFeedback='Looks good!'
									disabled={true}
								/>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							<FormGroup id='sku' label='sku' className='pb-4'>
								<Input
									autoComplete='additional-name'
									name='sku'
									onChange={formikEvent.handleChange}
									onBlur={formikEvent.handleBlur}
									value={formikEvent.values.sku}
									isValid={formikEvent.isValid}
									isTouched={formikEvent.touched.sku}
									invalidFeedback={formikEvent.errors.sku}
									validFeedback='Looks good!'
									disabled={true}
								/>
							</FormGroup>
						</div>
					</div>
					<div className='row'>
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
								validFeedback='Looks good!'
							/>
						</FormGroup>
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
						swal({
							title: 'Product Stock Successfully Updated..',
							icon: 'success',
						});
					}}>
					Yes
				</Button>
			</ModalFooter>
		</Modal>
	);
};
