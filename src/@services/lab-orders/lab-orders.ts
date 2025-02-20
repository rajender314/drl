import { service } from '../interceptor';
type Props = {
	status?: string;
	time?: string;
	orderId?: any;
};
export function getLabOrders({ status, time }: Props) {
	let queryUrl =
		status && time
			? `&status=${status}&time=${time}`
			: status
				? `&status=${status}`
				: time
					? `&time=${time}`
					: '';
	return service.get(
		`emp-service/get-my-order-list?patientId=${sessionStorage.getItem(
			'patientId'
		)}&${queryUrl}`
	)
		.then((res) => {
			return res;
		});
}
export function getLabOrderDetail({ orderId }: Props) {
	return service.get(
		`emp-service/lab-order-detail?id=${orderId}&patientId=${sessionStorage.getItem(
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
	return service.post(`/emp-service/diagnostics/2/cancel-order`,params)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
