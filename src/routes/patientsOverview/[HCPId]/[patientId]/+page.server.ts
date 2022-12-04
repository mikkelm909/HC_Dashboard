import type { PageServerLoad } from './$types';
import { patientData } from '$db/Collections/patientData';
import { patients } from '$db/Collections/patients';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async function ({ params }) {
	const data = await patientData.find({ patientId: params.patientId }).sort({ Date: 1 }).toArray();
	const patient = await patients.find({ _id: ObjectId(params.patientId) }).toArray();



	const patientArray = patient.map((p) => {
		let thresholds;
		let exist = p.HCProThresholds.find((value) => {
			thresholds = value;
			return value.HCPro == params.HCPId;
		});

		if (exist) {
			return {
				id: p._id.toString(),
				name: p.name,
				age: p.age,
				sex: p.sex,
				weight: p.weight,
				height: p.height,
				HCProThresholds: thresholds
			};
		}
	});


	const newObject = {
		name: ''
	};

	patientArray.forEach((p) => {
		if (p.id == params.patientId) {
			newObject.name = p.name;
		}
	});

	const patientDataArray = data.map((p) => {
		return {
			id: p.patientId,
			name: newObject.name,
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CoughingCount: p.CaughingCount,
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: new Date(p.Date)
		};
	});




	return {
		patient: patientArray,
		patientData: patientDataArray,
		id: params.patientId
	};
};
