import React, { } from 'react';
import { Button, Dialog, Header, Icon, PillText } from '@app/components';
import { useParams } from "react-router-dom";
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { directDownload, downloadPDF } from '@app/utils'
import {
	Container,
	Detail,
	LabName,
	Label,
	ReportDetails,
	Text,
	Title,
	DetailsContainer,
	ButtonContainer,
	PdfContainer,
	BlankPdf,
	ReportTitle,
	Row,
} from './report-detail-components';
import { useLocation } from '@app/utils'
import { getReportDetailApi } from '@app/@services'
import { getDate } from 'date-fns';
import PdfReport from '@app/modules/prescription-detail/lab-reports';
import { ErrorContainer, ErrorText, SuccessContainer, SuccessTitle, SuccessTick, SuccessSubTitle } from '@app/modules/cancel-appointment/cancel-components';
import { primaryColor, primaryRed } from '@app/styles';

export default function PrescriptionDetail() {

	const { navigate } = useLocation()
	const { reportId } = useParams<any>()
	const [numPages, setNumPages] = React.useState(null);
	const [reportData, setReportData] = React.useState<any>({});
	const history = useHistory();
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const onDocumentLoadSuccess = ({ numPages }: any) => {
		setNumPages(numPages);
	}
	React.useEffect(() => {
		getData()
	}, []);
	const getData = async () => {
		let params = {
			reportID: reportId,
			 patientId: sessionStorage.getItem('patientId'),
			// svaasUserId: sessionStorage.getItem('patientId') 
		}
		await getReportDetailApi(params).then((res: any) => {
			if (res.status === 200) {
				setReportData(res.data)
			}
			//console.log(res)
		})
	}
	const downloadPDFApi = (url: string, filename: string) => {
		directDownload(url, 'report.pdf');
		setTimeout(() => {
			setIsDialogOpen(true);
		}, 1000);
		// downloadPDF(url, filename).then((res) => {
		// 	console.log(res)
		// })
	}
	const getDate = (report: any) => {
		const IsoDateTo = moment(report.reportDate).toDate();
		const IsoTimeTo = moment(report.reportTime, ["h:mm:ss A"]).format('hh:mm A');
		return <Text>{moment(IsoDateTo).format('DD MMM YYYY')}, {IsoTimeTo}</Text>
	}
	return (
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
							<SuccessSubTitle style={{ justifyContent: "center" }}>Report Successfully Downloaded</SuccessSubTitle>
							<Button variant="primary" onClick={() => setIsDialogOpen(false)}>Ok</Button>
						</Dialog.Footer>
					</Dialog>
				) : null
			}
			<Container>

				<Header />
				<Row className="align-center">
					<Title>Lab Report</Title>
					<PillText variant={reportData.status}>
						{reportData.status == 'COMPLETED' ? <Icon name='tick' /> : null}
						{' '}{reportData.status}</PillText>
				</Row>
				<LabName>
					{reportData.labName}
				</LabName>
				<ReportDetails>
					<Detail>
						<Label>Report Date</Label>
						{getDate(reportData)}

					</Detail>
					<Detail>
						<Label>Report ID</Label>
						<Text>{reportData.reportID}</Text>
					</Detail>
					{reportData.prescriptionERxID && <Detail>
						<Label>Prescription ERx</Label>
						<Text>{reportData.prescriptionERxID}</Text>
					</Detail>}

				</ReportDetails>
				<DetailsContainer>
					<PdfContainer>
						<ReportTitle>Report Details</ReportTitle>
						{reportData.reportURL && reportData.reportURL ? (
							// <Document
							// 	file={reportData.reportURL}
							// 	onLoadSuccess={onDocumentLoadSuccess}>
							// 	{Array.from(new Array(numPages), (el, index) => (
							// 		<Page key={`page_${index + 1}`} pageNumber={index + 1} />
							// 	))}
							// </Document>
							<PdfReport pdfLink={reportData.reportURL} />
						) : (

							<BlankPdf>
								<Text>This report is still in-progress</Text>
							</BlankPdf>
						)}
					</PdfContainer>
					<ButtonContainer>
						{reportData.orderId ? <Button variant='primary' onClick={() => (
							history.push({
								pathname: `/orders/${reportData.orderId}`,
								state: { selectedTab: 'lab' },
							})
						)}>
							Track Order
					</Button> : <Button variant='disabled' >
							Track Order
					</Button>}
						{reportData.reportURL ? (

							<Button variant='primary' onClick={() =>
								downloadPDFApi(
									reportData.reportURL,
									'report'
								)} >
								Download
							</Button>
						) : null}

						{reportData.orderId ? <Button variant={`primary`} onClick={() => (
							history.push({
								pathname: `/order-invoice/${reportData.orderId}`,
								state: {
									invoiceDetails: {},
								},
							})
						)} >
							View Invoice
					</Button> : <Button variant={`disabled`} >
							View Invoice
					</Button>}
					</ButtonContainer>
				</DetailsContainer>
			</Container>
		</>
	);
}
