import serverConnectAPI from '../config/server-connect-api';

const getProductAndService = (params: {}, sort = null, pageSize = null, pageNumber = null) => {
	return serverConnectAPI.get('ProductSys', params);
};

const createProductData = (productdata: any) => {
	return serverConnectAPI.post('ProductSys-store', productdata);
};

const updateProductData = (data: any) => {

	return serverConnectAPI.post('ProductSys-edit', data);
};

const removeProductData = (id: any) => {
	return serverConnectAPI.post('ProductSys-del', id);
};

const getCategoryItems = (params = {}) => {
	return serverConnectAPI.get('Category', params);
};

const updateQuantityStock = (data: any) => {
	return serverConnectAPI.post('ProductStock-edit', data);
}

export default {
	getProductAndService,
	createProductData,
	updateProductData,
	removeProductData,
	getCategoryItems,
	updateQuantityStock,
};
