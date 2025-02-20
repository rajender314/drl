import { getHealthFileData } from '@app/@services';
import { getUserDetail } from '@app/@services/user/user';
import { Header, Tabs } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import React from 'react';
import { useHistory } from 'react-router';
import Appointments from './appointments';
import {
	Container,
	DetailsContainer,
	TabDetails,
	Title,
} from './healthfile-components';
import LabReports from './lab-reports';
import Prescriptions from './prescriptions';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";

export default function HealthFile() {
	const history = useHistory();
	const { location } = history;
	const { state }: any = location;
	const { selectedTab } = state || { selectedTab: '' };
	const labels = ['Appointments', 'Prescriptions', 'Lab Reports'];
	const [selectedLabel, setSelectedTab] = React.useState(labels[0]);
	const [loading, setLoading] = React.useState(true);
	const [allAppointments, setAppointments] = React.useState([]);
	const [allPrescriptions, setPrescriptions] = React.useState([]);
	const [allLabReports, setLabReports] = React.useState([]);
	const [profilePic, setProfilePic] = React.useState("");
	const [userInfo, setUserInfo] = React.useState<any>(null)
	let { path, url } = useRouteMatch();
	React.useEffect(() => {
		let str = window.location.pathname;
		let strArr = str.split('/');
		if (strArr.includes("appointments")) {
			setSelectedTab('Appointments')
		} else if (strArr.includes("prescriptions")) {
			setSelectedTab('Prescriptions')
		} else if (strArr.includes("labreports")) {
			setSelectedTab('Lab Reports')
		} else if (selectedTab && selectedTab !== selectedLabel) {
			setSelectedTab(selectedTab);
		} else {
			setSelectedTab('Appointments')
		}
		getHealthData();
	}, []);
	async function getHealthData() {
		let userDetails = sessionStorage.getItem('user');
		let user: any = null;
		if (userDetails) {
			user = JSON.parse(userDetails);
			setUserInfo(user);
		} else {
			user = await getUserDetail().then((res) => {
				if (res && res.status && res.status === 200) {
					setUserInfo(user.data);
				}
			})
		}
		getHealthFileData({ patientId: user ? user.patientId : '' }).then((res: any) => {
			if (res.status === 200) {
				const { appointments = [], prescriptions = [], labReports = [], userProfileImage = "" } = res.data;
				setAppointments(appointments);
				setLabReports(labReports);
				setPrescriptions(prescriptions);
				setProfilePic(userProfileImage)
				setLoading(false);
			}
		}).catch((err) => {
			setLoading(false);
		}).finally(() => {
			setLoading(false);
		});
	}
	function setTab(tab: string) {
		let path = '/files/appointments';
		if (tab === 'Appointments') {
			path = '/files/appointments';
		}
		if (tab === 'Prescriptions') {
			path = '/files/prescriptions';
		}
		if (tab === 'Lab Reports') {
			path = '/files/labreports';
		}
		if (selectedTab && selectedTab !== selectedLabel) {
			setSelectedTab(selectedTab);
		}
		history.push({
			pathname: path,
			state: { selectedTab: tab },
		});
		setSelectedTab(tab);
	}

	return (
		<Container>
			{/* <ul>
				<li>
					<Link to={`${url}/rendering`}>Rendering with React</Link>
				</li>
				<li>
					<Link to={`${url}/components`}>Components</Link>
				</li>
				<li>
					<Link to={`${url}/props-v-state`}>Props v. State</Link>
				</li>
			</ul> */}


			<Header showProfile profileImage={profilePic} />
			<Title>Health File</Title>
			<DetailsContainer>
				<Tabs
					selectedLabel={selectedLabel}
					onClick={(e: any) => setTab(e)}
					labels={labels}
				/>
				<TabDetails>
					{selectedLabel === 'Appointments' && <Appointments user={userInfo} />}
					{selectedLabel === 'Prescriptions' && <Prescriptions prescriptions={allPrescriptions} loading={loading} />}
					{selectedLabel === 'Lab Reports' && <LabReports labReports={allLabReports} loading={loading} />}
				</TabDetails>
				{/* <Switch>
					<Route exact path={path}>
						<Appointments user={userInfo} />
					</Route>
					<Route exact path={path}>
						<Prescriptions prescriptions={allPrescriptions} loading={loading} />
					</Route>
					<Route path={`${path}`}>
						<LabReports labReports={allLabReports} loading={loading} />
					</Route>
				</Switch> */}
			</DetailsContainer>
		</Container>
	);
}
