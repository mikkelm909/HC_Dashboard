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

	let mergedDataList: any[] = [{}];

	function mergedData() {
		const newArray: any[] = [];
		formatPatients.forEach((p) => {
			formatPatientData.forEach((pd) => {
				if (p.id == pd.patientId) {
					const newObject = {
						id: pd.patientId,
						name: p.name,
						BreathingRate: pd.BreathingRate,
						BreathingDepth: pd.BreathingDepth,
						SPO2: pd.SPO2,
						CaughingCount: pd.CaughingCount,
						HeartRate: pd.HeartRate,
						HRV: pd.HRV,
						ArythmiaCount: pd.ArythmiaCount,
						BodyTemperature: pd.BodyTemperature,
						Date: new Date(pd.Date)
					};
					const foundObject = newArray.find((obj) => obj.name == newObject.name);
					if (foundObject == null) {
						newArray.push(newObject);
					} else if (foundObject.Date < newObject.Date) {
						const index = newArray.indexOf(foundObject);
						newArray.splice(index);
						newArray.push(newObject);
					}
				}
			});
		});
		mergedDataList = newArray;
	}

	mergedData();

	console.log(mergedDataList);

	return {
		patients: formatPatients,
		patientData: formatPatientData,
		merged: mergedDataList
	};
};
