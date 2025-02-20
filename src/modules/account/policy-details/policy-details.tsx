import { Button, Icon, Dialog, ViewPdf } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import React, { useEffect, useState } from 'react';
import {
	CardTitle,
	Data,
	PdfLink,
	PolicyCard,
	PolicyInner,
	PriceInfo,
	Title,
	LabelText,
	UpdateClaim,
	NoDataMessage
} from './policy-details-components';
import { claimDetails, getCoverageList } from '@app/@services'
import { useGlobalContext } from '@app/contexts';
import DoctorConsultation from './doctor-consultation'
import { useLocation,downloadPDF,directDownloadAs } from '@app/utils';
import PdfReport from '@app/modules/prescription-detail/lab-reports';
const url = 'https://qa.svaas.com/storage/abhicontainer/Prescription_21071600005.pdf?sig=hf9cMExUjFDeUA%2BvtlNJprt1KN1pqp9QQ9Bd%2BEiEhBs%3D&se=2022-08-30T14%3A59%3A13Z&sv=2019-02-02&sp=r&sr=b"'
export default function PolicyDetails() {
	const { navigate } = useLocation();
	const [isExpand, setIsExpand] = React.useState(false);
	const [expandCard, setExpandCard] = React.useState('');
	const { isOpened, setCopy, userInfo } = useGlobalContext();
	const [coverageData, setCoverageData] = useState<any>(null)
	const [allocationSpinner, setAllocationSpinner] = useState(false)
	const [allocationData, setAllocationData] = useState<any>([])
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [onPdfError, setPdfError] = React.useState(false);
	useEffect(() => {
		overView()
	}, [])
	const updateAllocation = (data: any) => {
		let doctorAvailable = data.doctorCoverage ? data.doctorCoverage.allocatedVisit - data.doctorCoverage.consumedVisit : ''
		let diagnosticAvailable = data.diagnosticCoverage ? data.diagnosticCoverage.allocatedVisit - data.diagnosticCoverage.consumedVisit : ''
		let allocation = [
			{
				type: 'doctor',
				name: 'Doctor Consultation',
				specialization: 'stethoscope',
				total: data.doctorCoverage ? data.doctorCoverage.doctorTotalAmount : '',
				balanceVisit: doctorAvailable,
				data: data.doctorCoverage ? data.doctorCoverage : {}
			},
			{
				type: 'diagnostic',
				name: 'Diagnostics',
				specialization: 'diagnostic',
				total: data.diagnosticCoverage ?data.diagnosticCoverage.diagnosisTotalAmount : '',
				balanceVisit: diagnosticAvailable,
				data: data.diagnosticCoverage ? data.diagnosticCoverage : {}
			},
			{
				type: 'medicine',
				name: 'Pharmacy',
				specialization: 'pharmacy',
				total: data.medicineCoverage ? data.medicineCoverage.medicineTotalAmount : '',
				data: data.doctorCoverage ? data.medicineCoverage : {}
			}
		]
		setAllocationData(allocation)
	}
	const overView = async () => {
		await getCoverageList(userInfo.patientId).then((res: any) => {
			updateAllocation(res.data)
			setCoverageData(res.data)

		}).finally(() => {
			setAllocationSpinner(false)
		})
	}
	if (!allocationSpinner && !coverageData) {
		return <NoDataMessage>No data available</NoDataMessage>
	}
	return (
		<>
			<Title className="body-text">Your Policy Overview</Title>

			{isDialogOpen ? (
				<Dialog fullScreen={true} title="Policy wording" onClose={() => setIsDialogOpen(false)}>
					<Dialog.Body style={{height :'auto', overflow :'scroll'}}>
					<>
								<PdfReport pdfLink={coverageData.productUrl
											? coverageData.productUrl
											: ''} />
											</>
						{/* <ViewPdf
							errorMsg={coverageData.productUrl
								? ''
								: "Failed to load PDF"}
							onError={setPdfError}
							pdfLink={
								coverageData.productUrl
									? coverageData.productUrl
									: ''
							}
						/> */}
					</Dialog.Body>
				</Dialog>
			) : null}
			<>
				{allocationSpinner ? (
					<div>Loading...</div>
				) : allocationData.map((item: any, index: any) => (
					<PolicyCard>
						<PolicyInner>
							<Data>
								<Icon name={item.specialization} />
								<div>
									<>
										<CardTitle>
											{item.name}
										</CardTitle>
										<LabelText>Allocated: {item.type === 'medicine' ? `₹${item.total}` : item.data.allocatedVisit}</LabelText>
										<LabelText>Spent: {item.type === 'medicine' ? `₹${item.data.amountSpend}` : item.data.consumedVisit}</LabelText>
									</>
								</div>
							</Data>
							<PriceInfo>
								<p className="price"> {item.type === 'medicine' ? `₹${item.data.amountAvailable}` : item.balanceVisit ? item.balanceVisit : 0} </p>
								<p className="data">Balance</p>
							</PriceInfo>
						</PolicyInner>
						<UpdateClaim onClick={() => navigate(`/myaccount/policy/details/${item.type}`)}>
							View Offline Claims
						</UpdateClaim>
					</PolicyCard>
				))}
			</>


			<PolicyCard isPolicyWordings>
				<PolicyInner onClick={() => setIsDialogOpen(true)} isPolicyWordings>
					<Data>
						<Icon name='policydoc' />
						<div>
							<>
								<CardTitle>Policy Wording</CardTitle>
								<LabelText>Details of what is covered, not covered & limitation of your policy.</LabelText>
							</>
						</div>
					</Data>
					<PriceInfo>
						<PdfLink>View PDF</PdfLink>
					</PriceInfo>
				</PolicyInner>

			</PolicyCard>

			{/* <Title>Your Policy Summary</Title>
			<PolicyCard
				isExpand={isExpand && expandCard === 'Doctor'}
				onClick={() => {
					setIsExpand(expandCard === 'Doctor' ? false : true);
					setExpandCard(expandCard === 'Doctor' ? '' : 'Doctor');
				}}>
				<PolicyInner>
					<Data>
						<Icon name='stethoscope' />
						<CardTitle>Doctor Consultation</CardTitle>
					</Data>
				</PolicyInner>
				<DoctorConsultation />
			</PolicyCard>
			<PolicyCard
				isExpand={isExpand && expandCard === 'Pharmacy'}
				onClick={() => {
					setIsExpand(expandCard === 'Pharmacy' ? false : true);
					setExpandCard(expandCard === 'Pharmacy' ? '' : 'Pharmacy');
				}}>
				<PolicyInner>
					<Data>
						<Icon name='pharmacy' />
						<CardTitle>Pharmacy & Medication</CardTitle>
					</Data>
				</PolicyInner>
				<DoctorConsultation />
			</PolicyCard>
			<PolicyCard
				isExpand={isExpand && expandCard === 'Check'}
				onClick={() => {
					setIsExpand(expandCard === 'Check' ? false : true);
					setExpandCard(expandCard === 'Check' ? '' : 'Check');
				}}>
				<PolicyInner>
					<Data>
						<Icon name='healthCheck' />
						<CardTitle>Health Check-ups</CardTitle>
					</Data>
				</PolicyInner>
				<DoctorConsultation />
			</PolicyCard>
			<PolicyCard
				isExpand={isExpand && expandCard === 'lab'}
				onClick={() => {
					setIsExpand(expandCard === 'lab' ? false : true);
					setExpandCard(expandCard === 'lab' ? '' : 'lab');
				}}>
				<PolicyInner>
					<Data>
						<Icon name='labDiagnostic' />
						<CardTitle>Laboratory & Diagnostic Tests</CardTitle>
					</Data>
				</PolicyInner>
				<DoctorConsultation />
			</PolicyCard>
			<PolicyCard
				isExpand={isExpand && expandCard === 'Opthalmologist'}
				onClick={() => {
					setIsExpand(expandCard === 'Opthalmologist' ? false : true);
					setExpandCard(expandCard === 'Opthalmologist' ? '' : 'Opthalmologist');
				}}>
				<PolicyInner>
					<Data>
						<Icon name='labDiagnostic' />
						<CardTitle>Opthalmologist</CardTitle>
					</Data>
				</PolicyInner>
				<DoctorConsultation />
			</PolicyCard>
			<PolicyCard
				isExpand={isExpand && expandCard === 'Procedures'}
				onClick={() => {
					setIsExpand(expandCard === 'Procedures' ? false : true);
					setExpandCard(expandCard === 'Procedures' ? '' : 'Procedures');
				}}>
				<PolicyInner>
					<Data>
						<Icon name='labDiagnostic' />
						<CardTitle>Minor Procedures</CardTitle>
					</Data>
					<PriceInfo>
						<PdfLink>Read policy</PdfLink>
					</PriceInfo>
				</PolicyInner>
				<DoctorConsultation />
			</PolicyCard> */}

			<Button variant={coverageData.productUrl ? 'primary' : 'disabled'} onClick={() => directDownloadAs(coverageData.productUrl, 'coverage.pdf')}>Download PDF</Button>
		</>
	);
}
