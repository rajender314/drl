
import { service } from './../interceptor'
export default function OrderFilters() {
	return service.get(`emp-service/get-order-filter`)
		.then((res) => {
			return res;
		});
}
