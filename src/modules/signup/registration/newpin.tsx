import React from 'react';
import Icon from '@app/components/icon';
import {
	ErrorMessage,
	Input,
	InputContainer,
	SubTitle,
} from './registration-components';

type Props = {
	mPin: string;
	onChange: (event: any, type: string) => void;
	onKeyDown?: (e: any) => void;
	mpinType: string;
	cpinType: string;
	setMPinType: (e: any) => void;
	setCPinType: (e: any) => void;
	confirmPin: string;
	mPinSubmitted: boolean;
	errMsg: string;
	att: number;
};
export default function NewPin({
	mPin,
	mPinSubmitted,
	mpinType,
	setCPinType,
	setMPinType,
	onChange,
	onKeyDown,
	confirmPin,
	cpinType,
	att,
	errMsg
}: Props) {
	return (
		<>
			<SubTitle>Enter a 6 digit pin</SubTitle>
			<br />
			<InputContainer>
				<Input
					placeholder='Enter PIN'
					value={mPin}
					onChange={(e) => onChange(e, 'mpin')}
					onKeyDown={onKeyDown}
					pattern='[0-9]'
					maxLength={6}
					type={mpinType}
				/>

				<div
					style={{
						position: 'absolute',
						right: '20px',
					}}
					onClick={() =>
						setMPinType(mpinType === 'password' ? 'text' : 'password')
					}>
					<Icon name={mpinType === 'password' ? 'hidePass' : 'showPass'} />
				</div>
			</InputContainer>
			{/* <ErrorMessage>
				{mPinSubmitted && !mPin ? 'Please Enter PIN' : ''}
			</ErrorMessage> */}
			<ErrorMessage>
				{mPin && (mPin.length >6) ? 'Please Enter Correct PIN' : ''}
			</ErrorMessage>
			<InputContainer>
				<Input
					placeholder='Confirm PIN'
					value={confirmPin}
					onChange={(e) => onChange(e, 'cpin')}
					pattern='[0-9]'
					onKeyDown={onKeyDown}
					type={cpinType}
					maxLength={6}
				/>
				<div
					style={{
						position: 'absolute',
						right: '20px',
					}}
					onClick={() =>
						setCPinType(cpinType === 'password' ? 'text' : 'password')
					}>
					<Icon name={cpinType === 'password' ? 'hidePass' : 'showPass'} />
				</div>
			</InputContainer>

			<ErrorMessage>
				{mPinSubmitted && !confirmPin
					? ''
					: mPin && confirmPin.length >5 && mPin !== confirmPin
						? 'Please make sure the entered PIN matched'
						: ''}
			</ErrorMessage>
			{errMsg && <ErrorMessage >
				{errMsg}
			</ErrorMessage>}
			{/* {(att < 5 && att > 0) && <ErrorMessage className="m-0">
				Attempt Remaining:{att} left,
			</ErrorMessage>}
			{(att < 5 && att > 0) && <ErrorMessage className="m-0">
				after 5 unsuccessful attempt
				to set mpin your account would be locked.
			</ErrorMessage>}
			{(att == 0) && <ErrorMessage className="m-0">
				Attempt Remaining:00,
			</ErrorMessage>}
			{(att == 0) && <ErrorMessage className="m-0">
				your account is locked. Set
				MPIN using OTP link or call the team for assistance
			</ErrorMessage>} */}
			{(att == 0) && <div style={{ border: '1px solid #ccc', borderRadius: '12px', textAlign: 'center', marginTop: '35px', padding: '16px' }}>
				<p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>For further assistance, please call</p>
				<p style={{ margin: '4px 0 0', fontSize: '32px', fontWeight: 600, color: 'green' }}> 1800-1028-8227</p>
			</div>}


		</>
	);
}
