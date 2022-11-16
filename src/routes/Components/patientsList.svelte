<script lang="ts">
	import { goto } from '$app/navigation';
	import { storeHCPId } from '$protectedMongoId';

	export let patients: any[] = [{}];
	export let patientData: any[] = [{}];
	export let merged: any[] = [{}];

	let sortedPatientData = merged;

	let selectedHeader = 'Name';
	let ascendingOrder = true;

	let searchCriteria = '';
	let foundPatients: any[] = [];
	function search() {
		if (searchCriteria != '') {
			foundPatients = sortedPatientData.filter((p) =>
				p.Name.toLowerCase().includes(searchCriteria.toLowerCase())
			);
		} else if (searchCriteria == '' || !sortedPatientData.includes(searchCriteria)) {
			foundPatients = [];
		}
	}

	//SORTING VIDEO https://www.youtube.com/watch?v=TKIALJcTJDU&ab_channel=SixStringsCoder
	const tableHeaders = Object.keys(merged[0]);

	const sortByNumber = (tableHeader: any) => {
		sortedPatientData = sortedPatientData.sort((obj1, obj2) => {
			return ascendingOrder
				? obj1[tableHeader] - obj2[tableHeader]
				: obj2[tableHeader] - obj1[tableHeader];
		});
		selectedHeader = tableHeader;
	};

	const sortByString = (tableHeader: any) => {
		sortedPatientData = sortedPatientData.sort((obj1, obj2) => {
			if (obj1[tableHeader] < obj2[tableHeader]) {
				return -1;
			} else if (obj1[tableHeader] > obj2[tableHeader]) {
				return 1;
			}
			return 0;
		});
		if (!ascendingOrder) {
			sortedPatientData = sortedPatientData.reverse();
		}
		selectedHeader = tableHeader;
	};
</script>

<input
	type="text"
	placeholder="Patient name"
	bind:value={searchCriteria}
	on:input={() => search()}
/>
{#if foundPatients.length <= 0}
	<table width="500" border="10">
		<tr>
			{#each tableHeaders as header}
				{#if header != 'id'}
					<th
						id="oneLine"
						class:highlighted={selectedHeader === header}
						on:click={() => (header === 'Name' ? sortByString(header) : sortByNumber(header))}
						><p>{header.replace('_', ' ')}</p>
						{#if header === selectedHeader}
							<span
								id="arrow"
								class="order-icon"
								on:click={() => (ascendingOrder = !ascendingOrder)}
								>{@html ascendingOrder ? '&#9661;' : '&#9651'}
							</span>
						{/if}
					</th>
				{/if}
			{/each}
		</tr>
		{#each sortedPatientData as p}
			<tr>
				<td on:click={() => goto($storeHCPId +"/"+ p.id)}>{p.Name}</td>
				<td />
				<td />
				<td>{p.Last_Reading.toLocaleString()}</td>
				<td>{p.Breathing_Rate}</td>
				<td>{p.Breathing_Depth}</td>
				<td>{p.SPO2}</td>
				<td>{p.Coughing_Count}</td>
				<td>{p.Heart_Rate}</td>
				<td>{p.HRV}</td>
				<td>{p.Arythmia_Count}</td>
				<td>{p.Body_Temperature}</td>
			</tr>
		{/each}
	</table>
{:else}
	<table width="500" border="10">
		<tr>
			{#each tableHeaders as header}
				{#if header != 'id'}
					<th
						id="oneLine"
						class:highlighted={selectedHeader === header}
						on:click={() => (header === 'Name' ? sortByString(header) : sortByNumber(header))}
						>{header.replace('_', ' ')}
						{#if header === selectedHeader}
							<span
								id="arrow"
								class="order-icon"
								on:click={() => (ascendingOrder = !ascendingOrder)}
								>{@html ascendingOrder ? '&#9661;' : '&#9651'}
							</span>
						{/if}
					</th>
				{/if}
			{/each}
		</tr>
		{#each foundPatients as p}
			<tr>
				<td on:click={() => goto('patientsOverview/' + p.id)}>{p.Name}</td>
				<td />
				<td />
				<td>{p.Last_Reading.toLocaleString()}</td>
				<td>{p.Breathing_Rate}</td>
				<td>{p.Breathing_Depth}</td>
				<td>{p.SPO2}</td>
				<td>{p.Coughing_Count}</td>
				<td>{p.Heart_Rate}</td>
				<td>{p.HRV}</td>
				<td>{p.Arythmia_Count}</td>
				<td>{p.Body_Temperature}</td>
			</tr>
		{/each}
	</table>
{/if}

<style>
	th {
		cursor: pointer;
	}

	.highlighted {
		color: orangered;
	}

	#oneLine {
		white-space: nowrap;
		overflow: hidden;
	}
</style>
