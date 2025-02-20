import { getUserAddressess, getUserDetail } from '@app/@services/user/user';
import { Header } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import Tabs from '@app/components/tabs';
import React from 'react';
import { useHistory } from 'react-router';
import {Privacy} from './privacy'
import {
	Container,
	DetailsContainer,
	TabDetails,
	Title,
} from './legal-components';

const TabLabels = ['Privacy Policy', 'Terms & Condition', 'Cancellation Policy'];

export function Legal() {
	const history = useHistory();
	const [userInfo, setUserInfo] = React.useState<any>(null);
	const [loading, setLoading] = React.useState(true);
	const { location } = history;
	const { state }: any = location;
	const { selectedPage } = state || { selectedPage: '' };
	const [selectedTab, setTab] = React.useState(selectedPage || TabLabels[0]);

	React.useEffect(() => {
		let str = window.location.pathname;
		let strArr = str.split('/');
		if (strArr.includes("terms")) {
			setTab('Terms & Condition')
		} else if (strArr.includes("cancel")) {
			setTab('Cancellation Policy')
		} else {
			setTab('Privacy Policy')
		}
		getUser();
	}, []);
	async function getUser() {

		//console.log({ ...data, ...user, addresses: addresses });
	}
	function setSelectedTab(tab: string) {
		let path = '/myaccount/policy';
		if (tab === 'Policy Details') {
			path = '/myaccount/policy';
		}
		if (tab === 'Account Info') {
			path = '/myaccount/account';
		}

		/* history.push({
			pathname: path,
			state: { selectedPage: tab },
		}); */
		setTab(tab);
	}
	/* if (loading) {
		return <Spinner size='3px' />;
	} */
	return (
		<Container>
			<Header
				showProfile

			/>
			<Title>Legal</Title>
			<DetailsContainer>
				<Tabs
					type='secondary'
					labels={TabLabels}
					onClick={setSelectedTab}
					selectedLabel={selectedTab}
				/>
			</DetailsContainer>
			 <TabDetails>
				{selectedTab === 'Privacy Policy' && (
					<Privacy />
				)}
				{selectedTab === 'Account Info' && <Privacy />}
			</TabDetails> 
		</Container>
	);
}
