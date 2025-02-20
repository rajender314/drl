



import React, { useState, useEffect } from 'react'
import {
    Container,
    DoctorInfoContainer,
    SuccessContainer,
    ErrorContainer,
    DoctorImg,
    InfoTextContainer,
    Title,
    IconContainer,
    Text,
    HighlightText,
    CancelCard,
    CancelContainer,
    RadioButton,
    CancelTitle,
    NoDataMessage,
    ErrorText,
    SuccessTick,
    SuccessTitle,
    SuccessSubTitle
} from '@app/modules/cancel-appointment/cancel-components'
import {
    Icon,
    Radio,
    HealthFileCard,
    TextArea,
    Button,
    Header,
    Dialog,
} from "@app/components"
import * as _ from 'lodash'
import { useHistory, useParams } from "react-router-dom";
import { appointmentDetails, getCancellationReasons, cancelAppointmentApi, cancelOrderApi } from '@app/@services'
import { useLocation } from '@app/utils'
import { Spinner } from '@app/components/icon/icons';
import toast, { Toaster } from 'react-hot-toast';
import { InfoText } from '@app/components/appointment-card/appointment-card-components';
import { getPharCancellationReasons, medCancelOrderApi } from '@app/@services/medicine-orders/medicine-orders';
export default function MAPOrderCancel() {
    let history = useHistory();
    const notify = () => toast.success('Successfully toasted!');
    /*  const { addToast } = useToasts() */
    const { navigate } = useLocation()
    const { orderId }: any = useParams();
    const [page, setPage] = useState(1)
    const [selectedReason, setSelectedReason] = useState("")
    const [spinner, setSpinner] = useState(true)
    const [appointmentData, setAppointmentData] = useState<any>({})
    const [cancelReason, setCancelReason] = useState([])
    const [otherText, setOtherText] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState<any>(null)
    const [valid, setValid] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selReason, setSelReason] = useState<any>('');
    useEffect(() => {
      //console.log(orderId,123)
        if (orderId) {
            getCancellationReasonsApi(orderId)
        }

    }, [page])
    /* const toast = () => {
        addToast('content', {
            appearance: 'success',
            autoDismiss: true,
        })
    } */

    
    const getCancellationReasonsApi = async (type: any) => {
        console.log(type,orderId);
        await getPharCancellationReasons(type).then((res: any) => {
            if (res.status === 200) {
                setCancelReason(res.data.reasons)
            }
        }).finally(() => {
            setSpinner(false)
        });
    }
    if (spinner) {
        return <Spinner size="3px" />
    }
    if (!cancelReason || !cancelReason.length) {
        return (
            <Container>
                <Header />
                <NoDataMessage>No data available</NoDataMessage>
            </Container>
        )
    }
    const selectReason = (id: any, item: any) => {
        setShowErrorMsg(false)
        setSelectedReason(id);
        setSelReason(item.reason);
    }
    const RadioInputs = () => {
        return (
            cancelReason.map((item: any, i: any) => (
                <RadioButton key={i}>
                    <Radio
                        selected={selectedReason == item.id}
                        label={item.reason}
                        name="reason"
                        type="radio"
                        onChange={(ev) => selectReason(ev.target.value, item)}
                        value={item.id} >
                        {item.reason}
                    </Radio>
                </RadioButton>

            ))


        )
    }
    const updateText = (val: any) => {
        setShowErrorMsg(false)
        setOtherText(val)
    }
    const cancelAppointment = async () => {
        let reason = '';
            if ((selReason.toLowerCase() === "my reason is not listed")) {
                reason = otherText
            } else {
                let idx = _.findIndex(cancelReason, function (o: any) { return o.id == selectedReason; });
                if (idx > -1) {
                    let data: any = cancelReason[idx]
                    reason = data.reason
                }
            }            
     
        if (!reason) {
            setShowErrorMsg(true)
            return
        }

        let params = {}
        if (orderId) {
            params = {
                orderNumber: orderId,
                diagnosticId: 2,
                cancellationReason: reason,
            }
        }

       
            setSpinner(true)
            await medCancelOrderApi(params).then((res: any) => {
                //console.log(res)
                if (res.status && res.status == 200) {
                    //console.log('valid')
                    setValid(true);
                    // setApiErrorMsg(null)
                } else {
                    setValid(false)
                    //console.log('invalid')
                    setApiErrorMsg(res.data.reason || res.data.message)
                }
                setIsDialogOpen(true)

            }).catch((error: any) => {
                //console.log('error', error)
                setIsDialogOpen(true);
                setValid(false);
                setApiErrorMsg("Something went wrong")
            }).finally(() => {
                setSpinner(false)
            })

        
    }
   
    return (
        <Container>
            <Header />
            {/*   <div>
                <button onClick={notify}>Make me a toast</button>
                <Toaster />
            </div> */}
            {
                isDialogOpen ? (
                    <Dialog fullScreen={true} title={`Cancel ${orderId ? 'Order' : ' Appointment'}`}>
                        <Dialog.Body>
                            {!valid ? (
                                <ErrorContainer>
                                    <ErrorText>{' '}{apiErrorMsg}</ErrorText>
                                </ErrorContainer>
                            ) : (
                                <SuccessContainer>
                                    <SuccessTick><Icon name='tick' /></SuccessTick>
                                    <SuccessTitle>{'Order'} Cancelled</SuccessTitle>
                                    <SuccessSubTitle>Your {orderId ? 'Order' : 'Appointment'} has been successfully cancelled</SuccessSubTitle>
                                </SuccessContainer>
                            )}
                        </Dialog.Body>
                        <Dialog.Footer>
                            {!valid ? (
                                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Close</Button>
                            ) : (
                                <Button onClick={() => history.goBack()}>Done </Button>
                            )}

                        </Dialog.Footer>

                    </Dialog>
                ) : null
            }
            <Title> {orderId ? 'Confirm Cancellation?' : 'Cancel Appointment?'}</Title>
            <Text>Please confirm your cancellation request</Text>
            <CancelCard>
                <CancelContainer>
                    <CancelTitle>Please help us with the reason for cancelling</CancelTitle>
                    {/* {appointmentId && appointmentData && <HealthFileCard type={"cancel"} appointment={appointmentData} />} */}

                    {RadioInputs()}
                    {(orderId && selReason.toLowerCase() === "my reason is not listed") ? (

                        <TextArea label="" placeholder={'Please enter your reason'} value={otherText} onChange={(val) => updateText(val.target.value)} />
                    ) : null}
                    {showErrorMsg ? (
                        <ErrorText>Please enter the reason for cancellation.</ErrorText>
                    ) : null}
                    <InfoText style={{ padding: 0, marginBottom: '16px' }}>
                        <Icon name='info' /> In case the payment was made, same would be refunded back within 7-14 days.
														</InfoText>
                    <Button width="100%" onClick={() => cancelAppointment()} variant="primary" >Confirm Cancellation</Button>
                    <Button width="100%" variant="secondary" onClick={() => history.goBack()}  >Not Now </Button>
                </CancelContainer>
            </CancelCard>
        </Container >
    )
}