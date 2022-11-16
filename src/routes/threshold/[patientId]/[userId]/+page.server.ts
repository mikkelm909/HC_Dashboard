import { page } from "$app/stores";
import { patients } from "$db/Collections/patients";
import type { PageServerLoad } from ".svelte-kit/types/src/routes/threshold/[patientId]/[userId]/$types";

import type { Actions } from "@sveltejs/kit";



import { ObjectId } from "mongodb";



let paramPatient: string;


export const load: PageServerLoad = async function ({ params }) {
  paramPatient = params.patientId
	const patient = await patients.find({_id: new ObjectId(params.patientId)}).toArray();

  const patientArray = patient.map((p) => {
    var thresholds;
    var exist = p.HCProThresholds.find((value) => {

        thresholds = value
        return value.HCPro == params.userId

    })

    console.log("exist",exist)
    if(exist){
      return {
        id: p._id.toString(),
        name: p.name,
        age: p.age,
        sex: p.sex,
        weight: p.weight,
        height: p.height, 
        HCProThresholds: thresholds
      }
    }
    
  });

	return {
		patientData: patientArray
	};
};

async function UpdateThreashold(BreathingRateTH: any, BreathingDepthTH: any, SPO2TH: any, CaughingCountTH: any, HeartRateTH: any, HRVTH: any, ArythmiaCountTH: any, BodyTemperatureTH: any){
    patients.updateOne({_id: new ObjectId(paramPatient)}, 
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