import { generateOtp, setPin, verifyOtp } from '@app/@services/user/user';
import { Button, Header, Radio } from '@app/components';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import NewPin from '../signup/registration/newpin';
import Otp from '../signup/registration/otp';
import SuccessPage from '../signup/registration/successpage';
import {
	DetailsContainer,
	RadioGroup,
	SubTitle,
	Title,
	Label,
	Input,
	ErrorMessage,
} from './forgot-pin-components';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const mobilePatern = /^\d{10}$/;
const pinPatern = /^\d{6}$/
const alpPattern = /[a-zA-Z]/;
export default function ForgotPin() {
	const [selectedOption, setSelectedOption] = React.useState('PHONE');
	const { state }: any = useLocation();
	const [attempts, setAttempts] = React.useState(6);
	const [isNextClicked, setIsNextClicked] = React.useState(
		state ? state.isNext : true
	);
	const history = useHistory();
	const [idValue, setIdValue] = React.useState('');
	const [idType, setIdType] = React.useState(state ? state.type : 'PHONE');
	const [submitted, setSubmitted] = React.useState(false);
	const [otpValue, setOtpValue] = React.useState('');
	const [otpSubmitted, setOtpSubmitted] = React.useState(false);
	const [invalidOtp, setInvalidOtp] = React.useState('');
	const [showMpin, setShowMpin] = React.useState(false);
	const [mPin, setMpin] = React.useState('');
	const [confirmPin, setConfirmPin] = React.useState('');
	const [cpinType, setCPinType] = React.useState('password');
	const [mpinType, setMPinType] = React.useState('password');
	const [genOtpPrms,setGenPrms] = React.useState<any>();
	const [mPinSuccess, setMpinSuccess] = React.useState(false);
	const [mPinSubmitted, setMpinSubmitted] = React.useState(false);
	const [showOtp, setShowOtp] = React.useState(false);
	const [uIdErr, setUIdErr] = React.useState('');
	const [disBtn, setDisBtn] = React.useState(false);
	const [isMemberSelectionRequired,setIsMemberSelectionRequired] = React.useState(false);
	function onClick() {
		//console.log(selectedOption);
		if (disBtn) {
			return;
		}
		setUIdErr('');
		setInvalidOtp('');
		setDisBtn(true);
		if (showMpin) {
			setMpinSubmitted(true);
			if (mPin && confirmPin && mPin === confirmPin) {
				setPin({ pinValue: mPin, requestType: "FORGOT_PIN" }).then((res: any) => {
					setAttempts(attempts - 1);
					if (res.status == 200) {
						setMpinSuccess(true);
						setMpinSubmitted(true);
						setShowMpin(true);
						setAttempts(6);
						if(isMemberSelectionRequired){
							history.push({
								pathname: '/member',
							})
							return;
												}
						else{
							setTimeout(() => {
								localStorage.clear();
								window.location.href = `${process.env.REACT_APP_HOMEPAGE}/`
							}, 2000);
						}
						
					} else if (res.status == 400) {
						setMpinSubmitted(false);
						setUIdErr(res.data.message);
					}
				})
			}
		} else if (submitted) {
			if (otpValue) {
				let params = {
					"otp": otpValue,
					"type": idType ? idType : 'PHONE',
					"username": idValue,
					"appName": "PWA",
				}
				if (otpValue.length !== 6) {
					// setUIdErr("Please enter correct OTP");
					return;
				}
				verifyOtp(params).then((res: any) => {
					setAttempts(attempts - 1);
					setOtpValue('');
					if (res.status == 200) {
						setAttempts(6);
						setOtpSubmitted(true);
						setShowMpin(true);
						if(res.data.memberSelectionRequired){
							setIsMemberSelectionRequired(true);
							localStorage.setItem('myUserDetails', JSON.stringify(res.data.members));
						}
					} else if (res.status == 400) {
						setInvalidOtp(res.data.message);
						setUIdErr(res.data.message);
					}
				})
			}
		} else if (isNextClicked) {
			setSubmitted(true);
			if (idValue) {
				let params = {
					"appName": "PWA",
					"hashCode": "123",
					"isForgotPassword": true,
					"isRegistration" :false,
					"type": idType ? idType : 'PHONE',
					"username": idValue
				}
				setGenPrms(params);
				// if (((alpPattern.test(idValue) || idValue.includes('@'))) && !(emailPattern.test(idValue))) {
				// 	// setUIdErr("Please enter correct email id");
				// 	setSubmitted(true);
				// 	return;
				// }
				if ( !(mobilePatern.test(idValue))) {
					if (idValue.length > 10) {
						setUIdErr("Please enter valid mobile number");
					}
					setSubmitted(true);
					return;
				}
				generateOtp(params).then((res: any) => {
					if (res.status == 200) {
						setShowOtp(true);
					} else if (res.status == 400) {
						setUIdErr(res.data.message);
						setSubmitted(false);
					}

				})
			}
		} else {
			setIsNextClicked(true);
			setIdType(selectedOption);
			history.replace({
				pathname: '/forgot',
				state: { isNext: true, type: selectedOption },
			});
		}
	}
	function onChange(event: any, type: string) {
		// setDisBtn(false);
		setUIdErr('');
		//console.log(selectedOption);
		if (type === 'id') {
			setIdValue(event.target.value);
			if (idType == 'PHONE' && !(mobilePatern.test(event.target.value))) {
				if (event.target.value.length > 10) {
					setUIdErr("Please enter valid mobile number");
				}
				setDisBtn(true);
				return;
			}
			else{
				setDisBtn(false);
			}
			// if (idType == 'EMAIL' && !(emailPattern.test(event.target.value))) {
			// 	// if (event.target.value.length > 10) {
			// 	// 	setUIdErr("Please enter correct email id");
			// 	// }else{
			// 	// 	setUIdErr("")
			// 	// }
			// 	setDisBtn(true);
			// 	return;
			// }
		 if ( !(mobilePatern.test(event.target.value))) {
				if (event.target.value.length > 10) {
					setUIdErr("Please enter valid mobile number");
				}
				// setSubmitted(true);
				setDisBtn(true);
				// return;
			} else {
				setUIdErr("");
				setDisBtn(false);
			}
			// setSubmitted(true);

		}
		if (type === 'otp') {
			if (event.length != 6) {
				setUIdErr("");
				// setUIdErr("Please enter correct OTP");
				setDisBtn(true);
			} else {
				setUIdErr("");
				// setUIdErr('');
		setInvalidOtp('');
				setDisBtn(false);
			}
			setOtpValue(event);
		}
		if (type === 'mpin') {
		
			if (event.target.value.length < 6) {
				setDisBtn(true);
			}
			if (confirmPin.length == 6 && confirmPin == event.target.value) {
				setDisBtn(false);
			}
			setMpin(event.target.value);
			if(!pinPatern.test(event.target.value)){
				setDisBtn(true);
				setUIdErr("Please enter valid MPIN");
				return;
			}
		}
		if (type === 'cpin') {
			if (mPin.length == 6 && mPin == event.target.value) {
				setDisBtn(false);
			} else {
				setDisBtn(true);
			}
			setConfirmPin(event.target.value);
			if(!pinPatern.test(event.target.value)){
				setDisBtn(true);
				setUIdErr("Please enter valid MPIN");
				return;
			}
		}
	}
	function onKeyDown(e: any) {
		
		var isAnMobile =  /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	 
		var key = e.keyCode ? e.keyCode : e.which;
		console.log(key,isAnMobile);
		if(isAnMobile){
			if (
				!(
					[66,67,4,62,5,6,28,61,111].indexOf(key) !== -1 ||					
					(key >= 7 && key <= 16)|| (key >= 144 && key <= 153)
				)
			)
				e.preventDefault();	
				return;
		}

		// if (
		// 	!(
		// 		[8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||			
		// 		(key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
		// 		(key >= 96 && key <= 105)
		// 	)
		// )
		// 	e.preventDefault();
	}
	return (
		<>
			<Header isSignup />
			{!mPinSuccess && (
				<>
					<Title>{showMpin ? 'Set New MPIN' : 'Forgot Pin'}</Title>
					<DetailsContainer>
						{!isNextClicked ? (
							<>
								<SubTitle>Recieve OTP on</SubTitle>
								<RadioGroup>
									{/* <Radio
										selected={selectedOption}
										label={'Registered Email'}
										name={'otp'}
										type='radio'
										onChange={(ev) => setSelectedOption('EMAIL')}
										value={'EMAIL'}>
										{'Registered Email'}
									</Radio> */}
									<Radio
										selected={selectedOption}
										label={'Registered Mobile Number'}
										name={'otp'}
										type='radio'
										onChange={(ev) => setSelectedOption('PHONE')}
										value={'PHONE'}>
										{'Registered Mobile Number'}
									</Radio>
								</RadioGroup>
							</>
						) : !showOtp ? (
							<>
								<SubTitle>
									Set Pin using{' '}
									{idType === 'EMAIL' ? 'email ID' : 'mobile number'}
								</SubTitle>
								<Label>
									{idType === 'EMAIL' ? 'Email ID' : 'Mobile Number'}
								</Label>
								<Input
									placeholder={`Enter ${idType === 'EMAIL' ? 'Email ID' : 'mobile number'
										}`}
									value={idValue}
									onChange={(e) => onChange(e, 'id')}
								/>
								{submitted ? (
									!idValue ? (
										<ErrorMessage>
											
										</ErrorMessage>
									) : idType === 'EMAIL' && !emailPattern.test(idValue) ? (
										<ErrorMessage></ErrorMessage>
									) : idType === 'PHONE' && !mobilePatern.test(idValue) ? (
										<ErrorMessage></ErrorMessage>
									) : (
										''
									)
								) : (
									uIdErr && <ErrorMessage>{uIdErr}</ErrorMessage>
								)}
							</>
						) : !showMpin ? (
							<Otp
								idType={idType}
								invalidOtp={invalidOtp}
								onChange={onChange}
								otpSubmitted={otpSubmitted}
								otpValue={otpValue}
								idValue={idValue}
								genOtpParams ={genOtpPrms}
								err={uIdErr}
								att={attempts}
							/>
						) : !mPinSuccess ? (
							<NewPin
								mPin={mPin}
								mPinSubmitted={mPinSubmitted}
								mpinType={mpinType}
								setCPinType={setCPinType}
								setMPinType={setMPinType}
								onChange={onChange}
								
								confirmPin={confirmPin}
								cpinType={cpinType}
								errMsg={uIdErr}
								att={attempts}
							/>
						) : (
							''
						)}
						<Button variant={disBtn ? 'disabled' : 'primary'} onClick={onClick}>
							{isNextClicked ? showMpin ? 'Set PIN' : 'Submit' : 'Next'}
						</Button>
					</DetailsContainer>
				</>
			)}
			{mPinSuccess && <SuccessPage idType={idType} />}
		</>
	);
}
