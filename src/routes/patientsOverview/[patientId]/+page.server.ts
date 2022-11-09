import type { PageServerLoad } from './$types';
import { patientData } from '$db/Collections/patientData';

export const load: PageServerLoad = async function ({ fetch, params }) {
	const data = await patientData.find({ patientId: params.patientId }).toArray();

	const patientArray = data.map((p) => {
		return {
			id: p.patientId,
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CaughingCount: p.CaughingCount,
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: new Date(p.Date)
		};
	});

	return {
		patientData: patientArray
	};
};
