<script lang="ts">
	import { goto } from '$app/navigation';
	import { storeHCPId } from '$protectedMongoId';
	import { object_without_properties } from 'svelte/internal';

	export let patients: any[] = [{}];
	export let patientData: any[] = [{}];
	export let merged: any[] = [{}];

	let sortedPatientData = merged;

	let defaultThresholds = [
		{
			BreathingRateThreshold: {
				high: 30,
				low: 1
			},
			BreathingDepthThreshold: {
				high: 30,
				low: 1
			},
			SPO2Threshold: {
				high: 30,
				low: 1
			},
			CoughingCountThreshold: {
				high: 30,
				low: 1
			},
			HeartRateThreshold: {
				high: 30,
				low: 1
			},
			HRVThreshold: {
				high: 30,
				low: 1
			},
			ArythmiaCountThreshold: {
				high: 30,
				low: 1
			},
			BodyTemperatureThreshold: {
				high: 30,
				low: 1
			}
		}
	];

	function setToDefaultThreshold() {
		sortedPatientData.forEach((p) => {
			if (
				p.Thresholds.BreathingRateThreshold.high == null ||
				p.Thresholds.BreathingRateThreshold.high == ''
			) {
				p.Thresholds.BreathingRateThreshold.high = defaultThresholds[0].BreathingRateThreshold.high;
			}
			if (
				p.Thresholds.BreathingRateThreshold.low == null ||
				p.Thresholds.BreathingRateThreshold.low == ''
			) {
				p.Thresholds.BreathingRateThreshold.low = defaultThresholds[0].BreathingRateThreshold.low;
			}
			if (
				p.Thresholds.BreathingDepthThreshold.high == null ||
				p.Thresholds.BreathingDepthThreshold.high == ''
			) {
				p.Thresholds.BreathingDepthThreshold.high =
					defaultThresholds[0].BreathingDepthThreshold.high;
			}
			if (
				p.Thresholds.BreathingDepthThreshold.low == null ||
				p.Thresholds.BreathingDepthThreshold.low == ''
			) {
				p.Thresholds.BreathingDepthThreshold.low = defaultThresholds[0].BreathingDepthThreshold.low;
			}
			if (p.Thresholds.SPO2Threshold.high == null || p.Thresholds.SPO2Threshold.high == '') {
				p.Thresholds.SPO2Threshold.high = defaultThresholds[0].SPO2Threshold.high;
			}
			if (p.Thresholds.SPO2Threshold.low == null || p.Thresholds.SPO2Threshold.low == '') {
				p.Thresholds.SPO2Threshold.low = defaultThresholds[0].SPO2Threshold.low;
			}
			if (
				p.Thresholds.CaughingCountThreshold.high == null ||
				p.Thresholds.CaughingCountThreshold.high == ''
			) {
				p.Thresholds.CaughingCountThreshold.high = defaultThresholds[0].CoughingCountThreshold.high;
			}
			if (
				p.Thresholds.CaughingCountThreshold.low == null ||
				p.Thresholds.CaughingCountThreshold.low == ''
			) {
				p.Thresholds.CaughingCountThreshold.low = defaultThresholds[0].CoughingCountThreshold.low;
			}
			if (
				p.Thresholds.HeartRateThreshold.high == null ||
				p.Thresholds.HeartRateThreshold.high == ''
			) {
				p.Thresholds.HeartRateThreshold.high = defaultThresholds[0].HeartRateThreshold.high;
			}
			if (
				p.Thresholds.HeartRateThreshold.low == null ||
				p.Thresholds.HeartRateThreshold.low == ''
			) {
				p.Thresholds.HeartRateThreshold.low = defaultThresholds[0].HeartRateThreshold.low;
			}
			if (p.Thresholds.HRVThreshold.high == null || p.Thresholds.HRVThreshold.high == '') {
				p.Thresholds.HRVThreshold.high = defaultThresholds[0].HRVThreshold.high;
			}
			if (p.Thresholds.HRVThreshold.low == null || p.Thresholds.HRVThreshold.low == '') {
				p.Thresholds.HRVThreshold.low = defaultThresholds[0].HRVThreshold.low;
			}
			if (
				p.Thresholds.ArythmiaCountThreshold.high == null ||
				p.Thresholds.ArythmiaCountThreshold.high == ''
			) {
				p.Thresholds.ArythmiaCountThreshold.high = defaultThresholds[0].ArythmiaCountThreshold.high;
			}
			if (
				p.Thresholds.ArythmiaCountThreshold.low == null ||
				p.Thresholds.ArythmiaCountThreshold.low == ''
			) {
				p.Thresholds.ArythmiaCountThreshold.low = defaultThresholds[0].ArythmiaCountThreshold.low;
			}
			if (
				p.Thresholds.BodyTemperatureThreshold.high == null ||
				p.Thresholds.BodyTemperatureThreshold.high == ''
			) {
				p.Thresholds.BodyTemperatureThreshold.high =
					defaultThresholds[0].BodyTemperatureThreshold.high;
			}
			if (
				p.Thresholds.BodyTemperatureThreshold.low == null ||
				p.Thresholds.BodyTemperatureThreshold.low == ''
			) {
				p.Thresholds.BodyTemperatureThreshold.low =
					defaultThresholds[0].BodyTemperatureThreshold.low;
			}
		});
	}
	setToDefaultThreshold();

	function riskScore() {
		sortedPatientData.forEach((p) => {
			p.Risk_Score = 0;
			Object.keys(p.Thresholds).forEach(function (key) {
				switch (key) {
					case 'BreathingRateThreshold':
						if (
							p.Breathing_Rate >= p.Thresholds[key].high ||
							p.Breathing_Rate <= p.Thresholds[key].low
						) {
							p.Risk_Score = p.Risk_Score + 1;
						}
						break;
					case 'BreathingDepthThreshold':
						if (
							p.Breathing_Depth >= p.Thresholds[key].high ||
							p.Breathing_Depth <= p.Thresholds[key].low
						) {
							p.Risk_Score = p.Risk_Score + 1;
						}
						break;
					case 'SPO2Threshold':
						if (p.SPO2 >= p.Thresholds[key].high || p.SPO2 <= p.Thresholds[key].low) {
							p.Risk_Score = p.Risk_Score + 1;
						}
						break;
					case 'CaughingCountThreshold':
						if (
							p.Coughing_Count >= p.Thresholds[key].high ||
							p.Coughing_Count <= p.Thresholds[key].low
						) {
							p.Risk_Score = p.Risk_Score + 1;
						}
						break;
					case 'HeartRateThreshold':
						if (p.Heart_Rate >= p.Thresholds[key].high || p.Heart_Rate <= p.Thresholds[key].low) {
							p.Risk_Score = p.Risk_Score + 1;
						}
						break;
					case 'HRVThreshold':
						if (p.HRV >= p.Thresholds[key].high || p.HRV <= p.Thresholds[key].low) {
							p.Risk_Score = p.Risk_Score + 1;
						}
						break;
					case 'ArythmiaCountThreshold':
						if (
							p.Arythmia_Count >= p.Thresholds[key].high ||
							p.Arythmia_Count <= p.Thresholds[key].low
						) {
							p.Risk_Score = p.Risk_Score + 1;
						}
						break;
					case 'BodyTemperatureThreshold':
						if (
							p.Body_Temperature >= p.Thresholds[key].high ||
							p.Body_Temperature <= p.Thresholds[key].low
						) {
							p.Risk_Score = p.Risk_Score + 1;
						}
						break;
					default:
						break;
				}
			});
		});
	}
	riskScore();

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
		if (foundPatients.length > 0) {
			foundPatients = foundPatients.sort((obj1, obj2) => {
				return ascendingOrder
					? obj1[tableHeader] - obj2[tableHeader]
					: obj2[tableHeader] - obj1[tableHeader];
			});
		} else {
			sortedPatientData = sortedPatientData.sort((obj1, obj2) => {
				return ascendingOrder
					? obj1[tableHeader] - obj2[tableHeader]
					: obj2[tableHeader] - obj1[tableHeader];
			});
		}

		selectedHeader = tableHeader;
	};

	const sortByString = (tableHeader: any) => {
		if (foundPatients.length > 0) {
			foundPatients = foundPatients.sort((obj1, obj2) => {
				if (obj1[tableHeader] < obj2[tableHeader]) {
					return -1;
				} else if (obj1[tableHeader] > obj2[tableHeader]) {
					return 1;
				}
				return 0;
			});
			if (!ascendingOrder) {
				sortedPatientData = foundPatients.reverse();
			}
		} else {
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
				{#if header != 'id' && header != 'Thresholds'}
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
				<td on:click={() => goto($storeHCPId + '/' + p.id)}>{p.Name}</td>
				<td>{p.Last_14Days}</td>
				<td>{p.Risk_Score}</td>
				<td>{p.Last_Reading.toLocaleString()}</td>
				<td
					class:aboveThreshold={p.Breathing_Rate >= p.Thresholds.BreathingRateThreshold.high ||
						p.Breathing_Rate <= p.Thresholds.BreathingRateThreshold.low}>{p.Breathing_Rate}</td
				>
				<td
					class:aboveThreshold={p.Breathing_Depth >= p.Thresholds.BreathingDepthThreshold.high ||
						p.Breathing_Depth <= p.Thresholds.BreathingDepthThreshold.low}>{p.Breathing_Depth}</td
				>
				<td
					class:aboveThreshold={p.SPO2 >= p.Thresholds.SPO2Threshold.high ||
						p.SPO2 <= p.Thresholds.SPO2Threshold.low}>{p.SPO2}</td
				>
				<td
					class:aboveThreshold={p.Coughing_Count >= p.Thresholds.CaughingCountThreshold.high ||
						p.Coughing_Count <= p.Thresholds.CaughingCountThreshold.low}>{p.Coughing_Count}</td
				>
				<td
					class:aboveThreshold={p.Heart_Rate >= p.Thresholds.HeartRateThreshold.high ||
						p.Heart_Rate <= p.Thresholds.HeartRateThreshold.low}>{p.Heart_Rate}</td
				>
				<td
					class:aboveThreshold={p.HRV >= p.Thresholds.HRVThreshold.high ||
						p.HRV <= p.Thresholds.HRVThreshold.low}>{p.HRV}</td
				>
				<td
					class:aboveThreshold={p.Arythmia_Count >= p.Thresholds.ArythmiaCountThreshold.high ||
						p.Arythmia_Count <= p.Thresholds.ArythmiaCountThreshold.low}>{p.Arythmia_Count}</td
				>
				<td
					class:aboveThreshold={p.Body_Temperature >= p.Thresholds.BodyTemperatureThreshold.high ||
						p.Body_Temperature <= p.Thresholds.BodyTemperatureThreshold.low}
					>{p.Body_Temperature}</td
				>
			</tr>
		{/each}
	</table>
{:else}
	<table width="500" border="10">
		<tr>
			{#each tableHeaders as header}
				{#if header != 'id' && header != 'Thresholds'}
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
				<td>{p.Risk_Score}</td>
				<td>{p.Last_Reading.toLocaleString()}</td>
				<td
					class:aboveThreshold={p.Breathing_Rate >= p.Thresholds.BreathingRateThreshold.high ||
						p.Breathing_Rate <= p.Thresholds.BreathingRateThreshold.low}>{p.Breathing_Rate}</td
				>
				<td
					class:aboveThreshold={p.Breathing_Depth >= p.Thresholds.BreathingDepthThreshold.high ||
						p.Breathing_Depth <= p.Thresholds.BreathingDepthThreshold.low}>{p.Breathing_Depth}</td
				>
				<td
					class:aboveThreshold={p.SPO2 >= p.Thresholds.SPO2Threshold.high ||
						p.SPO2 <= p.Thresholds.SPO2Threshold.low}>{p.SPO2}</td
				>
				<td
					class:aboveThreshold={p.Coughing_Count >= p.Thresholds.CaughingCountThreshold.high ||
						p.Coughing_Count <= p.Thresholds.CaughingCountThreshold.low}>{p.Coughing_Count}</td
				>
				<td
					class:aboveThreshold={p.Heart_Rate >= p.Thresholds.HeartRateThreshold.high ||
						p.Heart_Rate <= p.Thresholds.HeartRateThreshold.low}>{p.Heart_Rate}</td
				>
				<td
					class:aboveThreshold={p.HRV >= p.Thresholds.HRVThreshold.high ||
						p.HRV <= p.Thresholds.HRVThreshold.low}>{p.HRV}</td
				>
				<td
					class:aboveThreshold={p.Arythmia_Count >= p.Thresholds.ArythmiaCountThreshold.high ||
						p.Arythmia_Count <= p.Thresholds.ArythmiaCountThreshold.low}>{p.Arythmia_Count}</td
				>
				<td
					class:aboveThreshold={p.Body_Temperature >= p.Thresholds.BodyTemperatureThreshold.high ||
						p.Body_Temperature <= p.Thresholds.BodyTemperatureThreshold.low}
					>{p.Body_Temperature}</td
				>
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

	.aboveThreshold {
		background-color: red;
	}
</style>
