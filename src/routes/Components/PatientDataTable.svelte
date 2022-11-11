<script lang="ts">
	import { onMount } from "svelte";
	export let patient: any[] = [];


	let startDate: Date = new Date("2000-11-10");
	let endDate: Date = new Date("3000-11-10");


	$: formatedStart = new Date(startDate)
	$: formatedEnd = new Date(endDate)
	
	var filteredPatient: any[] = []
	function getDataByDates(){
		filteredPatient = []
		patient.forEach(p => {
			if(p.Date.getTime() <= formatedEnd.getTime() && p.Date.getTime() >= formatedStart.getTime())
				filteredPatient.push(p)
		});

	}

	onMount(() => {
		
			filteredPatient = patient
		
	})
</script>





<p>Start date</p>
<label>
	<input type=date bind:value={startDate}>
</label>
<p>End date</p>
<label>
	<input type=date bind:value={endDate}>
</label>

<button on:click={getDataByDates}>Show data for dates</button>
<table width="500" border="10">
	<tr>
		<th>{patient[0].id}</th>
		{#each filteredPatient as patient}
			<th>{patient.Date.toLocaleString()}</th>
			<!-- Getting the date for the session -->
		{/each}
	</tr>
	<tr>
		<th>Breathing Rate (avg/min)</th>
		{#each filteredPatient as patient}
			<th>{patient.BreathingRate}</th>
		{/each}
	</tr>
	<tr>
		<th>BreathingDepth (avg%/min)</th>
		{#each filteredPatient as patient}
			<th>{patient.BreathingDepth}</th>
		{/each}
	</tr>
	<tr>
		<th>Oxygen (SPO2) (avg/min)</th>
		{#each filteredPatient as patient}
			<th>{patient.SPO2}</th>
		{/each}
	</tr>
	<tr>
		<th>Caughing count (session)</th>
		{#each filteredPatient as patient}
			<th>{patient.CaughingCount}</th>
		{/each}
	</tr>
	<tr>
		<th>HeartRate (avg/min)</th>
		{#each filteredPatient as patient}
			<th>{patient.HeartRate}</th>
		{/each}
	</tr>
	<tr>
		<th>HRV (avg)</th>
		{#each filteredPatient as patient}
			<th>{patient.HRV}</th>
		{/each}
	</tr>
	<tr>
		<th>Arythmia count (during session)</th>
		{#each filteredPatient as patient}
			<th>{patient.ArythmiaCount}</th>
		{/each}
	</tr>
	<tr>
		<th>BodyTemperature (avg/session)</th>
		{#each filteredPatient as patient}
			<th>{patient.BodyTemperature}</th>
		{/each}
	</tr>
</table>
