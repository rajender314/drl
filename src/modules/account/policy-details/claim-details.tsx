import { useEffect, useState } from 'react'
import {
    Icon,
    Button,
    Header,
} from "@app/components"
import * as _ from 'lodash'
import { useHistory, useParams } from "react-router-dom";
import { claimDataDetails, claimDetails } from '@app/@services'
import { useLocation } from '@app/utils'
import { Spinner } from '@app/components/icon/icons';
import toast, { Toaster } from 'react-hot-toast';
import { InfoText } from '@app/components/appointment-card/appointment-card-components';

import {
    InnerData,
    Field,
    Label,
    Text,
    Container,
    NoDataMessage,
    DoctorInfoContainer,
    InfoTextContainer,
    Title,
    CancelCard,
    ClaimTitle,
    ClaimContainer,
    VisitCard,
    VisitTitle,
    VisitRow,
    VisitName,
    VisitAction,
    VisitStatus,
    ViewLog,
    ViewAvailable,
    DigImg, MedImg, DocImg
} from './policy-details-components';
import { MyGlobalContext, useGlobalContext } from '@app/contexts';
import { ConfirmImg } from '@app/modules/cart/map-confirm/map-confirm-components';

export function ClaimDetails() {
    let history = useHistory();
    const { navigate } = useLocation();
    const { isOpened, setCopy, userInfo } = useGlobalContext();
    const { type } = useParams<any>()
    const [claimData, setClaimData] = useState<any>([]);
    const [errMsg, setErrMsg] = useState<any>('');
    useEffect(() => {
        getClaimData()
    }, [])



    const getClaimData = async () => {
        let ptype = type;
    if(type === 'diagnostic'){
 ptype = 'lab'
    }
        await claimDataDetails(userInfo.userId, ptype).then((res: any) => {
            if (res && res.status === 200 && res.data.length) {                           
                setClaimData(res.data);               
            }
            else {
                setClaimData([])
            }
        }).finally(() => {

        });
    }

    // if (!claimData || !claimData.length) {
    //     return (
    //         <Container>
    //             <Header />
    //             <NoDataMessage>No data available</NoDataMessage>
    //         </Container>
    //     )
    // }

    const notify = () => toast.error('transaction id not available');
    const gotoLog = (visit: any) => {
        if (visit.transactionId == 0 || !visit.transactionId) {

            notify()
            return
        }
        navigate(`/myaccount/policy/claimlog/${visit.transactionId}`)
    }
    return (
        <Container>
            <Header />
            <Toaster />
            <Title className="mtb-20">{type === 'doctor' ? "Doctor - View Claims" : type === 'diagnostic' ? "Diagnosis - View Claims" : type === 'medicine' ? "Medicine - View Claims" : ''}</Title>
            {type === 'doctor' && <DocImg />}
            {type === 'diagnostic' && <DigImg />}
            {type === 'medicine' && <ConfirmImg />}
            {claimData && claimData.length ? <CancelCard className="pm-0">
                <ClaimContainer className="pb-50">
                    {/*  <ClaimTitle>Please help us with the reason for cancelling.</ClaimTitle> */}
                    {claimData && claimData.map((item: any, index: any) =>
                        <VisitCard key={index}>
                            <VisitTitle>{item.claimType}</VisitTitle>
                            <VisitRow key={index}>
                                <VisitName>{item.claimAmount && <span>&#8377;</span>}{item.claimAmount ? item.claimAmount : item.type}</VisitName>
                                <VisitAction>
                                    <VisitStatus>{item.consumed ? 'Consumed' : item.consumed}</VisitStatus>
                                    {/* <VisitStatus>
                                            {visit.isConsumed ? (
                                               
                                                <>
                                                    <ViewLog onClick={() => gotoLog(visit)}>View log</ViewLog>
                                                </>
                                            ) : (

                                                <ViewAvailable>Available</ViewAvailable>
                                            )}
                                        </VisitStatus> */}
                                </VisitAction>


                            </VisitRow>

                        </VisitCard>
                    )}
                    {/* <Button width="100%" variant="secondary" onClick={() => history.goBack()}  >Not Now </Button> */}
                </ClaimContainer>
            </CancelCard> : <Container className="w-100">
                {/* <Header /> */}
                <CancelCard className="pm-0">
                <NoDataMessage className="claim">No offline claim consumed till date.</NoDataMessage>

                </CancelCard>
            </Container>}

        </Container >
    )

}
