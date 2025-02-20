import React from 'react';
import {
	DetailsContainer,
	ErrorMessage,
	ForgotText,
	Label,
	LoginInput,
	SubTitle,
	Title,
} from './login-components';
import { Button, Header } from '@app/components';
import Otp from '../signup/registration/otp';
import { useHistory, useLocation } from 'react-router';
import LoginSuccess from './login-success';
import { generateOtp, verifyOtp } from '@app/@services/user/user';
import { useGlobalContext } from '@app/contexts';
// import { generateOtp, verifyOtp } from '@app/@services/interceptor';

type Props = {
	Login: () => void;
	username: string;
	password: string;
	setUserName: (e: any) => void;
	setPassword: (e: any) => void;
	submitted: boolean;
	saving: boolean,
	serverErr: string,
	setServerErr: (e: any) => void;

};
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const mobilePatern = /^\d{10}$/;
const alpPattern = /[a-zA-Z]/;
export default function LoginDefault({
	Login,
	username,
	setUserName,
	password,
	setPassword,
	submitted,
	saving,
	serverErr,
	setServerErr
}: Props) {
	const { state }: any = useLocation();

	const history = useHistory();
	const [showOtp, setShowOtp] = React.useState(false);
	const [isSubmit, setIsSubmit] = React.useState(false);
	const [showLogin, setShowLogin] = React.useState(false);
	const [idType, setIdType] = React.useState('');
	const [otpValue, setOtpValue] = React.useState('');
	const [otpSubmitted, setOtpSubmitted] = React.useState(false);
	const [invalidOtp, setInvalidOtp] = React.useState(false);
	const [loginSuccess, setLoginSuccess] = React.useState(saving);
	const [uIdErr, setUIdErr] = React.useState('');
	const { isOpened, setCopy, userInfo } = useGlobalContext();
	const [attempts, setAttempts] = React.useState(6);
	const [genOtpPrms, setGenPrms] = React.useState<any>();



	React.useEffect(() => {
		setLoginSuccess(saving);
	}, [saving])
	function openEmail() {
		setShowLogin(true);
	}

	async function openOtp(event?: any) {

		if (username) {
			let params = {
				"appName": "PWA",
				"hashCode": "123",
				"isForgotPassword": true,
				"isRegistration": false,
				"type": idType ? idType : 'PHONE',
				"username": username
			}
			setGenPrms(params);
			// if (((alpPattern.test(username) || username.includes('@'))) && !(emailPattern.test(username))) {
			// 	setUIdErr("Please enter correct email id");
			// 	// setSubmitted(true);
			// 	return;
			// }
			// else
			if (!(mobilePatern.test(username))) {
				setUIdErr("Please enter valid mobile number");
				// setSubmitted(true);
				return;
			}
			await generateOtp(params).then((res: any) => {
				if (res.status == 200) {
					setShowOtp(true);
				} else if (res.status == 400) {
					setUIdErr(res.data.message);
				}

			}).finally(() => {

			})
		}
	}
	function onClick() {
		setUIdErr('');
		if (showLogin && !showOtp) {
			openOtp();
			return;
		} else
			if (showOtp) {
				setOtpSubmitted(true);
				if (otpValue) {
					let params = {
						"otp": otpValue,
						"type": idType ? idType : 'PHONE',
						"username": username,
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
							setAttempts(5);
							console.log(res);
							if(res.data.memberSelectionRequired){
								localStorage.setItem('myUserDetails', JSON.stringify(res.data.members));
							history.push({
								pathname: '/member',
							})
							return;
							}
							else{
								setLoginSuccess(true);
								setTimeout(() => {
									window.location.href = `${process.env.REACT_APP_HOMEPAGE}/`
								}, 2000);
							}				
														
						} else if (res.status == 400) {
							setInvalidOtp(res.data.message);
							setUIdErr(res.data.message);
						}
					})
				}
			} else {
				Login();
			}
	}
	function onHandleChange(event: any, type: string) {
		setServerErr('');
		setUIdErr('');
		if (type === 'otp') {
			setOtpValue(event);
		}
		if (type === 'id') {
			// if (emailPattern.test(event.target.value)) {
			// 	setIdType('EMAIL');
			// } else {
			setIdType('PHONE');
			// }
			setUserName(event.target.value);
		}
		// if (!(mobilePatern.test(event.target.value))) {
		// 	setUIdErr("Please enter valid mobile number");
		// 	// setSubmitted(true);
		// 	return;
		// }
	}
	return (
		<>
			{!loginSuccess ? (
				<>
					{/* {console.log(state)} */}
					<Header isSignup />
					{/* <Title>Welcome Back</Title> */}
					<DetailsContainer>
						{!showLogin ? (
							<>
								<SubTitle>enter login credentials</SubTitle>
								<Label>Mobile no</Label>
								<LoginInput
									placeholder='Enter Mobile no'
									value={username}
									onChange={(e) => onHandleChange(e, 'id')}
								/>
								<ErrorMessage>
									{(submitted || isSubmit) && !username
										? 'Please Enter Mobile no'
										: ''}
								</ErrorMessage>
								{/* <ErrorMessage>
									{uIdErr ? uIdErr : ''}
								</ErrorMessage> */}
								<Label>6-digit PIN</Label>
								<LoginInput
									placeholder='Enter 6-digit PIN'
									value={password}
									type='password'

									maxLength={6}
									onChange={(e) => { setPassword(e.target.value); setServerErr('') }}
								/>

								<ErrorMessage>
									{submitted && !password ? 'Please Enter PIN' : ''}
								</ErrorMessage>
								<ErrorMessage>
									{serverErr ? serverErr : ''}
								</ErrorMessage>
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}>
									<ForgotText
										onClick={() =>
											history.push({
												pathname: '/forgot',
											})
										}>
										Forgot PIN
									</ForgotText>
									<ForgotText onClick={openEmail}>Login Using OTP</ForgotText>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										marginTop: 20,
									}}>
									<ForgotText>
										Not registered yet?{' '}
										<span
											onClick={() =>
												history.push({
													pathname: '/signup',
													state: { showRegistration: true },
												})
											}>
											<b>Register</b>
										</span>
									</ForgotText>
								</div>
							</>
						) : showOtp ? <Otp
							idType={idType}
							invalidOtp={uIdErr}
							onChange={onHandleChange}
							otpSubmitted={otpSubmitted}
							otpValue={otpValue}
							idValue={username}
							genOtpParams={genOtpPrms}
							err={uIdErr}
							isLogin={true}
							att={attempts}
							setShowOtp={() => { setShowOtp(false); setShowLogin(false) }}
						/> : (
							<>
								<SubTitle>Login using OTP</SubTitle>
								<Label>Mobile no</Label>
								<LoginInput
									placeholder='Enter Mobile no'
									value={username}
									onChange={(e) => onHandleChange(e, 'id')}
								/>
								<ErrorMessage>
									{(submitted || isSubmit) && !username
										? 'Please Enter  Mobile no'
										: ''}
								</ErrorMessage>
								<ErrorMessage>
									{uIdErr ? uIdErr : ''}
								</ErrorMessage>
							</>

						)}
						<Button onClick={onClick} type='button'>
							{showLogin ? showOtp ? 'Submit' : 'Next' : 'Login'}
						</Button>
						<SubTitle className="tit-cen">Powered by SVAAS</SubTitle>
					</DetailsContainer>
					;
				</>
			) : (
				<LoginSuccess />
			)}

		</>
	);
}
