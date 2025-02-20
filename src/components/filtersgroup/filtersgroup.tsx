import React from 'react';
import { Button, Icon, Radio, Checkbox } from '..';
import {
	ArrowDown,
	Backdrop,
	ButtonContainer,
	Close,
	FilterOuter,
	FiltersOuter,
	GroupLabel,
	InnerContainer,
	RadioGroup,
	SelectedOption,
} from './filtergroup-components';
import * as _ from 'lodash'

type Props = {
	onApply?: (e: any, isSet?: boolean) => void;
	filters?: any;
};
export default function FiltersGroup({ onApply, filters }: Props) {
	const [showFilters, toggleShowFilters] = React.useState(false);
	const [selectedOptions, setSelectedOptions] = React.useState<any>([]);
	const [dropDownOptions, setDropDownOptions] = React.useState<any>([]);
	// eslint-disable-next-line
	const [filterUpdated, setFilterUpdated] = React.useState(false);
	const [filterValues, setFilterValues] = React.useState(filters)

	React.useEffect(() => {
		//console.log(filters);
		if (!selectedOptions.length) {
			let selectedStatus = (filters['status'] && filters['status'].length ) ? filters['status'].filter((data: any, index: any) => (data['default'])) : [];
			let selectedTime = (filters['time']&& filters['time'].length) ? filters['time'].filter((data: any, index: any) => (data['default'])) : [];
			let filterOptions = [...selectedStatus, ...selectedTime];
			setDropDownOptions(filterOptions);
			setSelectedOptions(filterOptions);
		}
	}, [selectedOptions, filters]);
	function onClick() {
		document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
		toggleShowFilters(true);
	}
	function onClose() {
		document.getElementsByTagName('body')[0].style.overflowY = 'initial';
		setSelectedOptions(dropDownOptions);
		if (onApply) {
			onApply(dropDownOptions, false);
		}
		toggleShowFilters(false);
	}
	function onChange(event: any, value: any, type: any, i: any) {
		let filtersData = { ...filterValues }
		if (type == 'checkbox') {
			filtersData['status'][i]['default'] = !filtersData['status'][i]['default'];

			if (filtersData['status'][i]['code'] == 'ALL') {
				filtersData['status'].map((option: any, index: number) => (
					option['default'] = filtersData['status'][i]['default']
				))
			} else {
				let currActiveData = filtersData['status'].filter((data: any, index: any) => (data['default'] && data['code'] != 'ALL'));
				let idx = _.findIndex(filtersData['status'], function (o: any) { return o.code == 'ALL' });
				if (currActiveData.length == (filtersData['status'].length - 1)) {
					if (idx > -1) {
						filtersData['status'][idx]['default'] = true;
					}
				}
				else {
					if (idx > -1) {
						filtersData['status'][idx]['default'] = false;
					}
				}
			}
		}
		else if (type == 'radio') {
			if (!filtersData['time'][i]['default']) {
				let idx = _.findIndex(filtersData['time'], function (o: any) { return o.default == true });
				if (idx > -1) {
					filtersData['time'][idx]['default'] = false;
				}
				filtersData['time'][i]['default'] = true;
			}
		}
		let selectedStatus = filtersData['status'].filter((data: any, index: any) => (data['default']));
		let selectedTime = filtersData['time'].filter((data: any, index: any) => (data['default']));
		//console.log(selectedStatus);
		setFilterValues(filtersData);
		setSelectedOptions([...selectedStatus, ...selectedTime]);
		// let newOptions = [...selectedOptions];
		// if (type == 'radio') {
		// 	let index =
		// 		newOptions.findIndex((item: any) => item.group === event.target.name) > -1
		// 			? newOptions.findIndex((item: any) => item.group === event.target.name)
		// 			: selectedOptions.length;
		// 	newOptions[index] = { ...value, group: event.target.name };
		// } else {

		// 	let index =
		// 		newOptions.findIndex((item: any) => item.group === event.target.name) > -1
		// 			? newOptions.findIndex((item: any) => item.group === event.target.name) : selectedOptions.length;
		// 	newOptions[index] = { ...value, group: event.target.name };
		// }

		// setSelectedOptions(newOptions);
		// setFilterUpdated(true);
		// setTimeout(() => {
		// 	setFilterUpdated(false);
		// }, 100);
		// console.log(selectedOptions, event, value);

	}
	function onApplyFilters() {
		if(selectedOptions.length <2){
			return;
		}
		setDropDownOptions(selectedOptions);
		if (onApply) {
			onApply(selectedOptions, true);
		}
		toggleShowFilters(false);
		document.getElementsByTagName('body')[0].style.overflowY = 'initial';
	}
	function removeFilter(option: any, event: any) {
		let filtersData = { ...filterValues };
		let stausList = (filtersData['status'] && filtersData['status'].length ) ? filtersData['status'].filter((data: any, index: any) => (data['default'])) : [];
		// let stausList = _.findIndex(filtersData['status'], function (o: any) { return o.default});
		if(stausList.length < 2){
			return;
		}
		//console.log(stausList);
		let idx = _.findIndex(filtersData['status'], function (o: any) { return o.code == option.code });
		let idx1 = _.findIndex(filtersData['time'], function (o: any) { return o.code == option.code });
		if (idx > -1) {
			filtersData['status'][idx]['default'] = false;
			if (option.code != 'ALL') {
				let idxAll = _.findIndex(filtersData['status'], function (o: any) { return o.code == 'ALL' });
				if (idxAll > -1) {
					filtersData['status'][idxAll]['default'] = false;
				}
			}
		}

		// if (idx1 > -1) {
		// 	filtersData['time'][idx]['default'] = false;
		// }
		setFilterValues(filtersData);
		event.stopPropagation();
		let oldOptions = selectedOptions;
		let spliceIdx = _.findIndex(oldOptions, function (o: any) { return o.code == option.code });		
		if (idx1 < 0) {
			oldOptions.splice(spliceIdx, 1);
		}
		let splice1Idx = _.findIndex(oldOptions, function (o: any) { return o.code == 'ALL' });
		if (splice1Idx > -1) {
			oldOptions.splice(splice1Idx, 1);
		}
		setDropDownOptions(oldOptions);
		setSelectedOptions(oldOptions);
		if (onApply) {
			onApply(oldOptions, true);
		}
		// onApplyFilters();
		setFilterUpdated(true);
		setTimeout(() => {
			setFilterUpdated(false);
		}, 100);
	}
	return (
		<>
			<FilterOuter onClick={onClick}>
				{dropDownOptions.length ? (
					dropDownOptions.map((option: any, index: number) => (
						<>
							{option.code != 'ALL' && <SelectedOption key={option.code + index}>
								{option.name}{' '}
								<Close onClick={(e) => removeFilter(option, e)}>
									<Icon name='close' />
								</Close>
							</SelectedOption>}
						</>
					))
				) : (
					<span style={{ fontSize: '15px', color: '#565656' }}>
						Select filters
					</span>
				)}

				<ArrowDown>
					<Icon name='arrowDown' />
				</ArrowDown>
			</FilterOuter>
			{showFilters && (
				<>
					<Backdrop onClick={onClose} />
					<FiltersOuter>
						<InnerContainer>

							<div key={"status"} style={{ marginBottom: '32px' }}>
								<GroupLabel>Order Status</GroupLabel>
								<RadioGroup>
									{filterValues['status'].map((option: any, index: number) => (
										<Checkbox
											key={option.code + index}
											label={option.name}
											checked={option.default}
											name={option.code}
											onChange={(ev) => onChange(ev, option, 'checkbox', index)}
											value={option.code}>
											{option.label}
										</Checkbox>))}
									{/* {item.options.map((option: any, index: number) => (
											<>
												{(!item.type || item.type != 'checkbox') && <Radio
													key={option.value + index}
													selected={
														selectedOptions.findIndex(
															(item: any) => item.value === option.value
														) > -1
															? option.value
															: ''
													}
													label={option.label}
													name={item.label}
													type='radio'
													onChange={(ev) => onChange(ev, option, 'radio')}
													value={option.value}>
													{option.label}
												</Radio>}
												{item.type && item.type == 'checkbox' && <Checkbox
													key={option.value + index}
													label={option.label}
													checked={option.default}
													name={option.value + item.key}
													onChange={(ev) => onChange(ev, option, 'checkbox')}
													value={option.value}>
													{option.label}
												</Checkbox>}
											</>
										))} */}
								</RadioGroup>
							</div>
							{filterValues['time'] && filterValues['time'].length && <div key={"time"}>
								<GroupLabel>Time</GroupLabel>
								<RadioGroup>
									{filterValues['time'].map((option: any, index: number) => (
										<Radio
											key={option.code + index}
											selected={option.default ? option.code : ''}
											label={option.name}
											name={'time'}
											type='radio'
											onChange={(ev) => onChange(ev, option, 'radio', index)}
											value={option.code}>
											{option.name}
										</Radio>
									))}
								</RadioGroup>
							</div>}
							<ButtonContainer>
								<Button variant={selectedOptions.length > 1 ? 'primary' : 'disabled'} width='100%' onClick={() => onApplyFilters()}>
									Apply Filters
								</Button>
							</ButtonContainer>
						</InnerContainer>
					</FiltersOuter>
				</>
			)}
		</>
	);
}
