import { Icon } from '@app/components';
import React from 'react';
import {
	SuccessContainer,
	SuccessContent,
	SuccessInner,
} from './registration-components';

type Props = {
	idType: string;
};
export default function SuccessPage({ idType }: Props) {
	return (
		<SuccessContainer>
			<Icon name='success' />
			<SuccessInner>
				<p
					style={{
						display: 'flex',
						alignItems: 'center',
						fontSize: '16px',
						lineHeight: '18px',
					}}>
					<Icon name='successTick' />
					{'    '}
					<div style={{ marginLeft: '15px' }}>
						<b>{idType === 'email' ? 'EPIN' : 'MPIN'} set successfully</b>
						<br />
						<span style={{ fontSize: '12px' }}>
							You have successfully set you PIN.
						</span>
					</div>
				</p>
				<SuccessContent>
					Please wait while we load your home page
                    <Icon name='loading' />
				</SuccessContent>
			</SuccessInner>
		</SuccessContainer>
	);
}
