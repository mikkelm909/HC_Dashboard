
import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import type { Load } from "@sveltejs/kit";
import { mongoData } from "$db/Collections/test";



export const load: PageServerLoad = async function(){
    const data = await mongoData.find({},{limit: 10}).toArray();
    console.log("data", data)
    return {
            test: data
    }
}
