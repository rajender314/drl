import {
    Button,
    Header,
    Image
} from '@app/components';
import { useLocation } from '@app/utils';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { ProgressBar } from '@app/@lib';
import {
    CoverageContainer,
    DoctorCardContainer,
    InfoCard,
    InfoContainer,
    Title,
    LogCardContainer,
    LogCardContent,
    LogCardTitle,
    DoctorCardContent,
    DoctorImageContainer,
    DoctorInfoContainer,
    DoctorInfoLabel,
    DoctorInfoName,
    DoctorInfoContact,


} from './log-components';
import { CountCard } from './../countBreakdownCard'
import {
    getTrDetails, getInvoice
} from '@app/@services'
import { Spinner } from '@app/components/icon/icons';
import { MyGlobalContext, useGlobalContext } from '@app/contexts';

export function Log() {
    const { navigate } = useLocation();
    const [transactionData, setTransactionData] = useState<any>({})
    const [transactionLogData, setTransactionLogData] = useState<any>([])
    const [spinner, setSpinner] = useState(false)
    const { isOpened, setCopy, userInfo } = useGlobalContext();
    const { id } = useParams<any>()
    const [logIndex, setLogIndex] = useState<any>(0)

    React.useEffect(() => {

        getDetail()
    }, []);
    const getDetail = async () => {
        setSpinner(true)
        let params = {
            id: id,
            svassId: userInfo.userId
        }
        //console.log(params)
        await getTrDetails(params).then((res) => {
            if (res && res.status && res.status === 200) {
                setTransactionData(res.data)
                getInvoiceData(res.data)
                updateTransactionLog(res.data)
            }

        }).finally(() => {
            setSpinner(false)
        })
    }
    const getInvoiceData = async (data: any) => {
        setSpinner(true)

        await getInvoice(id, data.type).then((res) => {
            if (res && res.status && res.status === 200) {
                //console.log(res.data)
            }

        }).finally(() => {
            setSpinner(false)
        })
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
                let obj:any = {
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

    const transactionLog = () => {
        return (
            <LogCardContainer>
                <LogCardContent>
                    <LogCardTitle>Transaction Log</LogCardTitle>

                    <ProgressBar
                        startingStep={logIndex + 1}
                        onSubmit={() => { }}
                        steps={transactionLogData}
                        stepClass='vertical'
                        progressClass='vertical'
                        showLabel
                    />

                </LogCardContent>
            </LogCardContainer>

        )
    }
    const doctorCard = () => {
        return (
            <DoctorCardContainer>
                <DoctorCardContent>
                    <DoctorImageContainer>
                        <Image url={''} />
                    </DoctorImageContainer>
                    <DoctorInfoContainer>
                        <DoctorInfoLabel>Consultation with </DoctorInfoLabel>
                        <DoctorInfoName>{transactionData.doctorName}</DoctorInfoName>
                        <DoctorInfoLabel>Appointment ID</DoctorInfoLabel>
                        <DoctorInfoName>{transactionData.svaasAppointmentId ? transactionData.svaasAppointmentId : ''}</DoctorInfoName>
                    </DoctorInfoContainer>
                </DoctorCardContent>
            </DoctorCardContainer>
        )
    }
    const diagnosticCard = () => {
        return (
            <DoctorCardContainer>
                <DoctorCardContent>

                    <DoctorInfoContainer>
                        <DoctorInfoLabel>Diagnostic Testing </DoctorInfoLabel>
                        <DoctorInfoName>{transactionData.diagnosisCategory}</DoctorInfoName>
                        <DoctorInfoLabel>Order ID</DoctorInfoLabel>
                        <DoctorInfoName>{transactionData.prescriptionId ? transactionData.prescriptionId : '--'}</DoctorInfoName>
                    </DoctorInfoContainer>
                </DoctorCardContent>
            </DoctorCardContainer>
        )
    }
    if (spinner) {
        return <Spinner size={`3px`} />
    }
    return (
        <CoverageContainer>
            <Header />

            <Title>Transaction Details</Title>
            <InfoCard>
                <InfoContainer>
                    {transactionData && transactionData.type === 'DOCTOR' ? (
                        doctorCard()
                    ) : transactionData && transactionData.type === 'DIAGNOSTIC' ? (
                        <>
                            {diagnosticCard()}


                        </>
                    ) : null}
                    {transactionLog()}
                    <LogCardContainer>
                        <LogCardContent>
                            <LogCardTitle>Count Breakdown</LogCardTitle>
                            {transactionData && <CountCard data={transactionData} />}
                            <Button variant={'disabled'}>Download Invoice</Button>
                        </LogCardContent>

                    </LogCardContainer>


                </InfoContainer>
            </InfoCard>

        </CoverageContainer>
    );
}
