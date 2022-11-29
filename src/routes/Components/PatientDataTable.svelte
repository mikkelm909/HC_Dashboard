<script lang="ts">
	import { storeHCPId } from '$protectedMongoId';
	import { onMount } from 'svelte';
	import { dataset_dev } from 'svelte/internal';
	import { fade } from 'svelte/transition';

	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';
	import { format, precisionFixed } from 'd3-format';
	import MultiLine from './Graph/MultiLine.svelte';
	import AxisX from './Graph/AxisX.svelte';
	import AxisY from './Graph/AxisY.svelte';
	import Labels from './Graph/GroupLables.svelte';
	import SharedTooltip from './Graph/SharedTooltip.percent-range.svelte';

	export let patient: any[] = [];
	export var patientId: string;
	let startDate: Date = new Date('2000-11-10');
	let endDate: Date = new Date('3000-11-10');

	$: formatedStart = new Date(startDate);
	$: formatedEnd = new Date(endDate);
	let showGraph = false;

	function toggleGraph() {
		showGraph = !showGraph;
	}

	var filteredPatient: any[] = [];
	function getDataByDates() {
		filteredPatient = [];
		patient.forEach((p) => {
			if (p.Date.getTime() <= formatedEnd.getTime() && p.Date.getTime() >= formatedStart.getTime())
				filteredPatient.push(p);
		});
	}

	filteredPatient = patient;

	$: test = filteredPatient.map((p) => {
		return {
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CaughingCount: p.CaughingCount,
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: p.Date
		};
	});

	//graph start here
	var data = filteredPatient.map((p) => {
		return {
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CaughingCount: p.CaughingCount,
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: p.Date
		};
	});
	$: data = test;
	$: console.log('data', data);

	const xKey = 'Date';
	const yKey = 'value';
	const zKey = 'Data';

	const seriesNames = Object.keys(data[0]).filter((d) => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

	const parseDate = timeParse('%Y-%m-%d');

	/* --------------------------------------------
	 * Create a "long" format that is a grouped series of data points
	 * Layer Cake uses this data structure and the key names
	 * set in xKey, yKey and zKey to map your data into each scale.
	 */
	$: dataLong = seriesNames.map((key) => {
		return {
			[zKey]: key,
			values: data.map((d) => {
				d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey]; // Conditional required for sapper
				return {
					[yKey]: +d[key],
					[xKey]: d[xKey],
					[zKey]: key
				};
			})
		};
	});

	/* --------------------------------------------
	 * Make a flat array of the `values` of our nested series
	 * we can pluck the field set from `yKey` from each item
	 * in the array to measure the full extents
	 */
	const flatten = (data: any[]) =>
		data.reduce((memo, group) => {
			return memo.concat(group.values);
		}, []);

	const formatTickX = timeFormat('%b. %e');
	const formatTickY = (d) => format(`.${precisionFixed(d)}s`)(d);
</script>

<p transition:fade>Fades in and out</p>

<p>Start date</p>
<label>
	<input type="date" bind:value={startDate} />
</label>
<p>End date</p>
<label>
	<input type="date" bind:value={endDate} />
</label>

<button on:click={getDataByDates}>Show data for dates</button>
<br />
<button on:click={toggleGraph}>Toggle Graph-view</button>

{#if !showGraph}
	<table width="500" border="10">
		<tr>
			<th>{patient[0].name}</th>
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
			<th>Coughing count (session)</th>
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
{/if}

{#if showGraph}
	<div class="chart-container">
		<LayerCake
			padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
			x={xKey}
			y={yKey}
			z={zKey}
			yDomain={[0, null]}
			zScale={scaleOrdinal()}
			zRange={seriesColors}
			flatData={flatten(dataLong)}
			data={dataLong}
		>
			<Svg>
				<AxisX
					gridlines={false}
					ticks={data.map((d) => d[xKey]).sort((a, b) => a - b)}
					formatTick={formatTickX}
					snapTicks={true}
					tickMarks={true}
				/>
				<AxisY ticks={10} formatTick={formatTickY} />
				<MultiLine />
			</Svg>

			<Html>
				<Labels />
				<SharedTooltip formatTitle={formatTickX} dataset={data} />
			</Html>
		</LayerCake>
	</div>
{/if}

<a href="/compareData/{patientId}/{$storeHCPId}">Compare</a>
<a href="/threshold/{patientId}/{$storeHCPId}"><button>Edit Threshold</button></a>

<style>
	/*
	  The wrapper div needs to have an explicit width and height in CSS.
	  It can also be a flexbox child or CSS grid element.
	  The point being it needs dimensions since the <LayerCake> element will
	  expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 800px;
	}
</style>
