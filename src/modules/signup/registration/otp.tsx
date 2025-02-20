import React, { useEffect } from 'react';
import OtpInput from 'react-otp-input';
import {
	ErrorMessage,
	IconContainer,
	InfoText,
	ResendText,
} from './registration-components';
import { primaryColor } from '@app/styles';
import { Icon } from '@app/components';
import { generateOtp, otpDuration } from '@app/@services/user/user';

type Props = {
	idType: string;
	otpValue: string;
	onChange: (event: any, type: string) => void;
	otpSubmitted: boolean;
	invalidOtp: string;
	idValue: string;
	err?:string;
	isLogin?: boolean;
	genOtpParams : {};
	setShowOtp?: () => void;
	time ?:number;
	att:number,
};
export default function Otp({
	idType,
	invalidOtp,
	onChange,
	otpSubmitted,
	otpValue,
	idValue,
	isLogin,
	genOtpParams,
	err,
	att,
	setShowOtp,
	time = 120,
}: Props) {
	let timerr = time;
	const [currtimerr,setTimmer] = React.useState(time);
	const [resendTime,setResendTime]= React.useState(time);
	const [attState,setAttState] = React.useState(att);
	const [otpVal,setOtpVal] = React.useState(otpValue);
	const [errMsg,seterrMsg] = React.useState(err);
	useEffect(() => {	
		otpDuration().then((res: any) => {
			if (res.status == 200) {
				timerr=res.data['timeInSeconds']
				setimer(res.data['timeInSeconds']);
						setResendTime(res.data['timeInSeconds']);
			}else{
				setimer(120);
				timerr = 120;
			}
		})	
		
		setAttState(5);
		setResendTime(timerr);
	},[timerr]);
	useEffect(() => {	
		if(err){
			setOtpVal('');
		}else{
			setOtpVal(otpValue);
		}
	},[otpValue,err]);

	function resendOtp(){
		
		if(currtimerr > 0 || (attState == 0)){
			return;
		}else{
			setOtpVal('');
			setUpdateText(false);
			let params = {
				"appName": "PWA",
				"hashCode": "123",
				"isForgotPassword": true,
				"isRegistration" :false,
				"type": idType ? idType : 'PHONE',
				"username": idValue
			}
			setAttState(attState - 1);
			generateOtp(genOtpParams).then((res: any) => {
				if (res.status == 200) {
					if(attState > 1){
						setimer(resendTime);
					}
					setUpdateText(true);
					// setShowOtp(true);
				} else if (res.status == 400) {
					seterrMsg(res.data.message);
				}
			})
		}
	}
	const [min,setMin]= React.useState<any>('');
	const [sec,setSec]= React.useState<any>('');
	const [updateText,setUpdateText] = React.useState(true);
		function setimer(time:any){
		var m = Math.floor(timerr / 60);
		var s = timerr % 60;
		let sec;
		if(s < 10){
			sec ='0'+s;
		}else{
			sec =s;
		}
		setMin(m);
		setSec(sec);
		timerr = timerr - 1;
		setTimmer(timerr);
		if(timerr > -1){
			setTimeout(function() {
				setimer(timerr);
			}, 1000);
		}
		
		//console.log(timerr);
	}
	return (
		<>
		
			{updateText && <InfoText>
				We have sent OTP to your{' '}
				{idType === 'EMAIL' ? 'email' : 'mobile number'}
			</InfoText>}
			<div
				style={{
					marginTop: 15,
					display: 'flex',
					alignItems: 'center',
					height: 22,
				}}>
				<IconContainer>
					<Icon name='tick' />
				</IconContainer>
				{idValue}
			</div>
			<OtpInput
				value={otpVal}
				onChange={(e: any) => {
					onChange(e, 'otp');
				}}
				containerStyle={{
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '15px',
					padding: '20px',
				}}
				inputStyle={{
					width: 'calc(100vw / 6 - 25px)',
					height: '62px',
					marginRight: '15px',
					fontSize: '20px',
					border: 0,
					borderBottom: '1px solid #596371',
					boxSizing: 'border-box',
				}}
				focusStyle={{
					outline: 'none',
					borderBottom: `1px solid ${primaryColor}`,
				}}
				numInputs={6}
			/>
			{err && <ErrorMessage>{err}</ErrorMessage>}
			{!err &&errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}

			{otpSubmitted
				? !otpVal && <ErrorMessage></ErrorMessage>
				: invalidOtp && <ErrorMessage>{''}</ErrorMessage>}
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<ResendText onClick={resendOtp} className= {(currtimerr > -1 || (attState == 0)) ? 'in-active' : ''}>Resend OTP {(currtimerr > -1) &&<span>{min+':'+sec}</span>}</ResendText>				
				{isLogin && setShowOtp && (
					<ResendText onClick={() => setShowOtp()}>Login Using MPIN</ResendText>
				)}
			</div>
			{/* {(attState < 5 && attState > 0) && <ErrorMessage className="m-0">
				Attempt Remaining:{attState} left,
			</ErrorMessage>}
			{(attState < 5 && attState > 0) && <ErrorMessage className="m-0">
				after 5 unsuccessful attempt
				 your account would be locked.
			</ErrorMessage>}
			{(attState == 0) && <ErrorMessage className="m-0">
				Attempt Remaining:00,
			</ErrorMessage>}
			{(attState == 0) && <ErrorMessage className="m-0">
				your account is locked. call the team for assistance
			</ErrorMessage>} */}
			{(attState == 0) && <div style={{ border: '1px solid #ccc', borderRadius: '12px', textAlign: 'center', marginTop: '35px', padding: '16px' }}>
				<p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>For further assistance, please call</p>
				<p style={{ margin: '4px 0 0', fontSize: '32px', fontWeight: 600, color: 'green' }}> 1800-1028-8227</p>
			</div>}
			
		</>
	);
}
