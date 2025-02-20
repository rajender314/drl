import React from 'react';
import { Button, Icon, PillText, Image } from '@app/components';
import {
	DoctorCard,
	DoctorCardOuter,
	DoctorImg,
	DoctorDetails,
	DoctorName,
	Specialization,
	ScheduleDetails,
	ScheduleDate,
	Label,
	SessionCode,
	SessionInfoContainer,
	InfoText,
	AppointmentIdText,
	PrescriptionContainer,
	IconsContainer,
	Action,
	SessionContainer,
	Text,
	Anchor,
	AppointmentType,
} from './appointment-card-components';
import moment from 'moment';
import { useLocation } from '@app/utils';
import { Spinner } from '../icon/icons';
import { appointmentDetails } from '@app/@services';
import { useHistory } from 'react-router';


type Props = {
	appointment?: any;
	type?: any;
};
export default function HealthFileCard({ appointment, type = 'home' }: Props) {
	const { navigate } = useLocation();
	const [isExpand, setIsExpand] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [appDetails, setDetails] = React.useState<any>(null);
	const history = useHistory();

	function getSlotData() {
		const { date, slot } = appointment.slot;
		let todayDate = moment(new Date(), 'DD-MM-YYYY').toDate();
		const IsoDateTo = moment(date, 'DD-MM-YYYY').toDate();
		const IsoTimeTo = moment(slot.startTime, ['h:mm:ss A']).format('hh:mm A');
		if (todayDate === IsoDateTo) {
			return `Today, ${moment(IsoDateTo).format(
				'DD MMM YYYY'
			)} - ${IsoTimeTo}`;
		}
		return `${moment(IsoDateTo).format('DD MMM YYYY')} - ${IsoTimeTo}`;
	}
	const getDetail = async (id: any) => {
		if (
			type === 'home' &&
			appointment.status !== 'CANCELLED' &&
			appointment.status !== 'REJECTED' &&
			appointment.status !== 'DECLINED'
		) {
			if (!isExpand) {
				setLoading(true);
				setIsExpand(true);
				await appointmentDetails(id).then((res: any) => {
					setDetails(res.data);
				});
				setLoading(false);
			} else {
				setIsExpand(false);
			}
		}
	};
	const gotoDetail = (e: any) => {
		e.preventDefault();
		if (type === 'home') {
			navigate(`/files/appointments/${appointment.id}`);
		}
	};
	const getSpecialization = (name: any) => {
		if (name.includes(',')) {
			name = name.split(',');
			return name[0]
		} else {
			return name
		}
	}
	return (
		<DoctorCardOuter
			isExpand={isExpand}
			onClick={() => getDetail(appointment.id)}>
			{/* style={
				appointment.status === 'COMPLETED'
					? isExpand
						? { height: '233px' }
						: { height: '150px' }
					: {}
			} */}
			<DoctorCard status={appointment.status}>
				{appointment.appointmentType &&
					(appointment.appointmentType === 'IN_PERSON' ||
						appointment.appointmentType === 'InPerson' ||
						appointment.appointmentType === 'OnlineConsultation' ||
						appointment.appointmentType === 'VIDEO') ? (
					<AppointmentType
						status={appointment.status}
						type={appointment.appointmentType}>
						<Icon
							name={
								appointment.appointmentType === 'IN_PERSON' ||
									appointment.appointmentType === 'InPerson'
									? 'clinic'
									: 'video'
							}
						/>
					</AppointmentType>
				) : (
					''
				)}

				<DoctorImg>
					<Image
						url={appointment.doctorDetails.image}
						gender={appointment.doctorDetails.gender}
					/>
				</DoctorImg>
				<DoctorDetails>
					<DoctorName>
						{appointment.doctorDetails.firstName.toLowerCase().indexOf('dr') ===
							0
							? ''
							: 'Dr'}{' '}
						{appointment.doctorDetails.firstName +
							' ' +
							appointment.doctorDetails.lastName}
					</DoctorName>
					<Specialization>
						{getSpecialization(appointment.doctorDetails.speciality.split(',')[0])}
					</Specialization>
					{appointment.appointmentId && (
						<Specialization>{` Apt ID: ${appointment.svaasAppointmentId ? appointment.svaasAppointmentId : appointment.appointmentId}`}</Specialization>
					)}
					<ScheduleDetails className='m-5' status={appointment.status}>
						<Icon name='calendar' />
						<ScheduleDate>{getSlotData()}<br />{appointment.clinicDetails.name}</ScheduleDate>
					</ScheduleDetails>
					<PillText variant={appointment.status} className="mb-0">
						{(appointment.status === 'COMPLETED' ||
							appointment.status === 'ACCEPTED' ||
							appointment.status === 'CONFIRMED') && <Icon name='tick' />}{' '}
						{appointment.status === 'REJECTED'
							? 'Declined'
							: appointment.status === 'IN_PROGRESS'
								? 'In Progress'
								: appointment.status === 'ACCEPTED' ||
									appointment.status === 'CONFIRMED'
									? 'Confirmed'
									: appointment.status}
					</PillText>
				</DoctorDetails>
				{type === 'home' && (
					<Text onClick={(e) => gotoDetail(e)} status={appointment.status}>
						Details {'>'}
					</Text>
				)}
			</DoctorCard>
			{type &&
				type === 'home' &&
				appointment.status !== 'COMPLETED' &&
				isExpand && (
					<SessionContainer>
						{loading ? (
							<Spinner size='3px' />
						) : (
							<>
								<SessionInfoContainer>
									{appointment.status !== 'CANCELLED'
										&& appointment.status !== 'REJECTED'
										&& appointment.status !== 'DECLINED'
										&& (
											<>
												{' '}
												<div
													style={
														appDetails.webLink
															? { width: 'calc(100% - 120px)' }
															: { width: '100%' }
													}>
													<Label>Authentication Code</Label>
													{(appDetails.isPaymentDone || (appDetails.costBreakdown && appDetails.costBreakdown.costToYou == 0)) &&
														(appDetails.status === 'ACCEPTED' ||
															appDetails.status === 'CONFIRMED') ? (
														<>
															{appDetails.authCode ? (
																<SessionCode status={appDetails.status}>
																	{appDetails.authCode}
																</SessionCode>
															) : (
																!appDetails.appointmentProgressStatus && (
																	<SessionCode className='c-gray'></SessionCode>
																)
															)}
														</>
													) : (
														<SessionCode className='c-gray'>{!appDetails.authCode ? '' : null}</SessionCode>
													)}

													{appDetails && appDetails.status === 'PENDING' ? (
														<>
															<SessionCode className={appDetails.authCode ? '' : 'c-gray'} status={appDetails.status}>
																{appDetails.authCode ? appDetails.authCode : null}
															</SessionCode>
															<InfoText style={{ padding: 0 }}>
																<Icon name='info' /> To be shared once doctor confirms the appointment
														</InfoText>
														</>
													) :
														(!appDetails.authCode ||
															(!appDetails.isPaymentDone && (appDetails.costBreakdown && appDetails.costBreakdown.costToYou > 0)) ||
															appDetails.status === 'IN_PROGRESS') ? (
															<>
																{appDetails.status === 'ACCEPTED' ||
																	appointment.status === 'CONFIRMED' ? (
																	<InfoText style={{ padding: 0 }}>
																		<Icon name='info' /> To be shared once payment
																		is successfully completed
																	</InfoText>
																) : appDetails.status === 'IN_PROGRESS' ? (
																	<>
																		<SessionCode className={'c-gray'} status={appDetails.status}>
																			{appDetails.authCode}
																		</SessionCode>
																		<InfoText style={{ padding: 0 }}>
																			<Icon name='info' /> Authentication code is valid till the appointment is complete
															</InfoText>
																	</>
																) : (
																	''
																)}
															</>
														) : null}
												</div>
												{appDetails.appointmentType != 'IN_PERSON' && appDetails.status !== 'COMPLETED' && appDetails.status !== 'IN_PROGRESS' ? <>{appDetails.webLink ? (
													<Button
														variant={
															appDetails.authCode ? 'primary' : 'disabled'
														}
														size='large'>
														<Anchor
															target='_blank'
															href={appDetails.webLink}
															onClick={(e) => {
																e.stopPropagation();
															}}>
															Join
														</Anchor>
													</Button>
												) : appDetails.isPaymentDone && appDetails.appointmentType === "VIDEO" && !appDetails.isWebLinkConfigured ? (
													<Button
														variant={'disabled'}
														size='large'>
														<Anchor
															onClick={(e) => {
																e.stopPropagation();
															}}>
															Join
														</Anchor>
													</Button>
												) : null}
												</> : null}
											</>
										)}
									{/* {appointment.status !== 'ACCEPTED' &&
										appointment.status !== 'CONFIRMED' &&
										appointment.status !== 'IN_PROGRESS' &&
										appointment.status !== 'PENDING' && (
											<div>
												{!appDetails.webLink && (
													<>
														<Label>Appointment ID</Label>
														<AppointmentIdText
															style={
																appointment.status !== 'CANCELLED' &&
																appointment.status !== 'REJECTED' &&
																appointment.status !== 'DECLINED' &&
																appointment.status !== 'PENDING'
																	? {}
																	: { textAlign: 'left' }
															}>
															{appDetails.appointmentId}
														</AppointmentIdText>
													</>
												)}
											</div>
										)} */}
									{appDetails.authCode &&
										(appDetails.isPaymentDone || (appDetails.costBreakdown && appDetails.costBreakdown.costToYou == 0)) &&
										appointment.status !== 'CANCELLED' &&
										appointment.status !== 'REJECTED' &&
										appointment.status !== 'PENDING' &&
										appointment.status !== 'DECLINED' &&
										appointment.status !== 'IN_PROGRESS' && (
											<InfoText>
												<Icon name='info' />Share authentication code to start consultation
											</InfoText>
										)}
								</SessionInfoContainer>
							</>
						)}
					</SessionContainer>
				)}
			{appointment.status === 'COMPLETED' && isExpand && (
				<SessionContainer>
					{loading ? (
						<Spinner size='3px' />
					) : (
						<PrescriptionContainer isErxGen={appointment.erxGenerated}>
							{appointment.erxGenerated ? (
								<IconsContainer>
									<Action
										disabled={!appDetails.erxGenerated}
										onClick={() =>
											history.push({
												pathname: `/files/appointments/${appointment.id}/invoice`,
												state: {
													invoiceDetails: {},
												},
											})

										}>
										<Icon name='rupee' />
										<p style={{ marginBottom: '0' }}>Invoice</p>
									</Action>
									<Action
										disabled={!appDetails.erxGenerated}
										isPrescriptionIcon
										onClick={() =>
											navigate(
												`/files/prescription/${appointment.prescriptionId}`
											)
										}>
										<Icon name='prescription' />
										<p style={{ marginBottom: '0' }}>
											Prescription
										</p>
									</Action>
									{/* <Action>
										<Icon name='notes' />
										<p>Notes</p>
									</Action> */}
								</IconsContainer>
							) : (
								<Button variant='warm' width='100%'>
									Prescription Pending
								</Button>
							)}
						</PrescriptionContainer>
					)}
				</SessionContainer>
			)}
		</DoctorCardOuter>
	);
}
