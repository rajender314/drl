import { service } from './../interceptor'


export const getCoverageTransactionList = (params: any) => {
	return service.get(`/coverage-service/coverage/transaction-history-list?pageNo=${params.page}&pageSize=${params.count}&svassId=${params.svassId}`)
		.then((res) => {
			return res

		}).catch((error) => {
			return error
		})
}

export const claimDataDetails = (savaasUserId: any,type:any) => {
	return service.get(`/coverage-service/products/coverage/offlineClaimDetails?consultationType=${type}&userId=${savaasUserId}`)
		.then((res) => {
			return res

		}).catch((error) => {
			return error
		})
}
export const claimDetails = (savaasUserId: any) => {
	return service.get(`/product-config/users/${savaasUserId}/getUserProfileForUpdateClaim?requestType=`)
		.then((res) => {
			return res

		}).catch((error) => {
			return error
		})
}
export const getCoverageList = (id: any) => {
	return service.get(`/coverage-service/coverage/${id}/`)
		.then((res) => {
			return res

		}).catch((error) => {
			return error
		})
}
export const getTrDetails = (params: any) => {
	let query = `patientId=${params.svassId}`;
	if (params.id) {
		query = query + `&appointmentId=${params.id}`
	}
	if (params.svassId) {
		query = query + `&svaasOrderId=${params.svaasOrderId}&svassId=${params.svassId}`
	}

	/* &svaasOrderId=M-MD2309-1246-4569433944&svassId=SVEMP-d0703222-9e94-11eb-817b-6045bd7243ce */
	return service.get(`/coverage-service/coverage/transaction-detail?${query}`)
		.then((res) => {
			return res

		}).catch((error) => {
			return error
		})
}
export const getTrHistoryByMonth = (params: any) => {
	let query = `?svassId=${params.svassId}`
	if (params.month) {
		query = query + `&date=${params.month}`
	}
	if (params.year) {
		query = query + `&year=${params.year}`
	}
	if (params.count) {
		query = query + `&count=1`
	}
	if (params.count) {
		query = query + `&pageSize=${params.count}`
	}
	if (params.page) {
		query = query + `&pageNo=${params.page}`
	}
	return service.get(`/coverage-service/coverage/transaction-history/month-wise${query}`)
		.then((res) => {
			return res

		}).catch((error) => {
			return error
		})
}