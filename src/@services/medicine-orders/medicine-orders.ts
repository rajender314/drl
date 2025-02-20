import { service } from '../interceptor';
type Props = {
	status?: string;
	time?: string;
	orderId?: any;
};
export function getMedicineOrders({ status, time }: Props) {
	let queryUrl =
		status && time
			? `&status=${status}&filter=${time}`
			: status
				? `&status=${status}`
				: time
					? `&filter=${time}`
					: '';
					// &${queryUrl}
	return service.get(
		`emp-service/medicine-order-list?${queryUrl}`
	)
		.then((res) => {
			return res;
		});
}

export function getPharInvoice(orderId:any) {
	//console.log(orderId)
	return service.get(
		
		`/emp-service/pharmacy-invoice?orderId=${orderId}&patientId=${sessionStorage.getItem(
			'patientId'
		)}`
	)
		.then((res) => {
			return res;
		}).catch((error) => {
			return error
		});
}
export function getPharCancellationReasons(orderId:any) {
	//console.log(orderId)
	return service.get(
		
		`/emp-service/pharmacy-cancellation-reason?orderId=${orderId}&patientId=${sessionStorage.getItem(
			'patientId'
		)}`
	)
		.then((res) => {
			return res;
		}).catch((error) => {
			return error
		});
}
export const medCancelOrderApi = (params: any) => {
	let query = `?orderId=${params.orderNumber}`
	let postParams = {reason: params.cancellationReason}
	return service.post(`/emp-service/delete-medicine-order${query}`, postParams)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};

export function getMedicineOrderDetail({ orderId }: Props) {
	return service.get(
		`emp-service/medicine-order-detail?orderId=${orderId}&patientId=${sessionStorage.getItem(
			'patientId'
		)}`
	)
		.then((res) => {
			return res;
		}).catch((error) => {
			return error
		});
}
/* export const cancelOrderApiOld = (params: any) => {
	let query = `?orderId=${params.appointmentId}&reason=${params.cancellationReason}`;
	return service.delete(`/emp-service/cancel-order${query}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			return error;
		});
}; */
export const cancelOrderApi = (params: any) => {
	let query = `?orderNumber=${params.orderNumber}&cancelReason=${params.cancellationReason}`;
	return service.post(`/emp-service/diagnostics/2/cancel-order${query}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
