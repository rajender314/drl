import React, { useEffect, useState } from 'react';
import { Container, PageContainer, PageContent } from './layout-components';
import {
	Button,
	Dialog,
	BottomTab,
	Icon,
	Logo,
	Header,
	InsuranceCard,
	PillText,
} from '@app/components';
import { Routes } from '@app/routes';
import { Redirect, Route, useLocation } from 'react-router';
import Login from '@app/modules/login';
import { service } from '@app/@services/interceptor';
import { MyGlobalContext, useGlobalContext } from '@app/contexts';
import { Signup, Logout } from '@app/modules';
import ForgotPin from '@app/modules/forget-pin';
import { useLocation as location } from '@app/utils';
import MemberLogin from '@app/modules/member-login';
export default function Layout() {
	//const history = useHistory();
	const { isOpened, setCopy, userInfo, setUserInfo } = useGlobalContext();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { pathname } = useLocation();
	const { navigate } = location();

	if(pathname.indexOf('login') > -1 && !isOpened) {
		navigate("/files/appointments");	
	}

	const LoadComponent = () => {
		if (pathname.indexOf('login') > -1) {
			return <Login />
			// } else if (pathname.indexOf('logout') > -1) {
			// 	return <Logout />
		} else if (pathname.indexOf('signup') > -1) {
			return <Signup />
		} else if (pathname.indexOf('forgot') > -1) {
			return <ForgotPin />
		} else if (pathname.indexOf('member') > -1) {
			return <MemberLogin/>
		} else {
			return <Signup />
		}
	}
	const excludeIt = () => {
		if (pathname.indexOf('logout') > -1) {
			return false
		} else {
			return true
		}
	}
	return (
		<Container>
			{(isOpened && excludeIt()) ? (
				<LoadComponent />
			) : (
				<>
					<PageContainer status={isOpened && excludeIt()}>
						<PageContent>
							<Route
								exact
								path='/'
								render={() => {
									return <Redirect to='/files/appointments' />;
								}}
							/>
							<Route
								exact
								path='/myaccount'
								render={() => {
									return <Redirect to='/myaccount/policy' />;
								}}
							/>
							<Routes />
						</PageContent>
						{excludeIt() && <BottomTab />}
					</PageContainer>
				</>
			)}
		</Container>
	);
}
