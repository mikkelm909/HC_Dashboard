<script lang="ts">
	import PatientsList from '../../Components/patientsList.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data.merged);
</script>

<PatientsList patients={data.patients} patientData={data.patientData} merged={data.merged} />
