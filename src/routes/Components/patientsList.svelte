<script lang="ts">
	import { onMount } from 'svelte';

	export let patients: any[] = [{}];
	export let patientData: any[] = [{}];
	export let merged: any[] = [{}];
</script>

{#if patients}
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
		</tr>
		{#each merged as p}
			<tr>
				<td>{p.name}</td>
				<td />
				<td>N/A</td>
				<td>{p.BreathingRate}</td>
				<td>{p.BreathingDepth}</td>
				<td>{p.SPO2}</td>
				<td>{p.CaughingCount}</td>
				<td>{p.HeartRate}</td>
				<td>{p.HRV}</td>
				<td>{p.ArythmiaCount}</td>
				<td>{p.Date.getDay()}-{p.Date.toLocaleString('default', { month: 'short' })}</td>
			</tr>
		{/each}
	</table>
{:else}
	<h3>You currently have no patients</h3>
{/if}
