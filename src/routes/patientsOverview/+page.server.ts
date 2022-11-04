import type { PageServerLoad } from './$types';
import type { Load } from '@sveltejs/kit';
import { patients } from '$db/Collections/patients';
import { patientData } from '$db/Collections/patientData';

export const load: PageServerLoad = async function () {
	const patientList = await patients.find({}).toArray();
	const patientDataList = await patientData.find({}).toArray();

	const formatPatients = patientList.map((p) => {
		return {
			id: p._id.toString(),
			name: p.name,
			age: p.age,
			sex: p.sex,
			weight: p.weight,
			height: p.height
		};
	});

	const formatPatientData = patientDataList.map((p) => {
		return {
			id: p._id.toString(),
			patientId: p.patientId,
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CaughingCount: p.CaughingCount, //change name on mongo
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: p.Date
		};
	});

	const mergedPatientData = formatPatients.map((p) => {
		formatPatientData.find((patient) => patient.patientId === p.id && patient), p;
	});

	return {
		patients: formatPatients,
		patientData: formatPatientData,
		totalPatientData: mergedPatientData
	};
};
