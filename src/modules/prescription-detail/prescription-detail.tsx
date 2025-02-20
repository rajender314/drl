import { getPrescriptionDetails } from '@app/@services/';
import { Button, Specialization, Header, Icon, PillText, Tabs, Dialog } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router';
import { NoDataMessage } from '../health-file/healthfile-components';
import Diagnostics from './diagnostics';
import Report from './lab-reports';
import Medication from './medication';
import { isMobile } from 'react-device-detect';
import {
	Container,
	Detail,
	DocName,
	Label,
	PatientDetails,
	Text,
	Title,
	DetailsContainer,
	TabDetails,
	ButtonContainer,
	ActiveDot,
	Row,
} from './prescription-detail-component';
import { Header as PdfHeader } from './lab-reports/lab-report-components';
import { downloadPDF, directDownload, wwwCorseIssue } from '@app/utils';
import PdfReport from './lab-reports';
import { primaryRed } from '@app/styles';
import { SuccessContainer, SuccessTitle, SuccessSubTitle } from '../cancel-appointment/cancel-components';

export default function PrescriptionDetail() {
	const Labels = ['Medication', 'Diagnostics'];
	const [selectedLabel, setSelectedLabel] = React.useState(Labels[0]);
	const [showPdf, togglePdf] = React.useState(false);
	const { prescriptionId }: any = useParams();
	const [loading, setLoading] = React.useState(true);
	const [prescriptionData, setPrescriptionData] = React.useState<any>(null);
	const [onPdfError, setPdfError] = React.useState(true);
	const [CIOC, SetCIOC] = React.useState<any>();
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	React.useEffect(() => {
		getPrescriptionInfo();
		window.scrollTo(0, 0);
	}, []);
	async function getPrescriptionInfo() {
		await getPrescriptionDetails({ id: prescriptionId }).then((res: any) => {
			if (res.status === 200) {
				setPrescriptionData(res.data);
			}
		}).finally(() => {
			setLoading(false);
		})
	}
	function download(url: string, filename: string) {
		downloadPDF(url, filename).then((res) => {
			//console.log(res)
		})
		return;
		const access_token = localStorage.getItem('access_token');
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `bearer ${access_token}`,
			},
		}).then(function (t) {
			return t.blob().then((b) => {
				var a = document.createElement('a');
				a.href = URL.createObjectURL(b);
				a.setAttribute('download', filename);
				a.click();
			});
		});
	}
	const cartOperation = (code: any) => {
		SetCIOC(code);
		setTimeout(() => { SetCIOC('') }, 100)
	}
	if (loading) return <Spinner size='3px' />;
	return (
		<Container>
			<Header CIOC={CIOC} />
			{prescriptionData ?
				
				(
			<>
			{
						isDialogOpen ? (
							<Dialog classN="c-dialog" fullScreen={false} title={''}>
								<Dialog.Body style={{ background: primaryRed }}>
									<SuccessContainer>
										{/* <SuccessTick><Icon name='tick' /></SuccessTick> */}
										<SuccessTitle><Icon name='successTick' /></SuccessTitle>
										{/* <SuccessSubTitle></SuccessSubTitle> */}
									</SuccessContainer>
								</Dialog.Body>
								<Dialog.Footer>
									<SuccessSubTitle style={{ justifyContent: "center" }}>Invoice Successfully Downloaded</SuccessSubTitle>
									<Button variant="primary" onClick={() => setIsDialogOpen(false)}>Ok</Button>
								</Dialog.Footer>
							</Dialog>
						) : null
					}
				<Row className="align-center">
					<Title>Prescription</Title>
					<PillText variant='defaultAccepted'>
						<ActiveDot />
						Active
					</PillText>
				</Row>
				<DocName>
					{/* <Icon
							name={
								prescriptionData.doctorDetails.specialization ||
								'gastroenterologist'
							}
						/> */}
					{/* <Icon name='gastroenterologist' /> */}
					<Specialization name={prescriptionData.doctorDetails.specialization} background={true} />
					By Dr.{' '}
					{prescriptionData.doctorDetails.firstName +
						' ' +
						prescriptionData.doctorDetails.lastName}
				</DocName>
				<PatientDetails>
					<Row className="p-0">
						<Detail>
							<Label>Patient Name</Label>
							<Text>
								{prescriptionData.patientDetails.firstName +
									' ' +
									prescriptionData.patientDetails.lastName}
							</Text>
						</Detail>
						<Detail style={{ width: '100%' }}>
							{prescriptionData.svassAppointmentId && (
								<>
									<Label>Appointment ID</Label>
									<Text>{prescriptionData.svassAppointmentId}</Text>
								</>
							)}
						</Detail>
					</Row>
					<Row className="p-0">
						<Detail style={{ width: '100%' }}>
							<Label>eRX ID</Label>
							<Text>{prescriptionData.erxId}</Text>
						</Detail>
						{/* <Detail>
								<Label>Date of Expiry</Label>
								<Text>
									{moment(
										moment(prescriptionData.erxValidity, 'DD-MM-YYYY').toDate()
									).format('DD MMM, YYYY')}
								</Text>
							</Detail> */}
					</Row>
				</PatientDetails>
				<DetailsContainer>
					{showPdf ? (
						<>
							<PdfHeader>Prescription</PdfHeader>
							<PdfReport pdfLink={prescriptionData.prescriptionPdfLink
								? prescriptionData.prescriptionPdfLink
								: ''} />
							{/* <Report
									onError={setPdfError}
									errorMsg={'Failed to load '}
									pdfLink={
										prescriptionData.prescriptionPdfLink
											? prescriptionData.prescriptionPdfLink
											: ''
									}
								/> */}
						</>
					) : (
						<>
							<Tabs
								labels={Labels}
								onClick={(e: any) => setSelectedLabel(e)}
								selectedLabel={selectedLabel}
							/>
							<TabDetails>
								{selectedLabel === 'Medication' && (
									<Medication
										Medicines={prescriptionData.medicineList}
										prescriptionData={prescriptionData}
										cartOperation={cartOperation}
									/>
								)}
								{selectedLabel === 'Diagnostics' && (
									<Diagnostics Tests={prescriptionData.labTestList} />
								)}
							</TabDetails>
						</>
					)}
					{((prescriptionData.medicineList.length > 0 &&
						selectedLabel === 'Medication') ||
						(prescriptionData.labTestList.length > 0 &&
							selectedLabel === 'Diagnostics')) && (
							<ButtonContainer>
								{showPdf ? (
									<>
										{/* variant={onPdfError ? 'disabled' : 'primary'} */}
										<Button
											width='100%'
											variant='primary'
											size='large'
											onClick={() => {
												// if (onPdfError) {
												// 	return
												// }
												// download(prescriptionData.prescriptionPdfLink, 'report')
												directDownload(prescriptionData.prescriptionPdfLink, 'prescription.pdf')
												setTimeout(() => {
													setIsDialogOpen(true);
												}, 1000);

											}
											}>
											Download PDF
											{/* 'http://52.172.172.93:8888/uploaded_files/pdf-PDF-Invoice1.pdf' */}
										</Button>
										<Button
											width='100%'
											variant='secondary'
											size='large'
											onClick={() => {
												window.scrollTo(0, 0);
												togglePdf(false);
											}}>
											View Digital Prescription
										</Button>
									</>
								) : (
									<>
										<Button
											width='100%'
											variant={
												prescriptionData.hcDetail &&
													prescriptionData.hcDetail.patientPhoneNumber && isMobile
													? 'primary'
													: 'disabled'
											}
											size='large'>
											<Icon name='caller' />
											<a className="adjst c-h-c" style={isMobile ? {} : { pointerEvents: 'none' }}
												href={`tel:${prescriptionData.hcDetail.hcPhoneNumber ? prescriptionData.hcDetail.hcPhoneNumber : prescriptionData.hcDetail.patientPhoneNumber}`}>
												Call Health Coach
											</a>
										</Button>
										<Button
											width='100%'
											variant={
												prescriptionData.prescriptionPdfLink
													? 'secondary'
													: 'disabled'
											}
											size='large'
											onClick={() => {

												if (!prescriptionData.prescriptionPdfLink) {
													return
												}
												togglePdf(true);
												window.scrollTo(0, 0);
											}}>

											View Prescription PDF
										</Button>
									</>
								)}
							</ButtonContainer>
						)}
				</DetailsContainer>
			</>
			) : (
			<NoDataMessage>Prescription not found</NoDataMessage>
			)}
		</Container>
	);
}
