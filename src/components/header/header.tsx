import { getUserDetail } from '@app/@services/user/user';
import { useLocation, testImage, getShortName } from '@app/utils';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Icon, ProfileImage } from '..';
import {
	HeaderContainer,
	ProfileContent,
	ProfileName,
	Back,
	BackText,
	CartArea,
	ProfileAvatar,
	Cartcount,
	CartMemory,
	RightArea,
	LogoutArea
} from './header-components';
import { useGlobalContext } from '@app/contexts';
import { LogoutDialog } from '@app/modules';

type Props = {
	showProfile?: boolean;
	profileImage?: string;
	userData?: any;
	onClose?: any;
	isSignup?: boolean;
	CIOC?: any; // cart item operation code
};

export default function Header({
	showProfile,
	profileImage,
	userData,
	onClose,
	isSignup,
	CIOC
}: Props) {
	let history = useHistory();
	const { navigate } = useLocation();
	const [isImage, setIsImage] = useState(false)
	const { isOpened, setCopy, userInfo, cartCount } = useGlobalContext();
	const [cartItemCount, setCartItemCount] = useState<any>();
	const [cartItemCountMemory, setCartItemCountMemory] = useState<any>(0)
	const [logoutModel, setLogoutModel] = useState(false)
	React.useEffect(() => {
		getUrl()
	}, [userInfo]);

	React.useEffect(() => {
		//console.log("cartCount", cartCount)
		//if (cartCount) {
		if (sessionStorage.getItem('isCartCountFetched') == 'No') {
			let cnt = cartCount
			setCartItemCount(cnt);
			sessionStorage.setItem('fetchedCartCount', cnt.toString());
			sessionStorage.setItem('isCartCountFetched', 'Yes');
		}
		if (sessionStorage.getItem('isCartCountFetched') == 'Yes') {
			let cartCount: any = sessionStorage.getItem('fetchedCartCount');
			cartCount = parseInt(cartCount);
			setCartItemCount(cartCount);
		}
		//}
	}, [cartCount]);

	React.useEffect(() => {
		//console.log('Cart Call', CIOC)
		if (CIOC?.key == 'add' || CIOC?.key == 'remove' || CIOC?.key == 'empty' || CIOC?.key == 'reset' || CIOC?.key == 'reduceTo') {
			let cartCount: any = sessionStorage.getItem('fetchedCartCount');
			cartCount = parseInt(cartCount);
			switch (CIOC?.key) {
				case 'add': {
					let cnt = cartCount + 1;
					sessionStorage.setItem('fetchedCartCount', cnt.toString());
					setCartItemCount(cnt);
				}
					break;
				case 'remove': {
					let cnt = cartCount - 1;
					if (cnt < 0) {
						cnt = 0;
					}
					sessionStorage.setItem('fetchedCartCount', cnt.toString());
					setCartItemCount(cnt);
				}
					break;
				case 'empty': {
					let cnt = 0;
					sessionStorage.setItem('fetchedCartCount', cnt.toString());
					setCartItemCount(cnt);
				}
					break;
				case 'reset': {
					let cnt = CIOC?.value;
					sessionStorage.setItem('fetchedCartCount', cnt.toString());
					setCartItemCount(cnt);
				}
					break;
				case 'reduceTo': {
					let cnt = (cartCount - parseInt(CIOC?.value));
					if (cnt < 0) {
						cnt = 0;
					}
					sessionStorage.setItem('fetchedCartCount', cnt.toString());
					setCartItemCount(cnt);
				}
					break;
			}

		}
	}, [CIOC]);

	const getUrl = async () => {
		if (!userInfo) {
			return
		}
		await testImage(userInfo.profileImage).then((res) => {
			if (res) {
				setIsImage(true)
			} else {
				setIsImage(false)
			}
		}).catch(error => { })
	}
	function confirmLogout() {
		setLogoutModel(true)
	}
	function closeLogoutModel() {
		setLogoutModel(false)
	}
	return (
		<HeaderContainer>
			{/* =={cartCount}== */}
			{/* =={CIOC}== */}
			{logoutModel && <LogoutDialog onClose={closeLogoutModel} />}
			{showProfile ? (
				<ProfileContent onClick={() => navigate('/myaccount')}>
					{isImage ? (
						<ProfileImage imageUrl={userInfo.profileImage} />
					) : (
						<ProfileAvatar>{getShortName(userInfo)}</ProfileAvatar>
					)}
					<ProfileName>
						Hello,{' '}
						{userData
							? userData.policyHolderFullName
							: userInfo
								? `${userInfo.firstName} ${userInfo.lastName}`
								: ''}
					</ProfileName>
				</ProfileContent>
			) : (
				<Back onClick={onClose ? onClose : history.goBack}>
					<Icon name='backArrow' />
					<BackText>Back</BackText>
				</Back>
			)}
			{!isSignup && (
				<>
					<RightArea>
						
						<CartArea onClick={() => navigate('/cart')}>
							<Icon name='basket' />
							{cartItemCount > 0 && (<Cartcount>{cartItemCount}</Cartcount>)}
							<CartMemory>6</CartMemory>
						</CartArea>
						<LogoutArea onClick={() => { confirmLogout() }}><Icon name='logout' params={{ color: '#fff' }} /></LogoutArea>
					</RightArea>
				</>
			)}
		</HeaderContainer>
	);
}
