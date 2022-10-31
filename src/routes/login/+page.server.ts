import type { PageServerLoad } from '.svelte-kit/types/src/routes/login/$types';
import { api } from '$env/static/private';

export const load: PageServerLoad = async function () {
	return {
		api: api
	};
};
