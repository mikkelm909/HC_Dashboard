import { page } from "$app/stores";
import { patients } from "$db/Collections/patients";
import type { PageServerLoad } from ".svelte-kit/types/src/routes/threshold/[patientId]/[userId]/$types";

import type { Actions } from "@sveltejs/kit";



import { ObjectId } from "mongodb";



let paramPatient: string;
let paramUser: string;

export const load: PageServerLoad = async function ({ params }) {
  paramPatient = params.patientId
  paramUser = params.userId
	const patient = await patients.find({_id: new ObjectId(params.patientId)}).toArray();

  const patientArray = patient.map((p) => {
    var thresholds;
    var exist = p.HCProThresholds.find((value) => {

        thresholds = value
        return value.HCPro == params.userId

    })
    
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

async function UpdateThreashold(BreathingRateUP: any, BreathingRateLO: any, BreathingDepthUP: any, BreathingDepthLO: any, SPO2UP: any, SPO2LO: any, CaughingCountUP: any, CaughingCountLO: any, 
  HeartRateUP: any, HeartRateLO: any, HRVUP: any, HRVLO: any, ArythmiaCountUP: any, ArythmiaCountLO: any, BodyTemperatureUP: any, BodyTemperatureLO: any){
    patients.updateOne(
      {_id: new ObjectId(paramPatient), HCProThresholds: {$elemMatch: {HCPro: "6360fbabd51013f66af52a91"}}}, 
    {
    $set: { 
        "HCProThresholds.$.Thresholds.BreathingRateThreshold.high": BreathingRateUP,
        "HCProThresholds.$.Thresholds.BreathingRateThreshold.low": BreathingRateLO,

        "HCProThresholds.$.Thresholds.BreathingDepthThreshold.high": BreathingDepthUP,
        "HCProThresholds.$.Thresholds.BreathingDepthThreshold.low": BreathingDepthLO,

        "HCProThresholds.$.Thresholds.SPO2Threshold.high": SPO2UP,
        "HCProThresholds.$.Thresholds.SPO2Threshold.low": SPO2LO,

        "HCProThresholds.$.Thresholds.CaughingCountThreshold.high": CaughingCountUP,
        "HCProThresholds.$.Thresholds.CaughingCountThreshold.low": CaughingCountLO,

        "HCProThresholds.$.Thresholds.HeartRateThreshold.high": HeartRateUP,
        "HCProThresholds.$.Thresholds.HeartRateThreshold.low": HeartRateLO,

        "HCProThresholds.$.Thresholds.HRVThreshold.high": HRVUP,
        "HCProThresholds.$.Thresholds.HRVThreshold.low": HRVLO,

        "HCProThresholds.$.Thresholds.ArythmiaCountThreshold.high": ArythmiaCountUP,
        "HCProThresholds.$.Thresholds.ArythmiaCountThreshold.low": ArythmiaCountLO,

        "HCProThresholds.$.Thresholds.BodyTemperatureThreshold.high": BodyTemperatureUP,
        "HCProThresholds.$.Thresholds.BodyTemperatureThreshold.low": BodyTemperatureLO,

    }
    })
}

export const actions: Actions = {
  default: async ({request}) => {
    const form = await request.formData();
    const BreathingRateUP = form.get("BreathingRate-UP");
    const BreathingRateLO = form.get("BreathingRate-LO");

    const BreathingDepthUP = form.get("BreathingDepth-UP");
    const BreathingDepthLO = form.get("BreathingDepth-LO");
    
    const SPO2UP = form.get("SPO2-UP");
    const SPO2LO = form.get("SPO2-LO");

    const CaughingCountUP = form.get("CaughingCount-UP");
    const CaughingCountLO = form.get("CaughingCount-LO");

    const HeartRateUP = form.get("HeartRate-UP");
    const HeartRateLO = form.get("HeartRate-LO");

    const HRVUP = form.get("HRV-UP");
    const HRVLO = form.get("HRV-LO");

    const ArythmiaCountUP = form.get("ArythmiaCount-UP");
    const ArythmiaCountLO = form.get("ArythmiaCount-LO");

    const BodyTemperatureUP = form.get("BodyTemperature-UP");
    const BodyTemperatureLO = form.get("BodyTemperature-LO");
    console.log(SPO2LO, SPO2UP)
   
    
    UpdateThreashold(BreathingRateUP, BreathingRateLO, BreathingDepthUP, BreathingDepthLO, SPO2UP, SPO2LO, CaughingCountUP, CaughingCountLO, 
      HeartRateUP, HeartRateLO, HRVUP, HRVLO, ArythmiaCountUP, ArythmiaCountLO, BodyTemperatureUP, BodyTemperatureLO)
  }
};