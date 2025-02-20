import { Icon, PillText, Select, LabReportCardLoader } from '@app/components';
import React from 'react';
import {
	FilterContainer,
	FilterLabel,
	NoDataMessage,
} from '../healthfile-components';
import {
	LabName,
	LabReportCard,
	LabReportInfo,
	LabReportsContainer,
	LabReportsList,
	Title,
} from './lab-report-components';
import { useLocation } from '@app/utils';

import { Spinner } from '@app/components/icon/icons';
type Props = {
	labReports?: any;
	loading?: boolean;
};
export default function LabReports({ labReports, loading }: Props) {
	const [filters, setFilters] = React.useState([]);
	const [selectedFilter, setSelectedFilter] = React.useState(null);
	const { navigate } = useLocation();
	React.useEffect(() => {
		let filtersData: any = [{ label: 'In Progress', value: 'IN_PROGRESS' }];
		setFilters(filtersData);
		setSelectedFilter(filtersData[0]);
		//console.log(labReports);
	}, [labReports]);
	async function OnFilterChange(e: any) {
		setSelectedFilter(e);
	}
	if (loading) {
		return <Spinner size='3px' />;
	}
	return (
		<LabReportsContainer>
			<FilterContainer>
				<FilterLabel>Filter by</FilterLabel>
				<Select
					options={filters}
					value={selectedFilter}
					onChange={(e: any) => OnFilterChange(e)}
				/>
			</FilterContainer>
			{/* <LabReportCardLoader /> */}
			<LabReportsList>
				{labReports && labReports.length ? (
					labReports.map((report: any, index: number) => (
						<LabReportCard key={index} onClick={() => navigate(`/files/reports/${report.reportID}`)}>
							<Icon name='labreport' />
							<LabReportInfo>
								<Title>{report.reportName}</Title>
								<LabName>{report.labName}</LabName>
								{/* <PillText variant='ACCEPTED'>Download</PillText> */}
							</LabReportInfo>
						</LabReportCard>
					))
				) : (
					<NoDataMessage>No reports available</NoDataMessage>
				)}
			</LabReportsList>
		</LabReportsContainer>
	);
}
