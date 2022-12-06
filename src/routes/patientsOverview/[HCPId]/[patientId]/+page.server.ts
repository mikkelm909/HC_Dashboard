import type { Actions, PageServerLoad } from './$types';
import { patientData } from '$db/Collections/patientData';
import { patients } from '$db/Collections/patients';
import { ObjectId } from 'mongodb';

let paramPatient: string;
let paramUser: string;

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

	paramPatient = params.patientId;
	paramUser = params.HCPId;

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

async function UpdateThreshold(
	BreathingRateUP: any,
	BreathingRateLO: any,
	BreathingDepthUP: any,
	BreathingDepthLO: any,
	SPO2UP: any,
	SPO2LO: any,
	CaughingCountUP: any,
	CaughingCountLO: any,
	HeartRateUP: any,
	HeartRateLO: any,
	HRVUP: any,
	HRVLO: any,
	ArythmiaCountUP: any,
	ArythmiaCountLO: any,
	BodyTemperatureUP: any,
	BodyTemperatureLO: any
) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.BreathingRateThreshold.high': BreathingRateUP,
				'HCProThresholds.$.Thresholds.BreathingRateThreshold.low': BreathingRateLO,

				'HCProThresholds.$.Thresholds.BreathingDepthThreshold.high': BreathingDepthUP,
				'HCProThresholds.$.Thresholds.BreathingDepthThreshold.low': BreathingDepthLO,

				'HCProThresholds.$.Thresholds.SPO2Threshold.high': SPO2UP,
				'HCProThresholds.$.Thresholds.SPO2Threshold.low': SPO2LO,

				'HCProThresholds.$.Thresholds.CaughingCountThreshold.high': CaughingCountUP,
				'HCProThresholds.$.Thresholds.CaughingCountThreshold.low': CaughingCountLO,

				'HCProThresholds.$.Thresholds.HeartRateThreshold.high': HeartRateUP,
				'HCProThresholds.$.Thresholds.HeartRateThreshold.low': HeartRateLO,

				'HCProThresholds.$.Thresholds.HRVThreshold.high': HRVUP,
				'HCProThresholds.$.Thresholds.HRVThreshold.low': HRVLO,

				'HCProThresholds.$.Thresholds.ArythmiaCountThreshold.high': ArythmiaCountUP,
				'HCProThresholds.$.Thresholds.ArythmiaCountThreshold.low': ArythmiaCountLO,

				'HCProThresholds.$.Thresholds.BodyTemperatureThreshold.high': BodyTemperatureUP,
				'HCProThresholds.$.Thresholds.BodyTemperatureThreshold.low': BodyTemperatureLO
			}
		}
	);
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const BreathingRateUP = form.get('BreathingRate-UP');
		const BreathingRateLO = form.get('BreathingRate-LO');

		const BreathingDepthUP = form.get('BreathingDepth-UP');
		const BreathingDepthLO = form.get('BreathingDepth-LO');

		const SPO2UP = form.get('SPO2-UP');
		const SPO2LO = form.get('SPO2-LO');

		const CaughingCountUP = form.get('CaughingCount-UP');
		const CaughingCountLO = form.get('CaughingCount-LO');

		const HeartRateUP = form.get('HeartRate-UP');
		const HeartRateLO = form.get('HeartRate-LO');

		const HRVUP = form.get('HRV-UP');
		const HRVLO = form.get('HRV-LO');

		const ArythmiaCountUP = form.get('ArythmiaCount-UP');
		const ArythmiaCountLO = form.get('ArythmiaCount-LO');

		const BodyTemperatureUP = form.get('BodyTemperature-UP');
		const BodyTemperatureLO = form.get('BodyTemperature-LO');

		UpdateThreshold(
			BreathingRateUP,
			BreathingRateLO,
			BreathingDepthUP,
			BreathingDepthLO,
			SPO2UP,
			SPO2LO,
			CaughingCountUP,
			CaughingCountLO,
			HeartRateUP,
			HeartRateLO,
			HRVUP,
			HRVLO,
			ArythmiaCountUP,
			ArythmiaCountLO,
			BodyTemperatureUP,
			BodyTemperatureLO
		);
	}
};
