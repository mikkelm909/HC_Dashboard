<script lang="ts">
	import { storeUser } from '$protectedUser';
	import Login from '../Components/login.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<button><a href="/">TO MAIN PAGE</a></button>

<Login api={data.api} healthcareProfessionals={data.healthcareProfessionals} />
