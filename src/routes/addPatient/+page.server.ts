import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import type { Actions } from '@sveltejs/kit';
import { emailtemplate } from '$env/static/private';
import { emailKey } from '$env/static/private';
import { emailPrivateKey } from '$env/static/private';
import { patientCache } from "$db/Collections/patientCache";
import { storeUser } from "$protectedUser";
import { patients } from "$db/Collections/patients";
import emailjs from '@emailjs/nodejs';



function sendEmail(data: Record<string, unknown> | undefined) {
	emailjs
	.send('nextcloud_email', emailtemplate, data, {
	  publicKey: emailKey,
	  privateKey: emailPrivateKey, // optional, highly recommended for security reasons
	})
	.then(
	  (response) => {
		console.log('SUCCESS!', response.status, response.text);
	  },
	  (err) => {
		console.log('FAILED...', err);
	  },
	);
	
}



async function emailExist(email:string) {
	let arrayCacheEmail = await patientCache.find({"pendingEmail": email}).toArray()
	let arrayPatientEmail = await patients.find({"email": email}).toArray()
	if(arrayCacheEmail.length == 0 && arrayPatientEmail.length == 0){
		return true
	}
	console.log("Email already in cache or patient with this email already exist")
	return false
}

export const actions: Actions = { //we use mongo as a cache for pending email confirmations
	default: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email');
		const uid = form.get("uid")
		
		if(await emailExist(email)){

			await emailExist(email)
			let returnId = await patientCache.insertOne({"pendingEmail": email, hcPro: uid})
			let Id = returnId.insertedId.toString()
			
			var data = {link: "http://127.0.0.1:5173/registerPatient/"+Id,  //change link, because it is different in production
						user_email: email}
			sendEmail(data)
		}
	}
};