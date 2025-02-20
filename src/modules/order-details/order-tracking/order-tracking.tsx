import { ProgressBar } from '@app/@lib';
import { Button } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import { useLocation } from '@app/utils';
import moment from 'moment';
import React from 'react';
import { CardTitle } from '../order-details-components';
import {
	ButtonContainer,
	TrackingContainer,
} from './order-tracking-components';
import * as _ from 'lodash'

type Props = {
	orderId?: any;
	trackingDetails?: any;
	orderData?: any;
	selectedTab?: any;
};
export default function OrderTracking({
	orderId,
	trackingDetails,
	orderData,
	selectedTab,
}: Props) {
	const { navigate } = useLocation();
	const [orderTrack, setOrderTrack] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [disCancel, setDisCancel] = React.useState(false);
	React.useEffect(() => {
		let tIndex = -1;
		let idx = -1;
		let odrReIdx = -1;
		let track = trackingDetails.map((item: any, index: any) => {
			let label = item.event && item.event.replace(/_/g, ' ');
			let desc = item.description ? item.description.replace(/_/g, ' ') : '';
			let content = '';
			if (item.completed) {
				if (idx == -1) {
					idx = index;
				}
			}
			if (item.event == "TEST_COMPLETED") {
				label = "ORDER COMPLETED"
				desc = "Order Completed"
				tIndex = index;
			} else if (item.event.toLowerCase() == "phlebotomist_assigned" || item.event.toLowerCase() == "phlebo_assigned") {
				content = orderData['phlebotomistDetails'];
			} else if (item.event.toLowerCase() == "phlebo_started" || item.event.toLowerCase() == "phlebotomist_started") {
				if (item.completed) {
					setDisCancel(true);
					odrReIdx = _.findIndex(trackingDetails, function (o: any) { return o.event.toLowerCase() == 'order_rescheduled' });
				}

			} else if (item.event.toLowerCase().includes('test_in_progress')) {
				setDisCancel(item.completed);
			}
			return {
				label: label,
				subtitle: item.timeStamp
					? moment(item.timeStamp).format('dddd, DD MMM YYYY  h:mm A').toString()
					: '',
				detail: content,
				name: item.event,
				content: desc,
			};
		});
		if (odrReIdx > -1) {
			track.splice(odrReIdx, 1)
		}
		if (tIndex > -1) {
			track.splice(tIndex + 1, (track.length) - tIndex)
		}
		if (idx > -1) {
			track.splice(0, idx)
		}
		setOrderTrack(track);
		setLoading(false);
	}, [trackingDetails]);
	function getStartingStep() {
		if (
			trackingDetails &&
			trackingDetails.length &&
			trackingDetails[trackingDetails.length - 1].completed
		) {
			return trackingDetails.length;
		}
		if (trackingDetails && trackingDetails.length) {
			return trackingDetails.filter((track: any) => track.completed).length;
		}
		return orderTrack.length - 1;
	}
	if (loading) {
		return <Spinner size='3px' />;
	}
	return (
		<TrackingContainer>
			<CardTitle>
				Tracking Details
			</CardTitle>
			<ProgressBar
				startingStep={getStartingStep()}
				onSubmit={() => { }}
				steps={orderTrack}
				stepClass='vertical'
				progressClass='vertical'
				showLabel
			/>
			{orderData.orderStatus === 'COMPLETED' ||
				orderData.orderStatus === 'order Completed/Reports delivered' ? (
				''
			) : (
				<ButtonContainer>
					{!orderData.labDetail && (
						<Button
							size='large'
						// onClick={() => navigate(`/orders/${orderId}/reschedule`)}
						>
							Get Direction
						</Button>
					)}
					{(trackingDetails &&
						trackingDetails.filter(
							(track: any) => track.event === 'LAB_VISITED' && track.completed
						).length) ||
						getStartingStep() === trackingDetails.length ? (
						''
					) : !disCancel ? (
						<Button
							size='large'
							variant='secondary'
							onClick={() => navigate(`/orders/${orderId}/cancel`)}>
							Cancel Order
						</Button>
					) : ('')}
				</ButtonContainer>
			)}
		</TrackingContainer>
	);
}
