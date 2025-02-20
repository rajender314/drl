import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProfileImage from './profile-image'

type Props = {
  imageUrl:string
  onClick?: () => void
}
export default {
  title: 'Profile Image',
  component: ProfileImage,
  argTypes: {
    onClick: { action: 'clicked' } ,
  },
} as Meta;

const Template: Story<Props> = (args) => <ProfileImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrl:"",
};