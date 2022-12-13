import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { EmailAuthCredential } from "firebase/auth";

export const load: PageServerLoad = async function(){

    function sendMail() {
        const serviceId = "nextcloud_email"
        const templateId = "template_a4kvakl"

    }

}