import type { PageServerLoad, PageServerLoadEvent, RequestEvent } from './$types';
import { patientData } from '$db/Collections/patientData';
import { patients } from '$db/Collections/patients';
import { ObjectId } from 'mongodb';
import { MONGO_URL } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit/types/internal';
import type { Actions } from './$types';


let param: string;

export const load: PageServerLoad = async function ({ params }) {
    param = params.id

	const patient = await patients.find({_id: new ObjectId(params.id)}).toArray();
	const patientArray = patient.map((p) => {
		return {
			id: p._id.toString(),
			name: p.name,
			age: p.age,
			sex: p.sex,
			weight: p.weight,
			height: p.height
		};
	});	

	return {
		patientData: patientArray
	};
};

async function UpdateThreashold(BreathingRateTH: any, BreathingDepthTH: any, SPO2TH: any, CaughingCountTH: any, HeartRateTH: any, HRVTH: any, ArythmiaCountTH: any, BodyTemperatureTH: any){
    patients.updateOne({_id: new ObjectId(param)}, 
    {
    $set: { 
        'BreathingRateThreshold': BreathingRateTH, 
        "BreathingDepthThreshold": BreathingDepthTH,
        "SPO2Threshold": SPO2TH,
        "CaughingCountThreshold": CaughingCountTH,
        "HeartRateThreshold": HeartRateTH,
        "HRVThreshold": HRVTH,
        "ArythmiaCountThreshold": ArythmiaCountTH,
        "BodyTemperatureThreshold": BodyTemperatureTH
    }
    })
}
 
export const actions: Actions = {
  default: async ({request}) => {
    const form = await request.formData();
    const BreathingRateTH = form.get("BreathingRateTH");
    const SPO2Threshold = form.get("SPO2Threshold")
    const BreathingDepthThreshold = form.get("BreathingDepthThreshold")
    const CaughingCountThreshold = form.get("CaughingCountThreshold")
    const HeartRateThreshold = form.get("HeartRateThreshold")
    const HRVThreshold = form.get("HRVThreshold")
    const ArythmiaCountThreshold = form.get("ArythmiaCountThreshold")
    const BodyTemperatureThreshold = form.get("BodyTemperatureThreshold")
    
    
    UpdateThreashold(BreathingRateTH, BreathingDepthThreshold, SPO2Threshold, CaughingCountThreshold, HeartRateThreshold, HRVThreshold, ArythmiaCountThreshold, BodyTemperatureThreshold)
  }
};