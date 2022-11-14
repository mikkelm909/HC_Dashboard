<script lang="ts">
	import { goto } from '$app/navigation';
	import { construct_svelte_component } from 'svelte/internal';

	export let patients: any[] = [{}];
	export let patientData: any[] = [{}];
	export let merged: any[] = [{}];

	let searchCriteria = '';
	let foundPatients: any[] = [];
	function search() {
		if (searchCriteria != '') {
			foundPatients = merged.filter((p) =>
				p.name.toLowerCase().includes(searchCriteria.toLowerCase())
			);
		} else if (searchCriteria == '' || !merged.includes(searchCriteria)) {
			foundPatients.forEach((fp) => {
				foundPatients.pop();
			});
		}
	}
</script>

<input
	type="text"
	id="name"
	placeholder="Patient name"
	bind:value={searchCriteria}
	on:input={() => search()}
/>

{#if foundPatients.length == 0}
	<table width="500" border="10">
		<tr>
			<th>Name</th>
			<th />
			<th>Risk Score</th>
			<th>Breathing Rate</th>
			<th>Breathing Depth</th>
			<th>Oxygen</th>
			<th>Coughing Count</th>
			<th>Heart Rate</th>
			<th>HRV</th>
			<th>Arythmia Count</th>
			<th>Body Temperature</th>
			<th>Date</th>
		</tr>
		{#each merged as p}
			<tr>
				<td on:click={() => goto('patientsOverview/' + p.id)}>{p.name}</td>
				<td />
				<td>N/A</td>
				<td>{p.BreathingRate}</td>
				<td>{p.BreathingDepth}</td>
				<td>{p.SPO2}</td>
				<td>{p.CaughingCount}</td>
				<td>{p.HeartRate}</td>
				<td>{p.HRV}</td>
				<td>{p.ArythmiaCount}</td>
				<td>{p.BodyTemperature}</td>
				<td>{p.Date.toLocaleString()}</td>
			</tr>
		{/each}
	</table>
{:else}
	<table width="500" border="10">
		<tr>
			<th>Name</th>
			<th />
			<th>Risk Score</th>
			<th>Breathing Rate</th>
			<th>Breathing Depth</th>
			<th>Oxygen</th>
			<th>Coughing Count</th>
			<th>Heart Rate</th>
			<th>HRV</th>
			<th>Arythmia Count</th>
			<th>Body Temperature</th>
			<th>Date</th>
		</tr>
		{#each foundPatients as p}
			<tr>
				<td on:click={() => goto('patientsOverview/' + p.id)}>{p.name}</td>
				<td />
				<td>N/A</td>
				<td>{p.BreathingRate}</td>
				<td>{p.BreathingDepth}</td>
				<td>{p.SPO2}</td>
				<td>{p.CaughingCount}</td>
				<td>{p.HeartRate}</td>
				<td>{p.HRV}</td>
				<td>{p.ArythmiaCount}</td>
				<td>{p.BodyTemperature}</td>
				<td>{p.Date.toLocaleString()}</td>
			</tr>
		{/each}
	</table>
{/if}
