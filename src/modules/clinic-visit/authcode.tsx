import React, { useState, useEffect } from 'react';
import {
	Container,
	DoctorInfoContainer,
	Specializations,
	SpecializationText,
	DoctorImg,
	InfoTextContainer,
	ImageContainer,
	Title,
	Label,
	Text,
	NoDataMessage,
} from './authcode-components';
import {
	ClinicCard,
	Specialization,
	Header,
	Icon,
	Image,
	PillText,
} from '@app/components';
import { appointmentDetails } from '@app/@services';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Spinner } from '@app/components/icon/icons';
import { useLocation } from '@app/utils';
export default function ClinicAuthCode() {
	const { navigate } = useLocation();
	const { appointmentId } = useParams<any>();
	const [page, setPage] = useState(1);
	const [spinner, setSpinner] = useState(true);
	const [appointmentData, setAppointmentData] = useState<any>({});
	const [showAllSpecialities, setShowAllSpecialities] = useState(false);

	useEffect(() => {
		getAppointmentDetails();
	}, [page]);
	const getAppointmentDetails = async () => {
		await appointmentDetails(appointmentId)
			.then((res: any) => {
				setAppointmentData(res.data);
			})
			.finally(() => {
				setSpinner(false);
			});
	};
	if (spinner) {
		return <Spinner size='3px' />;
	}
	//console.log(appointmentData)
	if (!appointmentData || !appointmentData.appointmentId) {
		return (
			<Container>
				<Header />
				<NoDataMessage>No data available</NoDataMessage>
			</Container>
		);
	}
	const {
		firstName,
		lastName,
		speciality,
		image,
		gender,
	} = appointmentData.doctorDetails;
	const { date, slot } = appointmentData.slot;
	const IsoDateTo = moment(date, 'DD-MM-YYYY').toDate();
	const IsoTimeTo = moment(slot.startTime, ['h:mm:ss A']).format('hh:mm A');
	const pageBack = () => {
        navigate('/files')
    }	
	return (
		<Container>
			<Header onClose={pageBack}  />

			<DoctorInfoContainer>
				<InfoTextContainer>
					<Title>
						{firstName} {lastName}
					</Title>
					{appointmentData
						&& appointmentData.appointmentProgressStatus
						&& (appointmentData.status !== 'CANCELLED' || appointmentData.status !== 'DECLINED')
						&& (
							<PillText>{appointmentData.appointmentProgressStatus ? appointmentData.appointmentProgressStatus.replace(/_/g, ' ') : ''} </PillText>
						)}
					<Specializations style={!showAllSpecialities ? { alignItems: 'center' } : {}}>
						{/* <Icon name='gastroenterologist' />
							str.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
						*/}
						<Specialization name={speciality} background={true} />
						<SpecializationText>
							{showAllSpecialities ? (
								speciality.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, ' ')
							) : speciality.split(',')[0]}

							{speciality.split(',').length > 1 && !showAllSpecialities ? (
								<span
									onClick={() =>
										setShowAllSpecialities(!showAllSpecialities)
									}>{`+ ${speciality.split(',').length - 1} more`}</span>
							) : (
								''
							)}
							<br />
							{speciality.split(',').length > 1 && showAllSpecialities ? (
								<span
									style={{ margin: 0 }}
									onClick={() =>
										setShowAllSpecialities(!showAllSpecialities)
									}>{`less`}</span>
							) : (
								''
							)}
						</SpecializationText>
					</Specializations>

					<Label>Appointment ID</Label>
					<Text>{appointmentData && appointmentData.svaasAppointmentId}</Text>
					<Label>Date & Time</Label>
					<Text>
						{moment(IsoDateTo).format('DD MMM')}, {IsoTimeTo}
					</Text>
				</InfoTextContainer>
				<ImageContainer>
					{/* <DoctorImg src={image} /> */}
					<Image gender={gender} url={image} />
				</ImageContainer>
			</DoctorInfoContainer>
			<div>
				<ClinicCard appointmentData={appointmentData} />
			</div>
		</Container>
	);
}
