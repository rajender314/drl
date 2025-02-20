import {
    Button,
    Dialog,
    Icon,
    Logo,
    Specialization,
    Header, InsuranceCard, PillText,
    CoverageCardLoader,
    Select
} from '@app/components';

import { ProgressBar } from '@app/@lib';
import moment from 'moment';
import React, { useState } from 'react';
import { CostCard } from './costBreakdownCard'
import { useHistory } from 'react-router';
import {
    DocName,
    CoverageCard,
    CoverageInfo,
    CoverageContainer,
    CoverageHeader,
    CoverageList,
    Title,
    Validity,
    ValidityContainer,
    ValidityLabel,
    NoDataMessage,
    NoTextTitle,
    NoText,
    InfoCard,
    InfoContainer,
    InfoLabel,
    InfoData,
    BalanceAmount,
    SpentAmount,
    InfoText,
    Highlight,
    Currency,
    DoctorInfoContainer,
    IconContainer,
    InfoContent,
    ActionContainer,
    IconContent,
    Label,
    DoctorPayCurrency,
    DoctorPay,
    DoctorSlot,
    DoctorName,
    PayInfo,
    TransactionContainer,
    TransactionContent,
    TransactionLogContent,
    Action,
    CostContainer,
    SubTextTitle,
    TransactionCard,
    TransactionCardContainer,
    TransactionMonth,
    TransactionCount,
    InsuranceProduct,
    SubHeader,
    ReviewPolicy,
    Anchor,
    FlexGrid,
    CoverageInfoContainer,
    ViewMore,
    BalanceDetails,
    BalanceInfo
} from './coverage-components';
import {
    getCoverageList,
    getTrDetails,
    getTrHistoryByMonth,
    getCoverageTransactionList,
    getInvoice
} from '@app/@services'
import { getAllSpIcons, directDownload, getArray, useLocation, } from '@app/utils'
import { useGlobalContext } from '@app/contexts';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from '@app/components/icon/icons';
import { isMobile } from 'react-device-detect';
export default function Coverage() {
    const { navigate } = useLocation();
    const currentYear = moment().format('YYYY')
    const [allocationSpinner, setAllocationSpinner] = useState(false)
    const [transactionSpinner, setTransactionSpinner] = useState(false)
    const [detailSpinner, setDetailSpinner] = useState(false)
    const { userInfo } = useGlobalContext();
    const [coverageData, setCoverageData] = useState<any>([])
    const [lastTrData, setLastTrData] = useState<any>([])
    const [trDataByYear, setTrDataByYear] = useState<any>([])
    const [allocationData, setAllocationData] = useState<any>([])
    const [trDetailsData, setTrDetailsData] = useState<any>({})
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [transactionLogData, setTransactionLogData] = useState<any>([])
    const [invoiceData, setInvoiceData] = useState<any>({})
    const [logIndex, setLogIndex] = useState<any>(0)
    const [selectedYear, setSelectedYear] = useState<any>({ value: currentYear, label: currentYear })
    const [yearList, setYearList] = useState<any>([])
    const [pageCount, setPageCount] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [monthCurrentPage, setMonthCurrentPage] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [isPagingEnabled, setIsPagingEnabled] = useState(false)
    const history = useHistory();
    React.useEffect(() => {
        setTransactionSpinner(true)
        getList()
    }, []);
    React.useEffect(() => {
        getTrList()
    }, [currentPage]);
    React.useEffect(() => {

        getTrHistory(selectedMonth, monthCurrentPage)
    }, [monthCurrentPage]);
    React.useEffect(() => {
        getTrHistory(null, monthCurrentPage)
    }, [selectedYear]);

    const updateAllocation = (data: any) => {
        let allocation = [
            {
                type: 'doctor',
                name: 'Doctor Consultation',
                specialization: 'stethoscope',
                total: data.doctorCoverage.doctorTotalAmount,
                data: data.doctorCoverage ? data.doctorCoverage : {}
            },
            {
                type: 'diagnostic',
                name: 'Diagnostics',
                specialization: 'labDiagnostic',
                total: data.diagnosticCoverage.diagnosisTotalAmount,
                data: data.diagnosticCoverage ? data.diagnosticCoverage : {}
            },
            {
                type: 'medicine',
                name: 'Pharmacy',
                specialization: 'pharmacy',
                total: data.medicineCoverage.medicineTotalAmount,
                data: data.doctorCoverage ? data.medicineCoverage : {}
            }
        ]
        //console.log('allocation', allocation)
        setAllocationData(allocation)
    }
    const updatePage = () => {
        if (selectedMonth) {
            setMonthCurrentPage(monthCurrentPage + 1)
        } else {

            setCurrentPage(currentPage + 1)
        }
    }
    const getList = async () => {
        setAllocationSpinner(true)
        await getCoverageList(userInfo.patientId).then((res: any) => {

            updateAllocation(res.data)
            setCoverageData(res.data)


        }).finally(() => {
            setAllocationSpinner(false)
        })
    }

    const getTrList = async () => {
        let params = {
            svassId: userInfo.patientId,
            count: pageCount,
            page: currentPage
        }
        await getCoverageTransactionList(params).then((res: any) => {
            if (res && res.status && res.status === 200) {
                if (currentPage > 0) {
                    setLastTrData([...lastTrData, ...res.data])
                } else {
                    setLastTrData(res.data)
                }
                if (res && res.data && res.data.length < pageCount) {
                    setIsPagingEnabled(false)
                } else {
                    setIsPagingEnabled(true)
                }
            }
        })
    }

    const getTrHistory = async (month: any, page: any) => {
        setSelectedMonth(month)

        let date = null
        if (month) {
            date = moment(`${month}  ${selectedYear.value}`).format('DD-MM-YYYY')
        }
        let params = {
            month: date,
            svassId: userInfo.patientId,
            year: month ? '' : selectedYear.value,
            count: pageCount,
            page: page ? page : monthCurrentPage
        }

        await getTrHistoryByMonth(params).then((res: any) => {
            //console.log('getTrHistoryByMonth', params)
            if (res && res.status && res.status === 200) {
                if (month) {
                    if (monthCurrentPage > 0) {
                        setLastTrData([...lastTrData, ...res.data])
                    } else {
                        setLastTrData(res.data)
                    }

                    if (res && res.data && res.data.length < pageCount) {
                        setIsPagingEnabled(false)
                    } else {
                        setIsPagingEnabled(true)
                    }
                } else {
                    let list: any = res.data;
                    let listData: any = []
                    //list[12] = { listYear: ['2022', '2021', '2020'] }
                    if (list[12] && list[12].listYear && list[12].listYear.length) {
                        list[12].listYear.map((item: any) => {
                            listData.push({ value: item, label: item })
                        })
                    }
                    setYearList(listData)
                    setTrDataByYear(res.data)
                }
            }
        }).finally(() => {
            setTransactionSpinner(false)
        })
    }

    const getTrDetailsData = async (item: any) => {
        setDetailSpinner(true)
        setIsDialogOpen(true)
        const notify = () => toast.error('transaction id not available');
        let ItemId = null
        let svaasOrderId = null
        if (item.type == "DOCTOR") {

            ItemId = item.appointmentId
        } else if (item.type == "DIAGNOSTIC") {
            ItemId = item.prescriptionId

        } else if (item.type == "MEDICINE") {
            svaasOrderId = item.svaasOrderId

        }
        if (!ItemId && !svaasOrderId) {

            setDetailSpinner(false)
            setIsDialogOpen(false)
            return

        }
        let params = {
            id: ItemId,//item.svaasTransactionId,//"SVTRAN-25111106-180a-427b-a6c4-1c57ee4c6a57",//svaasTransactionId
            svaasOrderId: svaasOrderId,
            svassId: userInfo.userId
        }
        await getTrDetails(params).then((res: any) => {
            //console.log('getTrDetails', res)
            if (res && res.status && res.status === 200) {
                setTrDetailsData(res.data)

                updateTransactionLog(res.data)
                getInvoiceData(res.data)
                //setLastTrData(res.data)
            }
        }).finally(() => {
            setDetailSpinner(false)

        })
    }
    const gotoInvoice = (data: any) => {

        // if (data.erxGenerated) {
        history.push({
            pathname: `/files/appointments/${data.id}/invoice`,
            state: {
                invoiceDetails: data,
            },
        });


    };
    const getInvoiceData = async (data: any) => {
        let id = null
        //console.log('getInvoiceData', data)
        if (data.type == "DOCTOR") {

            id = trDetailsData.appointmentId;
        } else if (data.type == "DIAGNOSTIC") {
            id = trDetailsData.prescriptionId;

        } else if (data.type == "MEDICINE") {
            id = trDetailsData.prescriptionId;

        }
        if (!id) {
            console.log('getInvoice', id)
            return
        }
        await getInvoice(id, data.type).then((res) => {
            if (res && res.status && res.status === 200) {
                console.log('getInvoice', res.data)
                setInvoiceData(res.data)
            }

        }).finally(() => {

        })
    }
    const viewInvoice = () => {
        if (trDetailsData.type == "DOCTOR") {

            navigate(`/files/appointments/${trDetailsData.appointmentId}/invoice`)
        } else if (trDetailsData.type == "DIAGNOSTIC") {
            navigate(`/order-invoice/${trDetailsData.prescriptionId}`)

        }
        else if (trDetailsData.type == "MEDICINE") {
            navigate(`/order/medicineinvoice/${trDetailsData.orderTransactionId}`)
        }
    }
    const downloadInvoice = () => {
        if (invoiceData && invoiceData.invoiceFileName) {
            directDownload(invoiceData.invoiceFileName, 'invoice')
        }
    }
    const gotoDetails = () => {
        if (trDetailsData.type == "DOCTOR") {

            navigate(`/coverage/${trDetailsData.appointmentId}`)
        } else if (trDetailsData.type == "DIAGNOSTIC") {
            navigate(`/coverage/${trDetailsData.prescriptionId}`)

        }
        //console.log('gotoDetails', trDetailsData)
    }
    const updateTransactionLog = (data: any) => {
        //console.log('updateTransactionLog', data.transactionTrackerLog)
        try {
            let log: any = [];
            let logData: any = [];
            if (data.transactionTrackerLog && data.transactionTrackerLog.coverageLogTracker) {
                logData = data.transactionTrackerLog.coverageLogTracker
            }
            if (!logData.length) {
                return
            }
            logData.map((item: any, index: any) => {
                if (item.flag) {
                    setLogIndex(index)
                }
                let obj: any = {
                    label: item.statusType,
                    subtitle: item.createdDate ? moment(
                        moment(item.createdDate, 'YYYY-MM-DD hh:mm:ss').toDate()
                    ).format('dddd, DD MMM YYYY, h:mm A') : '',
                    //subtitle: moment(item.scheduleDate).format('dddd, DD MMM YYYY') + ' at ' + moment(item.scheduleTime, ['h:mm:ss A']).format('HH:MM A'),
                }
                if (item.payFlag && item.payFlag !== "") {
                    obj['content'] = `Payment ${item.payFlag}`
                }
                if (item.flag == true) {
                    log.push(obj)
                }
            })
            setTransactionLogData(log)
        } catch (error) {

        }

    }
    const onYearChange = (e: any) => {
        //console.log('onYearChange', e)
        setSelectedYear(e)
        setMonthCurrentPage(0)
    }
    const updatedMonth = (month: any) => {
        setMonthCurrentPage(0)
        getTrHistory(month, 0)
    }
    const getDoctorInfo = () => {
        return (
            <DoctorInfoContainer>
                <IconContainer>
                    <IconContent>
                        <Icon name={trDetailsData.doctorConsultationType === 'OnlineConsultation' ? 'video' : 'stethoscope'} />
                    </IconContent>
                    <InfoContent>
                        <Label>{trDetailsData.doctorConsultationType}</Label>
                        <Label>{trDetailsData.svaasAppointmentId}</Label>
                        <DoctorName>{trDetailsData.doctorName}</DoctorName>
                        <DoctorSlot> Date and Time: {moment(
                            moment(trDetailsData.date + '' + trDetailsData.appointmentTime, 'YYYY-MM-DD hh:mm:ss').toDate()
                        ).format('DD MMM, YYYY h:mm A')}</DoctorSlot>
                        <PillText variant={trDetailsData.status}>
                            {trDetailsData.status}
                        </PillText>
                    </InfoContent>
                </IconContainer>
                {/* <ActionContainer>
                    <PayInfo>
                        <DoctorPay className="mr-4">Paid {' '}</DoctorPay>
                        <DoctorPayCurrency> &#8377; {trDetailsData.amount ? trDetailsData.amount : 0}</DoctorPayCurrency>
                    </PayInfo>
                </ActionContainer> */}
            </DoctorInfoContainer>
        )
    }

    const getMedicationInfo = () => {
        return (
            <DoctorInfoContainer>
                <IconContainer>
                    <IconContent>
                        <Specialization name="Internal Medicine" />
                    </IconContent>

                    <InfoContent>
                        <Label>{trDetailsData.medicineOrderType}</Label>
                        <Label>{trDetailsData.svaasOrderId ? trDetailsData.svaasOrderId : ''}</Label>
                        <Title>{trDetailsData.storeName ? trDetailsData.storeName : ''}</Title>
                        <DoctorSlot> Date and Time: {moment(
                            moment(trDetailsData.date + '' + trDetailsData.appointmentTime, 'YYYY-MM-DD hh:mm:ss').toDate()
                        ).format('DD MMM, YYYY h:mm A')}</DoctorSlot>
                        <PillText variant={trDetailsData.status}>
                            {trDetailsData.status}
                        </PillText>
                    </InfoContent>
                </IconContainer>
                {/* <ActionContainer>

                    <PayInfo>
                        <DoctorPay className="mr-4">Paid {' '}</DoctorPay>
                        <DoctorPayCurrency> &#8377; {trDetailsData.amount ? trDetailsData.amount : 0}</DoctorPayCurrency>
                    </PayInfo>

                </ActionContainer> */}
            </DoctorInfoContainer>
        )
    }
    const getDiagnosticInfo = () => {
        return (
            <DoctorInfoContainer>
                <IconContainer>
                    <IconContent>
                        <Icon name="labDiagnostic" />
                    </IconContent>

                    <InfoContent>
                        <Label>Test type: {trDetailsData.diagnosisCategory}</Label>
                        <Label>{trDetailsData.svaasOrderId ? trDetailsData.svaasOrderId : ''}</Label>
                        <Title>{trDetailsData.labName}</Title>
                        <DoctorSlot> Date and Time: {moment(
                            moment(trDetailsData.date + '' + trDetailsData.appointmentTime, 'YYYY-MM-DD hh:mm:ss').toDate()
                        ).format('DD MMM, YYYY h:mm A')} </DoctorSlot>
                        <PillText variant={trDetailsData.status}>
                            {trDetailsData.status}
                        </PillText>
                    </InfoContent>
                </IconContainer>
                {/* <ActionContainer>
                    <PayInfo>
                        <DoctorPay className="mr-4">Paid {' '}</DoctorPay>
                        <DoctorPayCurrency> &#8377; {trDetailsData.amount ? trDetailsData.amount : 0}</DoctorPayCurrency>
                    </PayInfo>

                </ActionContainer> */}
            </DoctorInfoContainer>
        )
    }

    const transactionCard = (data: any) => {
        return (
            <TransactionContainer>
                <TransactionContent>
                    <CostContainer>
                        {data.type === 'DOCTOR' ? (
                            <>
                                <Label>Appointment ID</Label>
                                <DoctorName>{data.svaasAppointmentId}</DoctorName>
                            </>
                        ) : data.type === 'DIAGNOSTIC' ? (
                            <>
                                <Label>Order ID</Label>
                                <DoctorName>{data.svaasOrderId ? data.svaasOrderId : ''}</DoctorName>
                            </>
                        ) : null}

                    </CostContainer>

                </TransactionContent>
            </TransactionContainer>
        )
    }

    const transactionMonthCard = (item: any) => {
        if (!item.monthName) {
            return
        }
        return <TransactionCard status={item.txnCount} onClick={() => updatedMonth(item.monthName)}>
            <TransactionMonth>{item.monthName}</TransactionMonth>
            <TransactionCount>{item.txnCount} Txns</TransactionCount>
        </TransactionCard>
    }
    const transactionLog = () => {
        return (
            <TransactionContainer>
                <TransactionLogContent>
                    <Title>Transaction log</Title>
                    <ProgressBar
                        startingStep={logIndex + 1}
                        onSubmit={() => { }}
                        steps={transactionLogData}
                        stepClass='vertical'
                        progressClass='vertical'
                        showLabel
                    />

                </TransactionLogContent>
            </TransactionContainer>

        )
    }

    return (
        <CoverageContainer>
            <Header showProfile />
            <Toaster />
            {/*   {iconsData.map((item: any) => {
                return <div>{item.name} <Specialization name={item.name} /><Specialization name={item.name} background={true} /> </div>
            })} */}
            <CoverageHeader>
                <InsuranceCard data={coverageData} />
            </CoverageHeader>
            <InfoCard>
                <InfoContainer>
                    {isDialogOpen ? (
                        <Dialog fullScreen={true} title="TRANSACTIONS DETAILS" onClose={() => setIsDialogOpen(false)}>
                            {detailSpinner ? (
                                <Spinner size="3px" />
                            ) : trDetailsData.type ? (

                                <>
                                    <Dialog.Body>
                                        {trDetailsData.type === 'DOCTOR' ? getDoctorInfo() : trDetailsData.type === 'MEDICINE' ? getMedicationInfo() : getDiagnosticInfo()}
                                        {trDetailsData && <CostCard data={trDetailsData} />}
                                        {trDetailsData && transactionLog()}
                                        {/* {trDetailsData && transactionCard(trDetailsData)} */}
                                    </Dialog.Body>

                                    <Dialog.Footer>

                                        <Button onClick={() => viewInvoice()}>view Invoice</Button>
                                        {/* <Button onClick={() => gotoDetails()}>View Transaction Details</Button> */}
                                        <Button variant="secondary">
                                            <Anchor style={isMobile ? {} : { pointerEvents: 'none' }}
                                                href={`tel:180010288227`}>
                                                Call Support 1800-1028-8227
                                            </Anchor>
                                        </Button>
                                    </Dialog.Footer>
                                </>
                            ) : (
                                <NoDataMessage>No Details Available</NoDataMessage>
                            )}

                        </Dialog>
                    ) : null}

                    <InfoLabel>Amount Spent</InfoLabel>
                    <InfoData>
                        <SpentAmount><span>₹</span>{Math.round(coverageData.totalCoverageAmountSpend * 100) / 100}</SpentAmount>
                        {/* <BalanceAmount>
                            <InfoText>Valid through <Highlight>{moment(coverageData.validityDate).format('MM/YY')}</Highlight></InfoText>
                            <InfoText><Highlight><Currency type=''>&#8377;</Currency> {coverageData.totalAvailableAmount}</Highlight> available</InfoText>
                        </BalanceAmount> */}
                        <BalanceDetails>
                            <BalanceInfo>Valid through <span>{moment(coverageData.validityDate).format('MM/YY')}</span></BalanceInfo>
                            <BalanceInfo>available <span><span>₹</span>{coverageData.totalAvailableAmount}</span></BalanceInfo>
                        </BalanceDetails>
                    </InfoData>
                    <InsuranceProduct>
                        <Label>Insurance Product</Label>
                        <PillText>{coverageData.packageName && coverageData.packageName.includes('_') ? coverageData.packageName.replace(/_/g, ' ') : coverageData.packageName}</PillText>
                    </InsuranceProduct>
                    <>
                        <SubHeader>
                            <SubTextTitle>
                                Allocation overview
                            </SubTextTitle>
                            <ReviewPolicy onClick={() => navigate(`/myaccount/policy`)}>Review Policy</ReviewPolicy>
                        </SubHeader>

                        {allocationSpinner ? (
                            getArray(7).map((index) => <CoverageCardLoader key={index} />)
                        ) : allocationData.map((item: any, index: any) => (
                            <CoverageCard key={index}>
                                <CoverageInfo>
                                    <Icon name={item.specialization} />
                                    <div style={{ marginLeft: '4px' }}>

                                        <>
                                            <Title>{item.name}</Title>
                                            <Label>Allocated: ₹{item.total ? item.total : 0}</Label>
                                            <Label>Spent: ₹{item.data.amountSpend}</Label>
                                        </>
                                    </div>
                                </CoverageInfo>
                                <ValidityContainer>
                                    <ValidityLabel>
                                        <PayInfo>
                                            <DoctorPayCurrency> <span>₹</span>{item.data.amountAvailable ? item.data.amountAvailable : 0}</DoctorPayCurrency>
                                        </PayInfo>
                                        <DoctorPay> Balance</DoctorPay>
                                    </ValidityLabel>

                                </ValidityContainer>
                            </CoverageCard>
                        ))}


                    </>
                </InfoContainer>
            </InfoCard>
            <InfoCard>
                <CoverageList>


                    {transactionSpinner ? (
                        getArray(3).map((index) => <CoverageCardLoader key={index} />)
                    ) : lastTrData && lastTrData.length ? (
                        <>
                            <SubTextTitle>
                                Last Transactions
                            </SubTextTitle>
                            {lastTrData.map((item: any, index: any) => (


                                <CoverageCard
                                    key={index}
                                    onClick={() => getTrDetailsData(item)}>
                                    <CoverageInfo>
                                        <Icon name={item.type === 'DIAGNOSTIC' ? `labDiagnostic` : item.type === 'MEDICINE' ? `pharmacy` : item.type === 'DOCTOR' ? (item.doctorConsultationType == 'InPerson' ? 'stethoscope' : 'video') : 'stethoscope'} />
                                        <CoverageInfoContainer>
                                            <FlexGrid>
                                                <div style={{ flex: '1', marginRight: '8px' }}>
                                                    <Label>{item.type === 'DOCTOR' ? item.doctorConsultationType : item.type === 'DIAGNOSTIC' ? item.diagnosisCategory : item.medicineOrderType}</Label>
                                                    {item.type === 'DOCTOR' ? (
                                                        <>
                                                            <Title>{item.doctorName}</Title>
                                                            <Label> Appointment ID: </Label>
                                                            <Title>{item.svaasAppointmentId}</Title>

                                                        </>
                                                    ) : (
                                                        <>
                                                            <Label> Order ID:  </Label>
                                                            <Title>{item.svaasOrderId}</Title>
                                                        </>
                                                    )}

                                                    <Label> Date and Time: {moment(
                                                        moment(item.date + item.appointmentTime, 'YYYY-MM-DD hh:mm:ss').toDate()
                                                    ).format('DD MMM, YYYY h:mm A')}</Label>

                                                    <PillText variant={item.status}> {item.status}</PillText>
                                                </div>
                                                <ValidityContainer>
                                                    <ValidityLabel>
                                                        <PayInfo>
                                                            {/*  <DoctorPay className="mr-4">Paid</DoctorPay> */}
                                                            <DoctorPayCurrency> <span>₹</span>{item.amount ? item.amount : 0}</DoctorPayCurrency>
                                                        </PayInfo>
                                                    </ValidityLabel>
                                                </ValidityContainer>
                                            </FlexGrid>

                                        </CoverageInfoContainer>

                                    </CoverageInfo>

                                </CoverageCard>
                            ))}
                            {isPagingEnabled && <ViewMore onClick={() => updatePage()}>View more</ViewMore>}


                            <SubTextTitle style={{ marginTop: '24px' }}>
                                Transactions in {selectedYear.value}
                            </SubTextTitle>
                            {yearList && yearList.length > 1 && (
                                <Select
                                    placeholder={'Select year'}
                                    options={yearList}
                                    value={selectedYear}
                                    onChange={(e: any) => onYearChange(e)}
                                />
                            )}
                            <TransactionCardContainer>
                                {trDataByYear && trDataByYear.map((item: any) =>
                                    transactionMonthCard(item)
                                )}
                            </TransactionCardContainer>

                        </>
                    ) : !transactionSpinner && (
                        <NoDataMessage>
                            <Icon name="noTransaction" />
                            <NoTextTitle>
                                No Recent Transactions
                            </NoTextTitle>
                            <NoText>
                                There seems to be no recent transactions made through this profile
                            </NoText>

                        </NoDataMessage>
                    )}
                </CoverageList>
            </InfoCard>
        </CoverageContainer >
    );
}
