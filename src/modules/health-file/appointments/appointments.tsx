import { getAppointments, appointmentFilters } from '@app/@services';
import { getUserDetail } from '@app/@services/user/user';
import {
	HealthFileCard,
	Select,
	DoctorCardLoader,
	CodeLoader,
	Button,
	Icon,
} from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import { getArray } from '@app/utils'
import React, { useEffect } from 'react';
import {
	FilterContainer,
	FilterLabel,
	NoDataMessage,
} from '../healthfile-components';
import {
	AppointmentsContainer,
	DoctorInfoContainer,
} from './appointments-components';

type Props = {
	user: any;
};
export default function Appointments({ user }: Props) {
	const [filters, setFilters] = React.useState([]);
	const [appointments, setAppointments] = React.useState([]);
	const [selectedFilter, setSelectedFilter] = React.useState(null);
	const [onFilter, updateOnFilter] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const appointmentsLoadData = getArray(24);
	const [svssUserId, setSvssUserId] = React.useState();
	const [currPage, setCurrPage] = React.useState(0);
	const [flag, setFlag] = React.useState(false);
	const [callInProg,setCallProg] = React.useState(true);
	React.useEffect(() => {
		(async () => {
			await appointmentFilters().then((res: any) => {
				if (res.status === 200) {

					const filterOptions = res.data.sortList.map((item: any) => {
						return {
							label: item.sortCode === 'REJECTED' ? 'Declined' : item.name,
							value: item.sortCode,
						};
					});
					setFilters(filterOptions);
					setSelectedFilter(filterOptions[0]);
				}
			});

			let userDetails = sessionStorage.getItem('user');
			let user: any = null;
			if (userDetails) {
				user = JSON.parse(userDetails);
				setSvssUserId(user.patientId);
			} else {
				await getUserDetail().then((res: any) => {
					user = res.data
					setSvssUserId(res.data.patientId);
				});
			}


		})();
	}, []);
	useEffect(() => {
		setCallProg(true);
		getAppointmentList(svssUserId, selectedFilter);
	}, [currPage])
	async function getAppointmentList(userId: any, filter: any) {
		let userDetails = sessionStorage.getItem('user');
		let user: any = null;
		if (userDetails) {
			user = JSON.parse(userDetails);
			setSvssUserId(user.patientId);
		} else {
			await getUserDetail().then((res: any) => {
				user = res.data
				setSvssUserId(res.data.patientId);
			});
		} await getAppointments({
			svssUserId: userId ? userId : user ? user.patientId : '',
			status: 'ALL',
			filterBy: filter ? filter.value : '',
			docId: '',
			pageNo: currPage,
		}).then((res: any) => {
			if (res.data.length < 10 || !res.data.length || res.status != 200) {
				setFlag(false);
			}
			else {
				setFlag(true);
			}
			if (res && res.status && res.status === 200) {
				let appData =[]
				if(currPage == 0){
					appData = res.data;
				}else{
					appData =[...appointments,...res.data]
				}
				setAppointments(appData);
			}

		}).finally(() => {
			setCallProg(false);
			updateOnFilter(false);
			setLoading(false);
			// setLoading(false);
		}).catch((error) => {
			console.log(error)
		});
	}
	async function OnFilterChange(e: any) {
		setLoading(true);
		setSelectedFilter(e);
		setAppointments([]);
		setCurrPage(0);
		getAppointmentList(svssUserId, e);
		// await getAppointments({ svssUserId: svssUserId, filterBy: e.value }).then((res: any) => {
		// 	if (res && res.status && res.status === 200) {
		// 		setAppointments(res.data);
		// 	}
		// }).finally(() => {
		// 	updateOnFilter(false);
		// 	setLoading(false);
		// });

	}
	return (

		<>
			<FilterContainer>

				<FilterLabel>Filter by</FilterLabel>
				<Select
					options={filters}
					value={selectedFilter}
					onChange={(e: any) => OnFilterChange(e)}
				/>
			</FilterContainer>
			{onFilter ? (
				<Spinner size='3px' />
			) : (
				<DoctorInfoContainer>

					<AppointmentsContainer>
						{loading &&
							appointmentsLoadData.map((item: any) => {
								return (
									<DoctorCardLoader key={item} />
								)
							})
						}
						{appointments && appointments.length && !loading ? (
							appointments.map((appointment: any) => (
								<>
									<HealthFileCard
										key={appointment.id}
										appointment={appointment}
									/>
								</>
							)
							)

						) : !loading && (
							<NoDataMessage style={{ height: 'auto' }}>No appointments available</NoDataMessage>
						)}
				{flag && callInProg && <p> <Icon name='loading' /></p>}
						{flag &&  <Button  variant={callInProg ? 'disabled' : 'secondary'} onClick={() => {
							if(callInProg){return}setCurrPage(currPage + 1)}}>View more</Button>}
						
					</AppointmentsContainer>
				</DoctorInfoContainer>
			)}
		</>
	);
}
