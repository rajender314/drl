import React from 'react';
import { Tab, TabContainer } from './tab-components';

type Props = {
	selectedLabel?: string;
	onClick: (e: any) => void;
	labels?: any;
	type?:'primary' | 'secondary' | 'custom-yellow'
};
export default function Tabs({ selectedLabel, onClick, labels, type }: Props) {
	return (
		<TabContainer>
			{labels && labels.length
				? labels.map((label: any,index:number) => (
						<Tab type={type} key={label+index} style={{width:`calc(100% / ${labels.length})`}} isSelected={selectedLabel === label} onClick={() => onClick(label)}>
							{label}
						</Tab>
				  ))
				: ''}
		</TabContainer>
	);
}
