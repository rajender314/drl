import React from 'react';
import {
	Container,
	Tab,
	TabContainer,
	TabDetails,
} from './saved-address-components';
import { Button, Icon } from '@app/components';
import Address from './address';
import AddEditAddress from './add-edit-address';
import { getUserAddressess } from '@app/@services/user/user';
import { Spinner } from '@app/components/icon/icons';

type Props = {
	userInfo?: any;
};
const Tabs = ['Home', 'Office', 'Other'];

export default function SavedAddress({ userInfo }: Props) {
	const [home, setHome] = React.useState([]);
	const [office, setOffice] = React.useState([]);
	const [other, setOther] = React.useState([]);
	const [selectedTab, setSelectedTab] = React.useState(Tabs[0]);
	const [newAddress, toggleAddress] = React.useState(false);
	const [editAddress, setEditAddress] = React.useState<any>(null);
	const [loading, setLoading] = React.useState(true);
	const [userAddressess, setUserAddresses] = React.useState<any>([]);

	React.useEffect(() => {
		if (!userAddressess.length) {
			getAddressess();
		}

		if (newAddress) {
			document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
		} else {
			document.getElementsByTagName('body')[0].style.overflowY = 'initial';
		}
		return () => {
			document.getElementsByTagName('body')[0].style.overflowY = 'initial';
		};
		// eslint-disable-next-line
	}, [home, office, other, newAddress, userAddressess]);

	const getAddressess = async () => {
		setLoading(true);
		await getUserAddressess().then((res: any) => {
			if (res.status && res.status == 200 && res.data.length) {
				let addresses = res.data
				setUserAddresses(addresses);
				setHome(
					addresses.filter(
						(addr: any) => addr.addressName.toUpperCase() === 'HOME'
					)
				);
				setOffice(
					addresses.filter(
						(addr: any) => addr.addressName.toUpperCase() === 'OFFICE'
					)
				);
				setOther(
					addresses.filter(
						(addr: any) =>
							addr.addressName.toUpperCase() !== 'HOME' &&
							addr.addressName.toUpperCase() !== 'OFFICE'
					)
				);
			}
		}).finally(() => {
			setLoading(false);
		})


	};
	if (loading) {
		return <Spinner size='3px' />;
	}
	return (
		<Container>
			<TabContainer>
				{Tabs.map((tab: any) => (
					<Tab
						tab={tab}
						onClick={() => setSelectedTab(tab)}
						selected={selectedTab}
						key={tab}>
						<Icon name={tab === 'Other' ? 'location' : tab} />
						{tab}
					</Tab>
				))}
			</TabContainer>
			<TabDetails>
				{selectedTab === 'Home' && (
					<Address
						addresses={home}
						toggleAddress={toggleAddress}
						setEditAddress={setEditAddress}
						getAddressess={getAddressess}
					/>
				)}
				{selectedTab === 'Office' && (
					<Address
						addresses={office}
						toggleAddress={toggleAddress}
						setEditAddress={setEditAddress}
						getAddressess={getAddressess}
					/>
				)}
				{selectedTab === 'Other' && (
					<Address
						addresses={other}
						toggleAddress={toggleAddress}
						setEditAddress={setEditAddress}
						getAddressess={getAddressess}
					/>
				)}
				<Button variant='secondary' onClick={() => toggleAddress(true)}>
					+ Add a New Address
				</Button>
			</TabDetails>
			{newAddress && (
				<AddEditAddress
					onClose={() => {
						toggleAddress(false);
						setEditAddress(null);
					}}
					editAddress={editAddress}
					userInfo={userInfo}
					type={selectedTab}
					getAddressess={getAddressess}
				/>
			)}
		</Container>
	);
}
