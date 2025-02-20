import { addItemsToCart, removeCartItem } from '@app/@services';
import { Button, Icon } from '@app/components';
import { NoDataMessage } from '@app/modules/health-file/healthfile-components';
import React, { useEffect } from 'react';
import {
	Data,
	DataOuter,
	MedicineData,
	MedicineDetails,
	MedicineText,
	PrescriptionLabel,
	PrescriptionTitle,
	ErrorPanel,
	PillMessage

} from '../prescription-detail-component';
import {
	ActionCards,
	ActionDescription,
	ActionDetails,
	ActionTitle,
	IconOuter,
	ButtonHolder,
	MedicineDigitization,
	AdCartButtonHolder,
	BtnHolder
} from './medication-components';
import { callbackify } from 'util';

type Props = {
	Medicines?: any;
	prescriptionData?: any;
	cartOperation?: any
};
export default function Medication({ Medicines, prescriptionData, cartOperation }: Props) {
	// console.log(Medicines)
	// console.log(prescriptionData)
	// console.log(prescriptionData.erxId)
	const [errorMessage, setErrorMessage] = React.useState({ index: -1, message: '' });
	const [expandIndex, setExpandIndex] = React.useState(-1);

	const [expandId, setExpandId] = React.useState('');
	const [isExpand, toggleExpand] = React.useState(false);
	const [addedMedicines, setAddedMedicines] = React.useState([]);
	const [medicinesList, setMedicinesList] = React.useState(Medicines);
	const [tiemRef, setTiemRef] = React.useState<any>();
	function cartAction(event: any, index: any) {		
		event.stopPropagation();
		// cartOperation('add')
		setErrorMessage({ index: -1, message: '' })
		clearTimeout(tiemRef)
		let medicine: any = medicinesList[index];

		if (medicine.pillCount == 0 && !medicine.isExistsInCart) {
			return false
		}
		if (medicine.isExistsInCart) {
			// remove medicine
			//medicine.cartId
			removeCartItem(medicine.cartId).then((response) => {
				//console.log('Remove from cart')
				//console.log(response)
				if (response && response.status != 500 && response.status != 400) {
					//console.log('success')
					medicinesList[index].isExistsInCart = false;
					setMedicinesList([...medicinesList])
					cartOperation({ key: 'remove', value: 0 })
				} else {
					console.log('Data Error')
					setErrorMessage({ index: index, message: response.data.message })
					let tRefe = setTimeout(() => {
						setErrorMessage({ index: -1, message: '' })
					}, 3000)
					setTiemRef(tRefe)
				}

			}, ((error) => {
				console.log('API Error')
				//console.log(error.data.message)
				//setErrorMessage({ index: index, message: error.data.message })
			}))


		} else {
			//add medicine

			let params = [
				{
					id: medicine.id,
					partner: '',
					prescriptionId: prescriptionData.id,
					quantity: medicine.pillCount,
					type: 'MEDICINES',
					deliveryType: "MEDICINE_STORE_PICKUP"
				},
			];
			addItemsToCart(params).then((response) => {
				// console.log('Add to cart')
				// console.log(response)
				if (response && response.status != 500 && response.status != 400) {
					let cartId = Object.values(response.cartIds)[0];
					medicinesList[index].cartId = cartId;
					//console.log('success')
					medicinesList[index].isExistsInCart = true;
					setMedicinesList([...medicinesList])
					cartOperation({ key: 'add', value: 0 })
				} else {
					console.log('Data Error')
				}

			}, ((error) => {
				console.log('API Error')
				if (error && error.data) {
					setErrorMessage({ index: index, message: error.data.message })
				}
				let tRefe = setTimeout(() => {
					setErrorMessage({ index: -1, message: '' })
				}, 3000)
				setTiemRef(tRefe)
			}))

		}

	}

	return (
		<>

			{medicinesList && medicinesList.length ? (
				<>
					{medicinesList.map((medicine: any, index: number) => (
						<DataOuter
							key={index}
							isExpand={expandId === medicine.id && isExpand}
							onClick={() => {

								setExpandIndex((currentIndex) => {
									if (currentIndex == index) {
										return -1;
									} else {
										return index;
									}
								})
								toggleExpand(!isExpand);
							}}>
							<Data
								style={{
									margin: 0,
									display: 'flex',
									justifyContent: 'space-between',
								}}>
								<PrescriptionTitle>{medicine.name}</PrescriptionTitle>

								<AdCartButtonHolder>
									{/* {JSON.stringify(medicine.pillCount)} */}
									{/* variant={(prescriptionData.erxId && !medicine.isExistsInCart) ? 'secondary' : 'disabled'} */}
									{/* {medicine.id} */}

									{medicine.id && <>
										<BtnHolder>
											<Button
												variant={(medicine.pillCount == 0 && !medicine.isExistsInCart) ? 'disabled' : 'secondary'}
												size='small'
												onClick={(e) => cartAction(e, index)}>
												<Icon name='addcart' />
												{medicine.isExistsInCart ? 'Remove from Cart' : 'Add to Cart'}
											</Button>
										</BtnHolder>
										{medicine.pillCount == 0 && !medicine.isExistsInCart && (<PillMessage>Zero pill(s) available to be purchased</PillMessage>)}
										{errorMessage.index == index && medicine.pillCount != 0 && (<ErrorPanel>Apologies! Please try again.</ErrorPanel>)}
									</>
									}
									{!medicine.id && !medicine.isExistsInCart && <>
										<BtnHolder>
											<Button
												variant='disabled'
												size='small'
												onClick={(e) => e.stopPropagation()}>
												<Icon name='addcart' />
												{medicine.isExistsInCart ? 'Remove from Cart' : 'Add to Cart'}
											</Button>
										</BtnHolder>
										<PillMessage>Digitisation of prescription is in progress</PillMessage>
									</>
									}
								</AdCartButtonHolder>

							</Data>


							{expandIndex == index &&
								<MedicineDetails>
									<MedicineData>
										<MedicineText>{medicine.pillCount} Pills</MedicineText>
										<PrescriptionLabel>Pill Count</PrescriptionLabel>
									</MedicineData>
									<MedicineData>
										<MedicineText>{medicine.form}</MedicineText>
										<PrescriptionLabel>Form</PrescriptionLabel>
									</MedicineData>
									<MedicineData>
										<MedicineText>{medicine.dosage}</MedicineText>
										<PrescriptionLabel>Dosage</PrescriptionLabel>
									</MedicineData>
									<MedicineData>
										<MedicineText>{medicine.timing}</MedicineText>
										<PrescriptionLabel>Timing</PrescriptionLabel>
									</MedicineData>
									<MedicineData>
										<MedicineText>{medicine.frequency}</MedicineText>
										<PrescriptionLabel>Frequency</PrescriptionLabel>
									</MedicineData>
									<MedicineData>
										<MedicineText>{medicine.duration}</MedicineText>
										<PrescriptionLabel>Duration</PrescriptionLabel>
									</MedicineData>
								</MedicineDetails>
							}
						</DataOuter>
					))}

					<ActionCards>
						<Icon name='complaint' />
						<ActionDetails>
							<ActionTitle>Complaints</ActionTitle>
							<ActionDescription>
								{prescriptionData.complaints || 'No data available'}
							</ActionDescription>
						</ActionDetails>
					</ActionCards>
					<ActionCards>
						<Icon name='advice' />
						<ActionDetails>
							<ActionTitle>Doctor’s Advice</ActionTitle>
							<ActionDescription>
								{prescriptionData.advice || 'No data available'}
							</ActionDescription>
						</ActionDetails>
					</ActionCards>
					<ActionCards>
						<IconOuter>
							<Icon name='diagnosis' />
						</IconOuter>
						<ActionDetails>
							<ActionTitle>Diagnosis</ActionTitle>
							<ActionDescription>
								{prescriptionData.diagnosis || 'No data available'}
							</ActionDescription>
						</ActionDetails>
					</ActionCards>
				</>
			) : (
				<NoDataMessage>No Data Avialable</NoDataMessage>
			)}
		</>
	);
}
