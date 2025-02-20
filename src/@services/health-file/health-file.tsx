import { service } from './../interceptor'
type Props = {
	status?: string;
	filterBy?: string;
	docId?: string;
	patientId?:any
};
export function getHealthFileData({
	patientId
}: Props) {
	// let queryUrl =
	// 	docId && filterBy
	// 		? `?doctorId=${docId}&filterBy=${filterBy}`
	// 		: docId
	// 		? `?doctorId=${docId}`
	// 		: filterBy
	// 		? `?filterBy=${filterBy}`
	// 		: '';
	return service.get(`emp-service/get-health-file-data?patientId=${patientId}`)
		.then((res) => {
			return res;
		});
}

///

export const getReportDetailApi = (params: any) => {

	return service.post(`emp-service/get-lab-report-data?patientId=${params['patientId']}`, params)
		.then((res) => {
			return res
		}).catch((error) => {
			return error
		})
}
