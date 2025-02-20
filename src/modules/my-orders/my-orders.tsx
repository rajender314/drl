import { getOrderFilters } from '@app/@services';
import { Header, Tabs } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import React from 'react';
import Laboratory from './laboratory';
import Medication from './medication';
import {
	Container,
	OuterContainer,
	TabDetails,
	Title,
} from './my-orders-components';

export default function MyOrders() {
	const [filters, setFilters] = React.useState<any>([]);
	const [loading, setLoading] = React.useState(true);
	const tabs = ['Medication', 'Laboratory'];
	const [selectedTab, setSeletedTab] = React.useState(tabs[1]);

	React.useEffect(() => {
		getFilters();
	}, []);

	async function getFilters() {
		await getOrderFilters().then((res: any) => {
			if (res.status === 200) {
				let data = res.data
				let filterGroups = [];
				if (data && data.status) {
					/* for (let key in data) {
						if (key !== 'status_code') {
							filterGroups.push({
								label: key.toLowerCase() === 'status' ? 'Order Status' : key,
								options:
									data[key] && data[key].length
										? data[key].map((item: any) => {
											return { ...item, label: item.name, value: item.code };
										})
										: [],
							});
						}
					} */
					setFilters(data);
				}
			}


		}).finally(() => {
			setLoading(false);
		})

	}
	if (loading) return <Spinner size='3px' />;
	return (
		<OuterContainer>
			<Header showProfile />
			<Title>My Orders</Title>
			<Container>
				<Tabs
					labels={tabs}
					selectedLabel={selectedTab}
					onClick={(e) => setSeletedTab(e)}
				/>
				<TabDetails>
					{selectedTab === 'Medication' && <Medication filters={filters} />}
					{selectedTab === 'Laboratory' && <Laboratory filters={filters} />}
				</TabDetails>
			</Container>
		</OuterContainer>
	);
}
