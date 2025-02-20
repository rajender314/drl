import React, { useState, useEffect } from 'react';
import { HrDatePicker, ProgressBar } from '@app/@lib';
import {
	Container,
	DoctorInfoContainer,
	InfoTextContainer,
	Title,
	LabCard,
	RescheduleContainer,
	CancelTitle,
	RescheduleCard,
	SlotsDetails,
	Detail,
	Label,
	LabVisitContainer,
	NoDataMessage,
} from './reschedule-components';
import { Icon, Button, Header } from '@app/components';
import {
	appointmentDetails,
	getAppointmentSlots,
	getLabVisits,
	rescheduleApi,
} from '@app/@services';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useLocation } from '@app/utils';
import { Spinner } from '@app/components/icon/icons';

export default function Reschedule() {
	const { navigate } = useLocation();
	const day = moment(new Date()).format('DD/MM/YYYY');
	const { appointmentId, orderId } = useParams<any>();
	const [page, setPage] = useState(1);
	const [timeSlot, setTimeSlot] = useState<any>({});
	const [timeSlotIndex, setTimeSlotIndex] = useState(-1);
	const [slots, setSlots] = useState<any>([]);
	const [selectedDay, setSelectedDay] = useState(day);
	const [labVisits, setLabVisits] = useState([]);
	const [spinner, setSpinner] = useState(true);
	const [slotSpinner, setSlotSpinner] = useState(true);
	const [appointmentData, setAppointmentData] = useState<any>({});
	useEffect(() => {
		if (appointmentId) {
			getAppointmentDetails();
		}
		
	}, [page]);
	useEffect(() => { }, [slots]);

	const updateTimeSlot = (item: any, i: any) => {
		if (item.status === 'available') {
			setTimeSlotIndex(i);
			setTimeSlot(item);
		}
	};
	const getAppointmentDetails = async () => {
		await appointmentDetails(appointmentId).then((res: any) => {
			getUserLabVisits();
			getSlots(res.data, selectedDay);
			setAppointmentData(res.data);
		});
	};

	const getUserLabVisits = async () => {
		await getLabVisits().then((res: any) => {
			let data = res.data
			//console.log(data)
			let arr: any = [];
			data.labVisit.map((lab: any) => {
				let obj = {
					label: lab.labName,
					subtitle: lab.date,
					name: lab.labName,
					content: '',
				};
				arr.push(obj);
				return lab;
			});
			let obj = {
				label: '',
				subtitle: '',
				name: '',
				content: '',
			};
			arr.push(obj);
			setLabVisits(arr);
		});

		setSpinner(false);
	};
	const getSlots = async (data: any, date: any) => {
		//console.log("getSlots")
		setSlotSpinner(true);
		let params = {
			clinicId: data.clinicDetails.id,
			doctorId: data.doctorDetails.id,
			fromDate: date,
			toDate: date,
			appointmentType: data.appointmentType,
		};
		await getAppointmentSlots(params).then((res: any) => {
			let data = res.data;
			//console.log("getAppointmentSlots", data)
			setSlots(data[0].slots);
			setSlotSpinner(false);
		});
	};
	if (spinner) {
		return <Spinner size='3px' />;
	}
	if (!appointmentData || !appointmentData.appointmentId) {
		return (
			<Container>
				<Header />
				<NoDataMessage>No data available</NoDataMessage>
			</Container>
		);
	}
	const updateDate = (date: any) => {
		let selected = moment(date).format('DD/MM/YYYY');
		setSelectedDay(selected);
		//console.log("updateDate::", selected)
		if (!spinner) {
			//console.log(13)
			getSlots(appointmentData, selected);
		}
	};
	const reschedule = async () => {
		//console.log("onSubmit")
		let params = {
			appointmentId: appointmentData.id,
			date: selectedDay,
			slot: timeSlot,
		};
		if (selectedDay && timeSlot && timeSlot.startTime) {
			await rescheduleApi(params, sessionStorage.getItem('patientId'))
				.then((res: any) => {
					if (res.status === 200) {
						navigate(`/files/appointments`);
					}
				})
				.catch((error) => {
					//alert(JSON.stringify(error));
				});
		}
	};

	return (
		<Container>
			<Header />
			<DoctorInfoContainer>
				<InfoTextContainer>
					<Title>Reschedule</Title>
				</InfoTextContainer>
			</DoctorInfoContainer>
			<LabCard>
				<LabVisitContainer>
					<CancelTitle>LAB VISIT</CancelTitle>
					<ProgressBar
						startingStep={labVisits.length - 1}
						onSubmit={() => { }}
						steps={labVisits}
					/>
				</LabVisitContainer>
			</LabCard>
			<RescheduleCard>
				<RescheduleContainer>
					<CancelTitle>Pick Date</CancelTitle>

					<HrDatePicker getSelectedDay={updateDate} color={'#374e8c'} />
					<CancelTitle>Pick Time</CancelTitle>
					{slotSpinner ? (
						<div>loading...</div>
					) : (
						<SlotsDetails>
							{slots &&
								slots.map((item: any, i: any) => {
									return (
										<Detail
											key={i}
											type={i === timeSlotIndex ? 'active' : item.status}
											onClick={() => updateTimeSlot(item, i)}>
											<Label>
												{moment(item.startTime, ['HH: mm']).format('h: mm A')}
											</Label>
										</Detail>
									);
								})}
						</SlotsDetails>
					)}
					<Button onClick={() => reschedule()} variant='primary'>
						<Icon name='addDate' />
						Confirm on
						{` ${selectedDay
							? moment(selectedDay, ['DD/MM/YYYY']).format('D MMM')
							: ''
							}`}
						{` ${timeSlot && timeSlot.startTime
							? moment(timeSlot.startTime, ['HH: mm']).format('h: mm A')
							: ''
							}`}
					</Button>
				</RescheduleContainer>
			</RescheduleCard>
		</Container>
	);
}
