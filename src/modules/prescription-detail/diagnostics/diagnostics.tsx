import { NoDataMessage } from '@app/modules/health-file/healthfile-components';
import React from 'react';
import {
	Data,
	DataOuter,
	DefaultText,
	DefaultTextHolder,
	PrescriptionLabel,
	PrescriptionTitle,
	TestData,
	TestDetails,
} from '../prescription-detail-component';

type Props = {
	Tests?: any;
};
export default function Diagnostics({ Tests }: Props) {
	const [expandId, setExpandId] = React.useState('');
	const [isExpand, toggleExpand] = React.useState(false);
	return (
		<>
			{Tests && Tests.length ? (
				Tests.map((test: any, index: string) => (
					<DataOuter
						key={index}
						isExpand={expandId === index && isExpand}
						onClick={() => {
							setExpandId(index);
							toggleExpand(!isExpand);
						}}>
						<Data style={{ margin: 0 }}>
							<PrescriptionTitle>{test.name}</PrescriptionTitle>
							{/* <PrescriptionLabel>Test Name</PrescriptionLabel> */}
						</Data>
						{expandId === index && isExpand && <TestDetails>
							{test['testList'].length ? (
								test['testList'].map((test: any, index: string) => (
									<TestData>
										<PrescriptionTitle>{test.name}</PrescriptionTitle>
										<PrescriptionLabel>SubTest Name</PrescriptionLabel>
									</TestData>))) : <DefaultTextHolder><DefaultText>No Sub Tests Available</DefaultText></DefaultTextHolder>}
						</TestDetails>}
					</DataOuter>
				))
			) : (
				<NoDataMessage>No Data Available</NoDataMessage>
			)}
		</>
	);
}
