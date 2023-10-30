export const unitStatusText = [
	{ value: '0', text: 'Inch' },
	{ value: '1', text: 'Meter' },
	{ value: '2', text: 'Piece' },
	{ value: '3', text: 'Set' },
	{ value: '4', text: 'Mass' },
	{ value: '5', text: 'KG' },
];

export const productTypeText = [
	{ value: '0', text: '' },
	{ value: '1', text: 'Product' },
	{ value: '2', text: 'Service' },
];

export const getProductTypeText = (status: any) => {
	return productTypeText[status]?.text;
};

export const getUnitStatusText = (status: any) => {
	return unitStatusText[status]?.text;
};


