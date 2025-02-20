import { service } from './../interceptor';
type Props = {
	status?: string;
	filterBy?: string;
	docId?: string;
	svssUserId?: String;
	pageNo?:number;
};
export const getAppointments = ({
	status = 'ALL',
	filterBy = 'ALL',
	docId,
	svssUserId,
	pageNo,
}: Props) => {
	let queryUrl = `?patientId=${svssUserId}`;
	let filterQry =
		docId && filterBy
			? `&doctorId=${docId}&filterBy=${filterBy}`
			: docId
				? `&doctorId=${docId}`
				: filterBy
					? `&filterBy=${filterBy}`
					: '';
					let pageParams = `&pageNo=${pageNo}&pageSize=${10}`
	return service.get(`emp-service/get-appointment/${status}${queryUrl}${filterQry}${pageParams}`)
		.then((res) => {
			return res;
		})
		.catch((error) => { });
};
export const appointmentFilters = () => {
	return service.get(`emp-service/get-appointment-filter`).then((res) => {
		return res;
	});
};
export const appointmentDetails = (id: any) => {
	return service.get(`emp-service/getAppointmentDetail?appointmentId=${id}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getLabVisits = () => {
	return service.get(`emp-service/transactions/activities/visits`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getAppointmentSlots = (params: any) => {
	const { clinicId, doctorId, fromDate, toDate, appointmentType } = params;

	let query = ' ';
	query = `clinicId=${clinicId}&doctorId=${doctorId}&fromDate=${fromDate}&toDate=${toDate}&appointmentType=${appointmentType}`;

	return service.get(`emp-service/get-doctor-slots?${query}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getInvoice = (id: any, type?: any) => {
	//types DIAGNOSTIC ,DOCTOR
	let query = `?id=${id}`;
	if (type) {
		query = query.concat(`&invoiceType=${type}`)
	}
	return service.get(`emp-service/get-invoice${query}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getCancellationReasons = (type: any) => {
	// doctor/lab
	return service.get(`/emp-service/get-cancellation-reason?type=${type}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const rescheduleApi = (params: any, patientId: any) => {
	return service.put(
		`/emp-service/doctor/reschedule-appointment?patientId=${patientId}`,
		params
	)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const cancelAppointmentApi = (params: any) => {
	let query = `?appointmentId=${params.appointmentId}&cancellationReason=${params.cancellationReason}&patientId=${params.patientId}`;
	return service.delete(`/emp-service/doctor/cancel-appointment${query}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getPaymentLinkApi = (id: any) => {
	let query = `?orderId=${id}`;
	return service.get(`emp-service/payment-Link${query}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getPaymentCostApi = (params: any) => {
	return service.post(`emp-service/getBillingCostBreakdown`, params)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getPaymentStatusApi = (id: any) => {
	return service.get(`emp-service/payment-status?linkId=${id}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};

/**
 *
http://localhost:8888/emp-service/get-invoice?id=6362&invoiceType=DOCTOR

http://localhost:8888/emp-service/get-invoice?id=2789948&invoiceType=DIAGNOSTIC


http://localhost:8888/emp-service/get-lab-slot?cartId=683&fromDate=23%2F01%2F2021&labId=89&pinCode=500003&toDate=23%2F01%2F2021&type=LAB_VISIT

http://localhost:8888/emp-service/get-address?patientId=SVEMP-d070bc6b-9e94-11eb-817b-6045bd7243ce


http://localhost:8888/emp-service/diagnostics/2/cancel-order?orderNumber=2788032&cancelReason=dsfsf
 */
