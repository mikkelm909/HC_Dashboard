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
	import ThresholdLine from './Graph/ThresholdLine.svelte';
	export let patient: any[] = [];
	export var patientId: string;
	export let thresholds: any
	let startDate: Date = new Date('2000-11-10');
	let endDate: Date = new Date('3000-11-10');
	$: formatedStart = new Date(startDate);
	$: formatedEnd = new Date(endDate);
	let compareStartDate: Date = new Date('2000-11-10');
	let compareEndDate: Date = new Date(Date.now());
	$: formatedCompareStart = new Date(compareStartDate);
	$: formatedCompareEnd = new Date(compareEndDate);
	let showCompare = false;
	let compareArray: [] = [];
    const baseThreshold =[
    [
        {
            "value": 15,
            "Date": new Date("2022-09-30T09:21:19.418Z")
        },
        {
            "value": 15,
            "Date": new Date("2022-11-01T09:21:19.418Z")
        }
    ],
    [
        {
            "value": 60,
            "Date": new Date("2022-09-30T09:21:19.418Z")
        },
        {
            "value": 60,
            "Date": new Date("2022-11-01T09:21:19.418Z")
        }
    ]
]
			
				
	var formatedThredsholds = []
	Object.entries(thresholds).forEach(([key, value], index) => {
		formatedThredsholds.push([[{"value": value.high, "Date": compareStartDate}, {"value": value.high, "Date": new Date(compareEndDate)}]])
		formatedThredsholds[index].push([{"value": value.low, "Date": compareStartDate}, {"value": value.low, "Date": new Date(compareEndDate)}])
});
	function compareData() {
		patient.forEach((p) => {
			if (
				p.Date.getTime() >= formatedCompareStart.getTime() &&
				p.Date.getTime() <= formatedCompareEnd.getTime()
			) {
				compareArray.push(p);
				compareArray = compareArray;
			}
		});
	}
	
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
			CaughingCount: p.CoughingCount,
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
	const xKey = 'Date';
	const yKey = 'value';
	const zKey = 'Data';
	const seriesNames = Object.keys(data[0]).filter((d) => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];
	const parseDate = timeParse('%Y-%m-%d');
	var titles = [
    "Breathing Rate (avg/min)",
    "BreathingDepth (avg%/min)",
    "Oxygen (SPO2) (avg/min)",
    "Coughing count (session)",
    "HeartRate (avg/min)",
    "HRV (avg)",
    "Arythmia count (during session)",
    "BodyTemperature (avg/session)"
  ]
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

<div class="row">
	<div class="column">
		<p>Start date</p>
		<label>
			<input type="date" bind:value={startDate} />
		</label>
		<p>End date</p>
		<label>
			<input type="date" bind:value={endDate} />
		</label>
	</div>
	{#if showCompare && !showGraph}
		<div class="column">
			<p>Start date</p>
			<label>
				<input type="date" bind:value={compareStartDate} />
			</label>
			<p>End date</p>
			<label>
				<input type="date" bind:value={compareEndDate} />
			</label>
			<button on:click={compareData}>Compare</button>
		</div>
	{/if}
</div>

<button on:click={getDataByDates}>Show data for dates</button>
<br />
<button on:click={toggleGraph}>Toggle Graph-view</button>
<br />
{#if !showGraph}
	<button on:click={() => (showCompare = !showCompare)}>Toggle Comparison</button>
{/if}

{#if !showGraph}
	<div class="row">
		<div class="column">
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
					<th>Caughing count (session)</th>
					{#each filteredPatient as patient}
						<th>{patient.CoughingCount}</th>
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
		</div>
		{#if showCompare == true && compareArray.length != 0}
			<div class="column">
				<table width="500" border="10">
					<tr>
						<th>{patient[0].name}</th>
						{#each compareArray as patient}
							<th>{patient.Date.toLocaleString()}</th>
							<!-- Getting the date for the session -->
						{/each}
					</tr>
					<tr>
						<th>Breathing Rate (avg/min)</th>
						{#each compareArray as patient}
							<th>{patient.BreathingRate}</th>
						{/each}
					</tr>
					<tr>
						<th>BreathingDepth (avg%/min)</th>
						{#each compareArray as patient}
							<th>{patient.BreathingDepth}</th>
						{/each}
					</tr>
					<tr>
						<th>Oxygen (SPO2) (avg/min)</th>
						{#each compareArray as patient}
							<th>{patient.SPO2}</th>
						{/each}
					</tr>
					<tr>
						<th>Caughing count (session)</th>
						{#each compareArray as patient}
							<th>{patient.CoughingCount}</th>
						{/each}
					</tr>
					<tr>
						<th>HeartRate (avg/min)</th>
						{#each compareArray as patient}
							<th>{patient.HeartRate}</th>
						{/each}
					</tr>
					<tr>
						<th>HRV (avg)</th>
						{#each compareArray as patient}
							<th>{patient.HRV}</th>
						{/each}
					</tr>
					<tr>
						<th>Arythmia count (during session)</th>
						{#each compareArray as patient}
							<th>{patient.ArythmiaCount}</th>
						{/each}
					</tr>
					<tr>
						<th>BodyTemperature (avg/session)</th>
						{#each compareArray as patient}
							<th>{patient.BodyTemperature}</th>
						{/each}
					</tr>
				</table>
			</div>
		{/if}
	</div>
{/if}

{#if showGraph}
<div class="bigdik">
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

	{#each dataLong as graph, i}
	<div class="chart-container">
		
		<h1 style="color: white;">{titles[i]}</h1>
		
		<LayerCake
			padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
			x={xKey}
			y={yKey}
			z={zKey}
			yDomain={[0, null]}
			zScale={scaleOrdinal()}
			zRange={seriesColors}
			flatData={flatten([dataLong[i]])}
			data={[dataLong[i]]}
		>
			<Svg>
				<AxisY ticks={4} formatTick={formatTickY} />
				<ThresholdLine thresholds={formatedThredsholds[i]}/>
				<MultiLine />
			</Svg>

			<Html>
				
				<Labels />
			</Html>
		</LayerCake>
	</div>
	{/each}
	
<Html>
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
	.bigdik{
		width: 100%;
		height: 1210px;
		margin-bottom: 50px;
	}
	.chart-container {
		width: 100%;
		height: 100px;
		margin-bottom: 50px;
	}
	.column {
		float: left;
		width: 50%;
	}
	/* Clear floats after the columns */
	.row:after {
		content: '';
		display: table;
		clear: both;
	}
</style>
