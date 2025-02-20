import { Button, Header, Icon } from '@app/components';
import React from 'react';
import {
	Container,
	MapContainer,
	DetailContainer,
	SearchContainer,
	Input,
	LocationDetails,
	SelectedLocation,
	SelectedLocDetail,
	LocationTitle,
	Marker,
	CloseIcn,
	ErrorMessage,
	CloseBttn,
	ServerError
} from './add-edit-address-components';
import GoogleMapReact from 'google-map-react';
import { Spinner } from '@app/components/icon/icons';
import axios from 'axios';
import { addAddress, updateAddress } from '@app/@services/user/user';
import { Icn } from '@app/modules/cart/medication/medication-components';
type Props = {
	onClose: () => void;
	editAddress?: any;
	userInfo?: any;
	type?: string;
	customHeader?: boolean;
	height?: number;
	locateOnly?: boolean;
	getAddressess: () => void;

};
const Window = window;
const GoogleKey = 'AIzaSyCBlMrTGIa7ZgxDUGYuCUWFPlh8tO1rFWI';
export default function AddEditAddress({
	onClose,
	editAddress,
	userInfo,
	type,
	customHeader,
	locateOnly = false,
	height = 200,
	getAddressess,
}: Props) {
	const [errorMessage, setErrorMessage] = React.useState('');
	const [flatNo, setFlatNo] = React.useState('');
	const [landmark, setLandmark] = React.useState('');
	const [search, updateSearch] = React.useState('');
	const [selectedAddress, setSelectedAddress] = React.useState<any>('');
	const [city, setCity] = React.useState('');
	const [state, setState] = React.useState('');
	const [area, setArea] = React.useState('');
	const [street_address, setStreetAddress] = React.useState('');
	const [pinCode, setPinCode] = React.useState('');
	const [position, setPosition] = React.useState({
		lat: -999,
		lng: -999,
	});
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const inputRef: any = React.useRef(null);
	let searchBox: any;
	React.useEffect(() => {
		if (editAddress && !flatNo) {
			setFlatNo(editAddress.houseBuildingNumber);
			setLandmark(editAddress.landmark);
			setSelectedAddress(
				`${editAddress.houseBuildingNumber}, ${editAddress.streetAddress}, ${editAddress.area
				}, ${editAddress.landmark}${editAddress.landmark ? ',' : ''} ${editAddress.city
				}, ${editAddress.state} - ${editAddress.pin}`
			);
		}
		if (
			(!editAddress ||
				(editAddress && !editAddress.location) ||
				(editAddress.location && !editAddress.location.latitude)) &&
			navigator.geolocation &&
			position.lat === -999
		) {
			navigator.geolocation.getCurrentPosition(function (pos) {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				if (!editAddress && !selectedAddress) {
					fetchAddress(pos.coords.latitude, pos.coords.longitude);
				}
				setLoading(false);
			});
		} else if (
			editAddress &&
			editAddress.location &&
			editAddress.location.latitude &&
			position.lat === -999
		) {
			setPosition({
				lat: editAddress.location.latitude,
				lng: editAddress.location.longitude,
			});
			setLoading(false);
		}
		if (inputRef && !loading) {
			setTimeout(() => {
				var input = document.getElementById('inputRef');
				let windwoObj: any = window;
				if (windwoObj.google) {
					let google = windwoObj.google;
					// eslint-disable-next-line
					searchBox = new google.maps.places.SearchBox(input);
					searchBox.addListener('places_changed', onPlacesChanged);
				}
			}, 500);
		}
	}, [editAddress, selectedAddress, flatNo, position]);
	const onPlacesChanged = () => {
		updateSearch('');
		let lat = searchBox.getPlaces()[0].geometry.location.lat();
		let lng = searchBox.getPlaces()[0].geometry.location.lng();
		fetchAddress(lat, lng);
		setPosition({
			lat: lat,
			lng: lng,
		});
	};
	function fetchAddress(lat: any, long: any) {
		const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GoogleKey}`;
		axios.get(url).then((res) => {
			const addressData = res.data.results[0].address_components;
			setState(
				addressData.find(
					(addr: any) => addr.types.indexOf('administrative_area_level_1') > -1
				) ? addressData.find(
					(addr: any) => addr.types.indexOf('administrative_area_level_1') > -1
				).long_name : null
			);
			setCity(
				addressData.find((addr: any) => addr.types.indexOf('locality') > -1)
					.long_name
			);
			let street = addressData.find(
				(addr: any) => addr.types.indexOf('street_number') > -1
			)
				? addressData.find(
					(addr: any) => addr.types.indexOf('street_number') > -1
				).long_name
				: '';
			let route = addressData.find(
				(addr: any) => addr.types.indexOf('route') > -1
			)
				? addressData.find((addr: any) => addr.types.indexOf('route') > -1)
					.long_name
				: '';
			let premise = addressData.find(
				(addr: any) => addr.types.indexOf('premise') > -1
			)
				? addressData.find((addr: any) => addr.types.indexOf('premise') > -1)
					.long_name
				: '';
			let street_address = street ? street + ', ' + route : premise;
			setStreetAddress(street_address);
			setArea(
				addressData
					.filter((addr: any) => addr.types.indexOf('sublocality') > -1)
					.map((sub: any) => {
						return sub.long_name;
					})
					.join(', ')
			);
			setPinCode(
				addressData.find((addr: any) => addr.types.indexOf('postal_code') > -1)
					.long_name
			);
			setSelectedAddress(res.data.results[0].formatted_address);
		});
	}
	function onChange(type: string, event: any) {
		if (type === 'flat') {
			setFlatNo(event.target.value);
			setError(false);
		}
		if (type === 'landmark') {
			setLandmark(event.target.value);
		}
		if (type === 'search') {
			updateSearch(event.target.value);
		}
	}
	function onMapClicked(e: any) {
		fetchAddress(e.lat, e.lng);
		setPosition({
			lat: e.lat,
			lng: e.lng,
		});
	}
	function onSubmit() {
		if (!flatNo) {
			setError(true);
			return;
		}
		let params: any = {
			city: city || (editAddress ? editAddress.city : ''),
			landmark: landmark,
			location: {
				latitude: position.lat,
				longitude: position.lng,
			},
			pin: pinCode ? parseInt(pinCode) : editAddress ? editAddress.pin : '',
			addressName: editAddress ? editAddress.addressName : 'Home',
			area: area || (editAddress ? editAddress.area : ''),
			houseBuildingNumber: flatNo,
			isPrimary: editAddress ? editAddress.isPrimary : false,
			streetAddress:
				street_address ||
				area ||
				(editAddress ? editAddress.streetAddress : ''),
			state: state || (editAddress ? editAddress.state : ''),
		};
		// console.log(params)
		// return false

		if (editAddress) {
			params = {
				...params,
				id: editAddress.id,
			};
			updateAddress(params).then((res: any) => {
				//console.log("update ")
				//console.log(res)
				if (res.status == '200') {
					setErrorMessage('');
					getAddressess();
					onClose();
				} else {
					setErrorMessage(res.data.message)
				}
				setTimeout(() => { setErrorMessage(''); }, 3000)

			});
		} else {
			addAddress(params).then((res: any) => {
				//console.log("add ")
				//console.log(res)
				if (res.status == '200') {
					setErrorMessage('');
					getAddressess();
					onClose();
				} else {
					setErrorMessage(res.data.message)
				}
				setTimeout(() => { setErrorMessage(''); }, 3000)
			});
		}
	}
	if (loading) {
		return <Spinner size='3px' />;
	}
	const clear = () => {
		updateSearch('')
	}
	return (
		<Container>
			{customHeader !== true && <Header onClose={onClose} />}
			{customHeader == true && (
				<CloseIcn onClick={onClose}>
					<Icon name='close' />
				</CloseIcn>
			)}
			<MapContainer>
				<GoogleMapReact
					onClick={onMapClicked}
					bootstrapURLKeys={{
						key: GoogleKey,
						language: 'en',
						libraries: ['places', 'geometry', 'drawing', 'visualization'],
					}}
					defaultCenter={position}
					center={position}
					defaultZoom={18}
					style={{
						width: '100%',
						height: `${height}px`,
						position: 'relative',
					}}>
					<Marker lat={position.lat} lng={position.lng}>
						{/* <Icon name='locationPin' /> */}
						<Icon name='gmappin' />
					</Marker>
				</GoogleMapReact>
			</MapContainer>
			{!locateOnly && <DetailContainer>
				<SearchContainer>
					<Icon name='search' />
					<Input
						id={'inputRef'}
						placeholder='Search Location'
						value={search}
						onChange={(e) => onChange('search', e)}
					/>
				</SearchContainer>
				<LocationDetails>
					<SelectedLocation>
						<SelectedLocDetail>
							<LocationTitle>{selectedAddress}</LocationTitle>
						</SelectedLocDetail>
						<Button variant='secondary' width='100px' size='small'
							onClick={clear}
						>
							{/* <Icon name='swicth' />
							 */}
							{/* <Icn>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect x="1.6665" y="1.66663" width="16.6667" height="16.6667" rx="8" fill="#EB5757" />
									<path d="M12.4998 10.8333H7.49984C6.99984 10.8333 6.6665 10.5 6.6665 9.99996C6.6665 9.49996 6.99984 9.16663 7.49984 9.16663H12.4998C12.9998 9.16663 13.3332 9.49996 13.3332 9.99996C13.3332 10.5 12.9998 10.8333 12.4998 10.8333Z" fill="white" />
								</svg>
							</Icn> */}
							clear
						</Button>
					</SelectedLocation>
					<Input
						placeholder='Flat no/House no*'
						value={flatNo}
						onChange={(e) => onChange('flat', e)}
					/>
					<ErrorMessage>{error ? 'Please Enter Flat No' : ''}</ErrorMessage>
					<Input
						placeholder='Landmark (Optional)'
						value={landmark}
						onChange={(e) => onChange('landmark', e)}
					/>
					{errorMessage.length > 0 && <ServerError>{errorMessage}</ServerError>}
					<Button onClick={onSubmit}>Save and Continue</Button>



				</LocationDetails>
			</DetailContainer>}
			{locateOnly &&
				<CloseBttn>
					<Button onClick={onClose}>close</Button>
				</CloseBttn>

			}
		</Container>
	);
}
