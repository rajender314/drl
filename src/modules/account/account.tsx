import { getUserInfo, getUserInfoPwa } from '@app/@services';
import { getUserAddressess, getUserDetail } from '@app/@services/user/user';
import { Header } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import Tabs from '@app/components/tabs';
import React from 'react';
import { useHistory } from 'react-router';
import {
	Container,
	DetailsContainer,
	TabDetails,
	Title,
} from './account-components';
import AccountInfo from './account-info';
import PolicyDetails from './policy-details';
import { useGlobalContext } from '@app/contexts';
const TabLabels = ['Policy Details', 'Account Info'];

export default function Account() {
	const history = useHistory();
	const { userInfo } = useGlobalContext();
	const [loading, setLoading] = React.useState(true);
	const [userInfoData, setUserInfo] = React.useState<any>();
	const { location } = history;
	const { state }: any = location;
	const { selectedPage } = state || { selectedPage: '' };
	const [selectedTab, setTab] = React.useState(selectedPage || TabLabels[0]);

	React.useEffect(() => {
		let str = window.location.pathname;
		let strArr = str.split('/');
		if (strArr.includes("policy")) {
			setTab('Policy Details')
		} else if (strArr.includes("account")) {
			setTab('Account Info')
		} else {
			setTab('Policy Details')
		}
		getUser();
	}, []);
	async function getUser() {
		const data = await getUserInfoPwa(userInfo.patientId).then((res)=>{
			setUserInfo({ ...userInfo, ...res.data });
		});
		
		setLoading(false);
		
	}
	function setSelectedTab(tab: string) {
		let path = '/myaccount/policy';
		if (tab === 'Policy Details') {
			path = '/myaccount/policy';
		}
		if (tab === 'Account Info') {
			path = '/myaccount/account';
		}

		history.push({
			pathname: path,
			state: { selectedPage: tab },
		});
		setTab(tab);
	}
	if (loading) {
		return <Spinner size='3px' />;
	}
	return (
		<Container>
			<Header
				showProfile
				profileImage={userInfoData.profileImage}
				userData={userInfoData}
			/>
			<Title>My Account</Title>
			<DetailsContainer>
				<Tabs
					type='secondary'
					labels={TabLabels}
					onClick={setSelectedTab}
					selectedLabel={selectedTab}
				/>
			</DetailsContainer>
			<TabDetails>
				{selectedTab === 'Policy Details' && (
					<PolicyDetails />
				)}
				{selectedTab === 'Account Info' && <AccountInfo userInfo={userInfoData} />}
			</TabDetails>
		</Container>
	);
}
