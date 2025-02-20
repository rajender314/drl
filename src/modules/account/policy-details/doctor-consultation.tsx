import React from 'react';
import { InnerData, Field, Label, Text } from './policy-details-components';

export default function DoctorConsultation() {
	return (
		<InnerData>
			<Field>
				<Label>Physical Visit</Label>
				<Text>General Physician</Text>
			</Field>
			<Field>
				<Label></Label>
				<Text>Specialist</Text>
			</Field>
			<Field>
				<Label></Label>
				<Text>Super Specialist</Text>
			</Field>
			<Field>
				<Label>Teleconsultation</Label>
				<Text>General Physician</Text>
			</Field>
			<Field>
				<Label></Label>
				<Text>Specialist</Text>
			</Field>
			<Field>
				<Label>Co Pay</Label>
				<Text>₹ or %</Text>
			</Field>
			<Field>
				<Label>Deductable</Label>
				<Text>₹ or %</Text>
			</Field>
			<Field>
				<Label>Sum Assured</Label>
				<Text>₹ or %</Text>
			</Field>
			<Field>
				<Label>Visit Cap</Label>
				<Text>₹ or %</Text>
			</Field>
			<Field>
				<Label>Limit Per Claim</Label>
				<Text>₹ or %</Text>
			</Field>
			<Field>
				<Label>Reimbursement Rules</Label>
				<Text>Deductible/ Co-pay Rule</Text>
			</Field>
		</InnerData>
	);
}
