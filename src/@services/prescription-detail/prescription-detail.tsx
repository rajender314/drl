
import { service } from './../interceptor'

type Props = {
	id: string
}
export const getPrescriptionDetails = ({ id }: Props) => {
	return service.get(`emp-service/getPrescriptionDetails?id=${id}&patientId=${sessionStorage.getItem('patientId')} `)
		.then((res) => {
			return res;
		});
}
export const addItemsToCart = (params: any) => {	
	//'/emp-service/add-medicine-to-cart'
	return service.post(`/emp-service/add-diagnostic-items-to-cart?patientId=${sessionStorage.getItem('patientId')}`, params).then((res) => {
		return res.data;
	});
}
export const removeCartItem = (id: number) => {
	return service.delete(`/emp-service/delete-cart-item/MEDICINE?id=${id}`)
		.then((res) => {
			return res
		}).catch((error) => {
			return error
		})
}