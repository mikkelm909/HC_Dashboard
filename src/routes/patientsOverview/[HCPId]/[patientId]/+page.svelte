<script lang="ts">
	import PatientDataTable from 'src/routes/Components/PatientDataTable.svelte';
	import type { PageData } from './$types';



	export let data: PageData;
	console.log(data)
</script>

<PatientDataTable patient={data.patientData} patientId={data.id}/>
