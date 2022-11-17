import type { PageServerLoad } from './$types';
import type { Load } from '@sveltejs/kit';
import { patients } from '$db/Collections/patients';
import { patientData } from '$db/Collections/patientData';
import { storeHCPId } from '$protectedMongoId';

export const load: PageServerLoad = async function ({ params }) {
	const patientList = await patients.find({ assingedHealthCarePro: params.HCPId }).toArray();
	const patientDataList = await patientData.find({}).toArray();

	const formatPatients = patientList.map((p) => {
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
						Name: p.name,
						Last_14Days: 0,
						Risk_Score: 0,
						Last_Reading: new Date(pd.Date),
						Breathing_Rate: pd.BreathingRate,
						Breathing_Depth: pd.BreathingDepth,
						SPO2: pd.SPO2,
						Coughing_Count: pd.CaughingCount,
						Heart_Rate: pd.HeartRate,
						HRV: pd.HRV,
						Arythmia_Count: pd.ArythmiaCount,
						Body_Temperature: pd.BodyTemperature,
						Thresholds: p.HCProThresholds.Thresholds
					};
					//Checks if an object with the same patientName exists.
					//If it doesn't push the new object to the list
					//If it does but the date is more recent: remove the old and push the new
					//Else do nothing with the object
					const foundObject = newArray.find((obj) => obj.Name == newObject.Name);
					if (foundObject == null) {
						newArray.push(newObject);
					} else if (foundObject.Last_Reading < newObject.Last_Reading) {
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

	return {
		patients: formatPatients,
		patientData: formatPatientData,
		merged: mergedDataList
	};
};
