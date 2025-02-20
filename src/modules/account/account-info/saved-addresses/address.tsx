import { deleteAddress } from '@app/@services/user/user';
import { Icon } from '@app/components';
import React from 'react';
import {
	AddressContainer,
	AddressData,
	AddressText,
	DropDown,
	EllipsisContainer,
	Name,
	Option,
} from './saved-address-components';

type Props = {
	addresses: any;
	toggleAddress: (e: boolean) => void;
	setEditAddress: (e: any) => void;
	getAddressess: () => void;
};
export default function
	Address({
		addresses,
		toggleAddress,
		setEditAddress,
		getAddressess,
	}: Props) {
	const [showDropDown, setShowDropdown] = React.useState({
		show: false,
		index: 0,
	});
	const ref: any = React.useRef(null);
	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside);
	}, []);

	function handleClickOutside(event: any) {
		if (
			showDropDown.show &&
			ref.current &&
			!ref.current.contains(event.target)
		) {
			if (showDropDown.index !== event.target.tabIndex)
				showDropDown.show = false;
			setShowDropdown(showDropDown);
		}
	}
	document.addEventListener('click', handleClickOutside);
	function dropdownToggle(index: number) {
		showDropDown.show = true;
		showDropDown.index = index;
		setShowDropdown({
			...showDropDown,
			show: true,
			index: index,
		});
	}
	function EditAddress(address: any) {
		setEditAddress(address);
		toggleAddress(true);
	}
	function onRemoveAddress(id: any) {
		deleteAddress(id).then((res: any) => {
			getAddressess();
		});
	}
	return (
		<>
			{addresses.map((addr: any, index: number) => (
				<AddressContainer key={addr.id}>
					<AddressData>
						<Name>{addr.addressName}</Name>
						<AddressText>{`${addr.houseBuildingNumber}, ${addr.streetAddress}`}</AddressText>
						<AddressText>{addr.area}</AddressText>
						<AddressText>{`${addr.landmark}${addr.landmark ? ',' : ''} ${addr.city
							}`}</AddressText>
						<AddressText>{`${addr.state} - ${addr.pin}`}</AddressText>
					</AddressData>
					<div
						ref={ref}
						tabIndex={index}
						style={{
							outline: 'none',
						}}>
						<EllipsisContainer
							onClick={() => dropdownToggle(index)}
							tabIndex={index}>
							<Icon name='Ellipsis' />
							{showDropDown.show && showDropDown.index === index && (
								<DropDown>
									<Option onClick={() => EditAddress(addr)}>
										<Icon name='edit' /> Edit
									</Option>
									<Option onClick={() => onRemoveAddress(addr.id)}>
										<Icon name='delete' /> Delete
									</Option>
								</DropDown>
							)}
						</EllipsisContainer>
					</div>
				</AddressContainer>
			))}
		</>
	);
}
