import { Button, Icon, Select, PrescriptionCardLoader } from '@app/components';
import { useLocation } from '@app/utils';
import moment from 'moment';
import React from 'react';
import {
	FilterContainer,
	FilterLabel,
	NoDataMessage,
} from '../healthfile-components';
import {
	DocName,
	PrescriptionCard,
	PrescriptionInfo,
	PrescriptionsContainer,
	PrescriptionsHeader,
	PrescriptionsList,
	Title,
	Validity,
	ValidityContainer,
	ValidityLabel,
} from './prescriptions-components';
import { Spinner } from '@app/components/icon/icons';

type Props = {
	prescriptions?: any;
	loading?: boolean;
};
export default function Prescriptions({ prescriptions, loading }: Props) {
	const [filters, setFilters] = React.useState([]);
	const [selectedFilter, setSelectedFilter] = React.useState(null);
	const { navigate } = useLocation();
	const [noData, setNoData] = React.useState(false);

	React.useEffect(() => {
		let filtersData: any = [
			{ label: 'All', value: 'All' },
			{ label: 'In-Progress', value: 'In-Progress' },
			{ label: 'Approved', value: 'Approved' },
			{ label: 'Disapproved', value: 'Disapproved' },
		];
		setFilters(filtersData);
		setSelectedFilter(filtersData[0]);
	}, [prescriptions]);
	async function OnFilterChange(e: any) {
		setSelectedFilter(e);
		if (e.value !== 'All') {
			setNoData(true);
		} else {
			setNoData(false);
		}
	}
	if (loading) {
		return <Spinner size='3px' />;
	}
	return (
		<PrescriptionsContainer>
			<PrescriptionsHeader>
				<FilterContainer style={{ width: '100%' }}>
					<FilterLabel>Filter by</FilterLabel>
					<Select
						options={filters}
						value={selectedFilter}
						onChange={(e: any) => OnFilterChange(e)}
					/>
				</FilterContainer>
				{/* <Button variant='warm'>Upload Prescription</Button> */}
			</PrescriptionsHeader>
			<PrescriptionsList>
				{prescriptions && prescriptions.length && !noData ? (
					prescriptions.map((item: any) => (
						<>
							{/* <PrescriptionCardLoader /> */}
							<PrescriptionCard
								key={item.prescriptionID}
								onClick={() =>
									navigate(`/files/prescription/${item.prescriptionID}`)
								}>
								<Icon name='prescription' />
								<PrescriptionInfo>
									<DocName>
										Dr. {item.doctor.firstName + ' ' + item.doctor.lastName}
									</DocName>
									<Title>{item.erxID}</Title>
								</PrescriptionInfo>
								{/* <ValidityContainer>
									<ValidityLabel>Valid till</ValidityLabel>
									<Validity>
										{moment(
											moment(item.erxExpiryDate, 'DD-MM-YYYY').toDate()
										).format('DD MMM, YYYY')}
									</Validity>
								</ValidityContainer> */}
							</PrescriptionCard>
						</>
					))
				) : (
					<NoDataMessage>Currently no prescriptions are available</NoDataMessage>
				)}
			</PrescriptionsList>
		</PrescriptionsContainer>
	);
}
