import { Button, Header } from '@app/components';
import React from 'react';
import {
	DetailsContainer,
	ErrorMessage,
	Input,
	Label,
	SubTitle,
	Title,
} from './registration-components';
import Otp from './otp';
import NewPin from './newpin';
import SuccessPage from './successpage'
import { verifyOtp, generateOtp, setPin } from '@app/@services/user/user';
import { useHistory } from 'react-router';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const mobilePatern = /^\d{10}$/;
const pinPatern = /^\d{6}$/;
const alpPattern = /[a-zA-Z]/;
export default function Registration() {
	const [showOtp, setShowOtp] = React.useState(false);
	const [idType, setIdType] = React.useState('');
	const [idValue, setIdValue] = React.useState('');
	const [submitted, setSubmitted] = React.useState(false);
	const [otpValue, setOtpValue] = React.useState('');
	const [otpSubmitted, setOtpSubmitted] = React.useState(false);
	const [invalidOtp, setInvalidOtp] = React.useState('');
	const [showMpin, setShowMpin] = React.useState(false);
	const [mPin, setMpin] = React.useState('');
	const [confirmPin, setConfirmPin] = React.useState('');
	const [cpinType, setCPinType] = React.useState('password');
	const [mpinType, setMPinType] = React.useState('password');
	const [mPinSuccess, setMpinSuccess] = React.useState(false);
	const [mPinSubmitted, setMpinSubmitted] = React.useState(false);
	const [uidError, setUIdErr] = React.useState('');
	const [currTime, setCurrTime] = React.useState(0);
	const [attempts, setAttempts] = React.useState(6);
	const [disBtn, setDisBtn] = React.useState(true);
	const [genOtpPrms, setGenPrms] = React.useState<any>();
	const [isMemberSelectionRequired, setIsMemberSelectionRequired] = React.useState(false);
	const history = useHistory();

	function onClick() {
		setUIdErr('');
		if (disBtn) {
			return;
		} setDisBtn(true);

		if (showMpin) {
			setMpinSubmitted(true);
			if (mPin && confirmPin && mPin === confirmPin) {

				setPin({ pinValue: mPin, requestType: "REGISTRATION" }).then((res: any) => {
					setAttempts(attempts - 1);
					if (res.status == 200) {
						setMpinSuccess(true);
						if (isMemberSelectionRequired) {
							history.push({
								pathname: '/member',
							})
							return;
						}
						else {
							setTimeout(() => {
								localStorage.clear();
								window.location.href = `${process.env.REACT_APP_HOMEPAGE}/login`
							}, 2000);
						}
					} else if (res.status == 400) {
						//console.log(res);
						setMpinSubmitted(false);
						setUIdErr(res.data.message);
					}
				})
			}
		} else if (showOtp) {
			setOtpSubmitted(true);
			if (otpValue) {
				let params = {
					"otp": otpValue,
					"type": idType ? idType : 'PHONE',
					"username": idValue,
					"appName": "PWA",
				}
				//console.log(otpValue);
				if (otpValue.length !== 6) {
					// setUIdErr("Please enter correct OTP");
					return;
				}
				verifyOtp(params).then((res: any) => {
					setOtpValue('');
					if (res.status == 200) {
						setShowMpin(true);
						if (res.data.memberSelectionRequired) {
							setIsMemberSelectionRequired(true);
							localStorage.setItem('myUserDetails', JSON.stringify(res.data.members));
						}
					} else if (res.status == 400) {
						//console.log(res);
						setOtpSubmitted(false);
						setUIdErr(res.data.message);
					}
				})
			}
		} else {
			let params = {
				"appName": "PWA",
				"hashCode": "123",
				"isForgotPassword": false,
				"isRegistration": true,
				"type": idType ? idType : 'PHONE',
				"username": idValue
			}
			setGenPrms(params);

			// if (((alpPattern.test(idValue) || idValue.includes('@'))) && !(emailPattern.test(idValue))) {
			// 	// setUIdErr("Please enter correct email id");
			// 	setSubmitted(true);
			// 	return;
			// }
			// else
			if (!(mobilePatern.test(idValue))) {
				if (idValue.length > 10) {
					setUIdErr("Please enter valid mobile number");
				}
				setSubmitted(true);
				return;
			}

			generateOtp(params).then((res: any) => {
				if (res.status == 200) {
					setShowOtp(true);
					let time = (res.data['otpValidity']).match(/(\d+)/);
					setCurrTime(30);
				} else if (res.status == 400) {
					setUIdErr(res.data.message);
				}
			})
			setSubmitted(true);
			// if (idValue) setShowOtp(true);
		}
	}
	function onChange(event: any, type: string) {
		setUIdErr('');
		if (type === 'id') {
			setUIdErr('');
			// if (emailPattern.test(event.target.value)) {
			// 	setIdType('EMAIL');
			// } else {
			setIdType('PHONE');
			// }
			setIdValue(event.target.value);
		}

		if (type === 'otp') {
			if (event.length != 6) {
				setUIdErr("");
				// setUIdErr("Please enter correct OTP");
				setDisBtn(true);
			} else {
				setUIdErr("");
				setDisBtn(false);
			}
			//console.log(event);
			setOtpValue(event);
		}
		if (type === 'mpin') {
			if (event.target.value.length < 6) {
				setDisBtn(true);
			}
			if (confirmPin.length == 6 && confirmPin == event.target.value) {
				setDisBtn(false);
			}
			setMpin(event.target.value); if (!pinPatern.test(event.target.value)) {
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
			if (!pinPatern.test(event.target.value)) {
				setDisBtn(true);
				setUIdErr("Please enter valid MPIN");
				return;
			}
		}
	}
	function onKeyUp(e: any) {
		//console.log(e);
		if (e.target.name == 'idvalue') {
			// if (((alpPattern.test(idValue) || idValue.includes('@'))) && !(emailPattern.test(idValue))) {
			// 	// if(uiderr)
			// 	// setUIdErr("Please enter correct email id");
			// 	setSubmitted(true);
			// 	setDisBtn(true);
			// 	// e.preventDefault();
			// 	// return;
			// }
			// else 
			if (!(mobilePatern.test(idValue))) {
				if (idValue.length > 10) {
					setUIdErr("Please enter valid mobile number");
				}
				setSubmitted(true);
				setDisBtn(true);
				// e.preventDefault();
				// return;
			}
			else {
				setUIdErr("");
				setDisBtn(false);
			}
		}

		// setSubmitted(true);
	}
	function onKeyDown(e: any) {
		//console.log(e)
		// debugger;

		// setUIdErr('');
		var isAnMobile = /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		var key = e.keyCode ? e.keyCode : e.which;
		if (isAnMobile) {
			if (
				!(
					[66, 67, 4, 62, 5, 6, 28, 61, 111].indexOf(key) !== -1 ||
					(key >= 7 && key <= 16) || (key >= 144 && key <= 153)
				)
			)
				e.preventDefault();
			return;
		}

		if (
			!(
				[8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
				(key === 65 && (e.ctrlKey || e.metaKey)) ||
				(key >= 35 && key <= 40) ||
				(key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
				(key >= 96 && key <= 105)
			)
		)
			e.preventDefault();
	}
	return (
		<>
			<Header isSignup />
			{!mPinSuccess &&
				<>
					<Title>{showMpin ? 'Set New MPIN' : 'Registration'}</Title>
					<DetailsContainer>
						{!showOtp ? (
							<>
								<SubTitle>Register using mobile number</SubTitle>
								<Label>Mobile no</Label>
								<Input
									placeholder='Enter Mobile no'
									name={'idvalue'}
									value={idValue}
									onChange={(e) => onChange(e, 'id')}
									onKeyUp={onKeyUp}
								/>
								{submitted ? (
									!idValue ? (
										<ErrorMessage></ErrorMessage>
									) : idType === 'EMAIL' && !emailPattern.test(idValue) ? (
										<ErrorMessage>Please enter correct email id</ErrorMessage>
									) : <ErrorMessage>{uidError}</ErrorMessage>
								) : (
									''
								)}
							</>
						) : !showMpin ? (
							<Otp
								idType={idType}
								invalidOtp={uidError}
								onChange={onChange}
								otpSubmitted={otpSubmitted}
								otpValue={otpValue}
								idValue={idValue}
								genOtpParams={genOtpPrms}
								err={uidError}
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
								errMsg={uidError}
								att={attempts}
							/>
						) : ('')
						}
						<Button variant={disBtn ? 'disabled' : 'primary'} onClick={onClick}>{showOtp ? showMpin ? 'Set PIN' : 'Submit' : 'Next'}</Button>

					</DetailsContainer>

				</>}
			{mPinSuccess && <SuccessPage idType={idType} />}
		</>
	);
}
