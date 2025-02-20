import { addItemsToCart, getLabOrders } from '@app/@services';
import { FilterGroup } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import React from 'react';
import OrderCard from '../common/order-card';
import { Label, NoDataMessage } from '../my-orders-components';
import * as _ from 'lodash'

type Props = {
	filters: any;
};
export default function Laboratory({ filters }: Props) {
	const [loading, setLoading] = React.useState(true);
	const [data, setData] = React.useState<any>([]);
	const [filterOptions, setFilters] = React.useState<any>([]);
	React.useEffect(() => {
		let selectedStatus = (filters['status'] && filters['status'].length) ?filters['status'].filter((data: any, index: any) => (data['default'])) : [];
		let selectedTime = (filters['time'] && filters['time'].length) ? filters['time'].filter((data: any, index: any) => (data['default'])) : [];
		let filterOptions = [...selectedStatus, ...selectedTime];
		getOrders(filterOptions, true);
	}, []);
	async function getOrders(selectedFilters?: any, isSet?: boolean) {
		if (isSet) {
			setLoading(true);
			//console.log(selectedFilters);
			let codeValues = [''];
			let timeVal = '';
			selectedFilters.map((item: { code: string }, index: number) => {

				let idx = _.findIndex(filters['time'], function (o: any) { return o.code == item.code });
				if (idx > -1) {
					timeVal = item.code;
				}
				else {
					codeValues.push(item.code)
				}
			})
			codeValues.splice(0, 1);
			let idx2 = _.findIndex(codeValues, function (o: any) { return o == 'ALL' });
			const status = (idx2 > -1) ? 'ALL' : codeValues.toString();
			const time = timeVal;
			/* // const status = selectedFilters
			// 	? selectedFilters.length
			// 		? selectedFilters.find((filter: any) => filter.group.toLowerCase() === 'order status')
			// 			? selectedFilters.find((filter: any) => filter.group.toLowerCase() === 'order status')
			// 					.value
			// 			: ''
			// 		: ''
			// 	: 'ALL';
			// const time = selectedFilters
			// 	? selectedFilters.length
			// 		? selectedFilters.find((filter: any) => filter.group === 'time')
			// 			? selectedFilters.find((filter: any) => filter.group === 'time').value
			// 			: ''
			// 		: ''
			// 	: 'LAST_6_MONTH';
			// if (selectedFilters && selectedFilters.length) {
			// 	let filter = [];
			// 	if (selectedFilters.find((filter: any) => filter.group.toLowerCase() === 'order status')) {
			// 		filter.push(
			// 			selectedFilters.find((filter: any) => filter.group.toLowerCase() === 'order status').label
			// 		);
			// 	}
			// 	if (selectedFilters.find((filter: any) => filter.group === 'time')) {
			// 		filter.push(
			// 			selectedFilters.find((filter: any) => filter.group === 'time').label
			// 		);
			// 	}
			// 	setFilters(filter);
			// }else{
			// 	setFilters([])
			// } */

			await getLabOrders({ status: status, time: time }).then((res: any) => {

				setData(res.data);

			}).finally(() => {
				setLoading(false);
			})

		}

	}

	return (
		<>
			<FilterGroup filters={filters} onApply={getOrders} />
			{data && data.length ? <Label>
				Showing all results{' '}
				{filterOptions.length ? 'for ' + filterOptions.join(' and ') : ''}
			</Label> : ''}
			{loading ? (
				<Spinner size='3px' />
			) : (
				<>
					{data.map((item: any, index: number) => (
						<OrderCard
							cardIndex={index.toString()}
							key={index}
							data={item}
							tab='lab'
						/>
					))}
					{!data.length && <NoDataMessage>No orders to display</NoDataMessage>}
				</>
			)}
		</>
	);
}
