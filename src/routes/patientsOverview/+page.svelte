<script lang="ts">
	import type { PageData } from './$types';
	import PatientsList from '../Components/patientsList.svelte';
	export let data: PageData;
</script>

<PatientsList patients={data.patients} patientData={data.patientData} merged={data.merged} />
