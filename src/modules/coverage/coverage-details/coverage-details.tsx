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
import { CostCard } from './../costBreakdownCard'
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


} from './coverage-log-components';

import {
    getTrDetails, getInvoice
} from '@app/@services'
import { Spinner } from '@app/components/icon/icons';
import { MyGlobalContext, useGlobalContext } from '@app/contexts';

export function CoverageDetails() {
    const { navigate } = useLocation();
    const [transactionData, setTransactionData] = useState<any>({})
    const [transactionLogData, setTransactionLogData] = useState<any>([])
    const [spinner, setSpinner] = useState(false)
    const { isOpened, setCopy, userInfo } = useGlobalContext();
    const { id } = useParams<any>()

    React.useEffect(() => {
        getDetail()
    }, []);
    const getDetail = async () => {
        setSpinner(true)
        let params = {
            id: id,
            svassId: userInfo.userId
        }
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
        let log: any = [];
        data.transactionTrackerLog.map((item: any) => {
            let obj = {
                label: item.scheduleStatus,
                subtitle: moment(item.scheduleDate).format('dddd, DD MMM YYYY') + ' at ' + moment(item.scheduleTime, ['h:mm:ss A']).format('HH:MM A'),
            }
            log.push(obj)
        })
        setTransactionLogData(log)
    }

    const transactionLog = () => {
        return (
            <ProgressBar
                startingStep={transactionLogData.length}
                onSubmit={() => { }}
                steps={transactionLogData}
                stepClass='vertical'
                progressClass='vertical'
                showLabel
            />
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
                        <DoctorInfoName>{transactionData.svaasAppointmentId ? transactionData.svaasAppointmentId : '--'}</DoctorInfoName>
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
                    <LogCardContainer>
                        <LogCardContent>
                            <LogCardTitle>Transaction Log</LogCardTitle>
                            {transactionLog()}

                        </LogCardContent>
                    </LogCardContainer>
                    <LogCardContainer>
                        <LogCardContent>
                            <LogCardTitle>Cost Breakdown</LogCardTitle>
                            {transactionData && <CostCard data={transactionData} />}
                            <Button variant={'disabled'}>Download Invoice</Button>
                        </LogCardContent>

                    </LogCardContainer>


                </InfoContainer>
            </InfoCard>

        </CoverageContainer>
    );
}
