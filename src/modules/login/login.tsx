import { Button } from '@app/components';
import { useLocation as UtilLocation } from '@app/utils';
import React, { useEffect } from 'react';
import {
	Container,
	ErrorMessage,
	InnerContainer,
	Input,
	SubTitle,
} from './login-components';
import logo from '../../assets/images/favicon-96x96.png';
import {useHistory, useLocation } from 'react-router';
import LoginDefault from './login-default';
import { login } from '@app/@services/user/user';

export default function Login() {
	useEffect(() => {
		localStorage.clear();
	}, [])
	const [username, setUserName] = React.useState('');
	const [password, setPassword] = React.useState('');
	const { navigate } = UtilLocation();
	const [submitted, setSubmitted] = React.useState(false);
	const [serverErr, setServerErr] = React.useState('');
	const [saving, setSaving] = React.useState(false);
	const { pathname } = useLocation();
	const history = useHistory();
	const mobilePatern = /^\d{10}$/;

	const Login = () => {
		setSubmitted(true);
		if (username && password) {
			let params = {
				username: username,
				pinValue: password,
				type: 'PHONE',
				appName: "PWA",		
				};
				if (!(mobilePatern.test(username))) {
					setServerErr("Please enter valid mobile number");
					// setSubmitted(true);
					return;
				}
			// if (username.indexOf('@') > -1) {
			// 	params = { ...params, type: 'PHONE' };
			// }

			login(params).then((res: any) => {
				// console.log(res);
				if (res.status == 200) {
					if(res.data.memberSelectionRequired){
						localStorage.setItem('myUserDetails', JSON.stringify(res.data.members));
					history.push({
						pathname: '/member',
					})
					return;
					}
					else{
					setSaving(true);
					setTimeout(() => {
						window.location.href = `${process.env.REACT_APP_HOMEPAGE}/`
					}, 2000);
					
				}
				} else if (res.status == 400) {
					setServerErr(res.data.message);
				}
				// return;



			});
		}
	};

	return (
		<>
			{pathname.indexOf('login') > -1 ? (
				<LoginDefault
					Login={Login}
					setUserName={setUserName}
					password={password}
					setPassword={setPassword}
					submitted={submitted}
					username={username}
					saving={saving}
					serverErr={serverErr}
					setServerErr={setServerErr}
				/>
			) : (
				<Container>
					<InnerContainer>
						<img src={logo} alt='' style={{ margin: '0 0 20px' }} />
						<Input
							placeholder='Enter Username'
							value={username}
							onChange={(e) => setUserName(e.target.value)}
						/>
						<ErrorMessage>
							{submitted && !username ? 'Please Enter username' : ''}
						</ErrorMessage>
						<Input
							placeholder='Enter Pin'
							value={password}
							type='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<ErrorMessage>
							{submitted && !password ? 'Please Enter Pin' : ''}
						</ErrorMessage>

						<Button onClick={Login} type='button'>
							Login
						</Button>
					</InnerContainer>
				</Container>
			)}
		</>
	);
}
