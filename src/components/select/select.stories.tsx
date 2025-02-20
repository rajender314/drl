import * as React from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';
import Select from './select';
export const WhiteContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 15px;
  
`
const Container = styled.div`
	position: relative;
	width: 400px;
	max-width: 100%;
`;

const options = [
	{ value: '1', label: 'Option 1' },
	{ value: '2', label: 'Option 2' },
	{ value: '3', label: 'Option 3' },
];

type Props = {
	options: any;
	onChange: () => void;
};

export default {
	title: 'Select',
	component: Select,
	argTypes: {
		onChange: { action: 'clicked' },
	},
} as Meta;

const Template: Story<Props> = (args) => (
	<Container>
		<Select {...args} />
	</Container>
);

export const Default = Template.bind({});
Default.args = {
	options: options,
};
