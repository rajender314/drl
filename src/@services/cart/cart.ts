import axios from 'axios';
import { service } from './../interceptor'

export const getDiagnosticCartItems = () => {
	return service.get(`/emp-service/get-diagnostic-cart-items/MEDICINE?patientId=${sessionStorage.getItem('patientId')}`)
		.then((res) => {
			return res
		}).catch((error) => {
			return error
		})
}
export const deleteCartItem = (id: number) => {
	return service.delete(`/emp-service/delete-cart-item/MEDICINE?id=${id}`)
		.then((res) => {
			return res
		}).catch((error) => {
			return error
		})
}
export const cartItemToggle = (id: number, param: any) => {
	return service.put(`/emp-service/cartItemToggleBetweenHomeDeliveryAndStorePickup/MEDICINE?cartItemId=${id}`, param)
		.then((res) => {
			return res
		}).catch((error) => {
			return error
		})
}
export const getDeliveryAddress = () => {
	return service.get(`/emp-service/get-address/?patientId=${sessionStorage.getItem('patientId')}`)
		.then((res) => {
			return res
		}).catch((error) => {
			return error
		})
}

export const getMomandPopStores = (param: any) => {
	
	//?filter=FAR_TO_NEAR&latitude=17&longitude=78.2501&pageNo=0&pageSize=10&pinCode=500009
	//?filter=NEAR_TO_FAR&latitude=17.468542838375978&longitude=78.48919569437331&pageNo=0&pageSize=1000&pinCode=500009
	//?filter=FAR_TO_NEAR&latitude=17.468542838375978&longitude=78.48919569437331&pageNo=1&pageSize=1000&pinCode=500009
	//   let param = {
	// 	pinCode: cartDeliveryAddress && cartDeliveryAddress.pin,
	// 	location: cartDeliveryAddress && cartDeliveryAddress.location,
	// 	pageSize: 1000,
	// 	pageNo: currentPage,
	// 	filter: sortyBy.value
	// }
	return service.get(`/medicine/suppliers/getMomandPopStores?
	filter=${param.filter}&
	latitude=${param.location.latitude}&
	longitude=${param.location.longitude}&
	pageNo=${param.pageNo}&
	pageSize=${param.pageSize}&
	pinCode=${param.pinCode}`)
	
	.then((res) => {
			return res.data
		}).catch((error) => {
			return error
		})
}

export const createMedicineOrder = (params: any) => {
	return service.post(`/pharmacy/abhi-create-medicine-order`, params)
		.then((res) => {
			return res.data
		}).catch((error) => {
			return error
		})
}
