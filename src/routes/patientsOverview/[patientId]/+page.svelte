<script lang="ts">
	import PatientDataTable from '../../Components/PatientDataTable.svelte';
	import type { PageData } from './$types';



	export let data: PageData;

</script>

<PatientDataTable patient={data.patientData} />
