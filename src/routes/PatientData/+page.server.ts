import type { PageServerLoad } from './$types';
import { patientData } from '$db/Collections/patientData';



export const load: PageServerLoad = async function(){
    const data = await patientData.find({ patientId:  "635f8960d51013f66af52a8b" }, {
        projection: {BreathingRate: 1, _id: 1, BreathingDepth: 1, SPO2: 1, CaughingCount: 1, HeartRate: 1, HRV: 1, ArythmiaCount: 1, BodyTemperature: 1, Date: 1}}).toArray(); //for some reason it will not return objects with new ObjectId("") so we map it out

    const PatientArray = data.map(s => { return { 
        id: s._id.toString(), 
        BreathingRate: s.BreathingRate,
        BreathingDepth: s.BreathingDepth,
        SPO2: s.SPO2,
        CaughingCount: s.CaughingCount,
        HeartRate: s.HeartRate,
        HRV: s.HRV,
        ArythmiaCount: s.ArythmiaCount,
        BodyTemperature: s.BodyTemperature,
        Date: new Date(s.Date) 
    } })

    return {
        PatientData: PatientArray
    }
    
    
}