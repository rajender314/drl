import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
	Myorders,
	OrderDetails,
	appointmentDetails,
	HealthFile,
	CancelAppointment,
	Reschedule,
	ReportDetail,
	PrescriptionDetail,
	LabReportInvoice,
	Coverage,
	AppointmentInvoice,
	Account,
	CoverageDetails,
	Cart,
	Delivery,
	Pickup,
	Order,
	MAPOrder,
	MAPConfirm,
	MAPOrderDetails,
	MAPOrderCancel,
	MAPOrderCanceled,
	MedicineInvoice,
	Confirm,
	PaymentSuccess,
	ClaimDetails,
	Log,
	Legal,
	Logout
} from '@app/modules';
import UserDetail from '@app/modules/account/user-detail';

const routes = [
	/**
	 * files routing
	 */
	{
		path: '/',
		Redirect: '/files/appointments',
		component: HealthFile,
	},

	{
		path: '/files',
		Redirect: '/files/appointments',
		component: HealthFile,
	},
	{
		path: '/files/appointments',
		component: HealthFile,
	},
	{
		path: '/files/prescriptions',
		component: HealthFile,
	},
	{
		path: '/files/labreports',
		component: HealthFile,
	},
	{
		path: '/files/paymentSuccess/:appointmentAuth/:id',
		component: PaymentSuccess,
	},
	{
		path: '/files/appointments/:appointmentId',
		component: appointmentDetails,
	},
	{
		path: '/files/appointments/:appointmentId/cancel',
		component: CancelAppointment,
	},
	{
		path: '/files/appointments/:appointmentId/invoice',
		component: AppointmentInvoice,
	},
	{
		path: '/files/appointments/:appointmentId/reschedule',
		component: Reschedule,
	},
	{
		path: '/files/reports/:reportId',
		component: ReportDetail,
	},
	{
		path: '/files/invoice/:appointmentId',
		component: AppointmentInvoice,
	},

	{
		path: '/files/prescription/:prescriptionId',
		component: PrescriptionDetail,
	},
	/**
	 * end files routing
	 */

	/**
	 * coverage routing
	 */
	{ path: '/coverage', component: Coverage },
	{ path: '/coverage/:id', component: CoverageDetails },

	/**
	 * end coverage routing
	 */
	/**
	 * orders routing
	 */
	{ path: '/orders', component: Myorders },

	{ path: '/orders/:orderId', component: OrderDetails },
	{
		path: '/order-invoice/:orderId',
		component: LabReportInvoice,
	},
	{
		path: '/orders/paymentSuccess/:orderAuth/:id',
		component: PaymentSuccess,
	},
	{ path: '/orders/:orderId/reschedule', component: Reschedule },
	{ path: '/orders/:orderId/cancel', component: CancelAppointment },

	/**
	 * end orders routing
	 */

	/**
	 * account routing
	 */
	{
		path: '/myaccount',
		Redirect: '/myaccount/policy',
		component: Account
	},
	{ path: '/myaccount/policy', component: Account },
	{ path: '/myaccount/account', component: Account },
	{ path: '/myaccount/:userId', component: UserDetail },
	{ path: '/myaccount/policy/details/:type', component: ClaimDetails },
	{ path: '/myaccount/policy/claimlog/:id', component: Log },

	/**
	 * end account routing
	 */
	{ path: '/legal', component: Legal},
	/**
	 * cart routing
	 */
	{ path: '/cart', component: Cart },
	{ path: '/cart/delivery', component: Delivery },
	{ path: '/cart/pickup', component: Pickup },
	{ path: '/cart/order', component: Order },
	{ path: '/cart/mapordersummary', component: MAPOrder },
	{ path: '/cart/maporderconfirm', component: MAPConfirm },
	{ path: '/order/maporderdetails/:orderId', component: MAPOrderDetails },
	{ path: '/order/mapordercancel/:orderId', component: MAPOrderCancel },
	{ path: '/order/mapordercanceled', component: MAPOrderCanceled },
	{ path: '/order/medicineinvoice/:orderId', component: MedicineInvoice },
	{ path: '/cart/confirm', component: Confirm },
	{ path: '/logout', component: Logout },
	
	/**
	 * end cart routing
	 */

];

export default function Routes() {


	return (
		<Switch>

			{routes.map((route, i) => (

				<Route exact path={route.path} key={i}>
					<route.component />
				</Route>

			))}
		</Switch>
	);
}
