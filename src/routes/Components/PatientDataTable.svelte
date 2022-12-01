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

	export let patientData: any[] = [];
	export var patientId: string;
	let startDate: Date = new Date('2000-11-10');
	let endDate: Date = new Date('3000-11-10');

	$: formatedStart = new Date(startDate);
	$: formatedEnd = new Date(endDate);

	let compareStartDate: Date = new Date(Date.now() - 604800000);
	let compareEndDate: Date = new Date(Date.now());
	$: formatedCompareStart = new Date(compareStartDate);
	$: formatedCompareEnd = new Date(compareEndDate);
	let showCompare = false;
	let compareArray: [] = [];

	const patientName = patientData[0].name.replace(' ', '\n');
	console.log(patientName);

	function compareData() {
		patientData.forEach((p) => {
			if (
				p.Date.getTime() >= formatedCompareStart.getTime() &&
				p.Date.getTime() <= formatedCompareEnd.getTime()
			) {
				compareArray.push(p);
				compareArray = compareArray;
			}
		});
		console.log(compareArray);
	}

	let showGraph = false;

	function toggleGraph() {
		showGraph = !showGraph;
	}

	var filteredPatient: any[] = [];
	function getDataByDates() {
		filteredPatient = [];
		patientData.forEach((p) => {
			if (p.Date.getTime() <= formatedEnd.getTime() && p.Date.getTime() >= formatedStart.getTime())
				filteredPatient.push(p);
		});
	}

	filteredPatient = patientData;

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

<div class="bg-dark text-light">
	<p transition:fade>Fades in and out</p>

	<div class="row">
		<div class="col-sm">
			<div class="row">
				<div class="col-sm">
					<div class="form-group">
						<label>Start date</label>
						<input class="form-control" type="date" style="width: 200px" bind:value={startDate} />
						<label>End date</label>
						<input class="form-control" type="date" style="width: 200px" bind:value={endDate} /><br
						/>
						<button class="btn btn-primary" on:click={getDataByDates}>Show data for dates</button>
					</div>
				</div>
				<div class="col-sm">
					<div class="form-group">
						<input type="checkbox" class="form-check-input" bind:checked={showCompare} />
						<label class="form-check-label">Toggle comparison</label>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm">
			{#if showCompare && !showGraph}
				<div class="form-group">
					<label>Start date</label>
					<input
						class="form-control"
						type="date"
						style="width: 200px"
						bind:value={compareStartDate}
					/>

					<label>End date</label>
					<input
						class="form-control"
						type="date"
						style="width: 200px"
						bind:value={compareEndDate}
					/><br />
					<button class="btn btn-primary" on:click={compareData}>Compare</button>
				</div>
			{/if}
		</div>
	</div>

	<br />
	<button class="btn btn-primary" on:click={toggleGraph}>Toggle Graph-view</button>
	<br />

	{#if !showGraph}
		<div class="container-fluid" style="margin-top: 10px">
			<div class="row">
				<div class="col-sm">
					<table class="table table-bordered table-striped table-dark">
						<thead>
							<tr>
								<th style="white-space: pre">{patientName}</th>
								{#each filteredPatient as patient}
									<th>{patient.Date.toLocaleString().split(' ')[0]}</th>
									<!-- Getting the date for the session -->
								{/each}
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Breathing Rate <br />(avg/min)</th>
								{#each filteredPatient as patient}
									<th>{patient.BreathingRate}</th>
								{/each}
							</tr>
							<tr>
								<th>BreathingDepth <br />(avg%/min)</th>
								{#each filteredPatient as patient}
									<th>{patient.BreathingDepth}</th>
								{/each}
							</tr>
							<tr>
								<th>Oxygen (SPO2) <br />(avg/min)</th>
								{#each filteredPatient as patient}
									<th>{patient.SPO2}</th>
								{/each}
							</tr>
							<tr>
								<th>Caughing count <br />(session)</th>
								{#each filteredPatient as patient}
									<th>{patient.CoughingCount}</th>
								{/each}
							</tr>
							<tr>
								<th>HeartRate <br />(avg/min)</th>
								{#each filteredPatient as patient}
									<th>{patient.HeartRate}</th>
								{/each}
							</tr>
							<tr>
								<th>HRV <br />(avg)</th>
								{#each filteredPatient as patient}
									<th>{patient.HRV}</th>
								{/each}
							</tr>
							<tr>
								<th>Arythmia count <br />(during session)</th>
								{#each filteredPatient as patient}
									<th>{patient.ArythmiaCount}</th>
								{/each}
							</tr>
							<tr>
								<th>BodyTemperature <br />(avg/session)</th>
								{#each filteredPatient as patient}
									<th>{patient.BodyTemperature}</th>
								{/each}
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-sm">
					{#if showCompare == true && compareArray.length != 0}
						<table class="table table-bordered table-striped table-dark">
							<thead>
								<tr>
									<th style="white-space:pre">{patientName}</th>
									{#each compareArray as patient}
										<th style="white-space:pre">{patient.Date.toLocaleString().split(' ')[0]}</th>
										<!-- Getting the date for the session -->
									{/each}
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>Breathing Rate <br />(avg/min)</th>
									{#each compareArray as patient}
										<th>{patient.BreathingRate}</th>
									{/each}
								</tr>
								<tr>
									<th>BreathingDepth <br />(avg%/min)</th>
									{#each compareArray as patient}
										<th>{patient.BreathingDepth}</th>
									{/each}
								</tr>
								<tr>
									<th>Oxygen (SPO2) <br />(avg/min)</th>
									{#each compareArray as patient}
										<th>{patient.SPO2}</th>
									{/each}
								</tr>
								<tr>
									<th>Caughing count <br />(session)</th>
									{#each compareArray as patient}
										<th>{patient.CoughingCount}</th>
									{/each}
								</tr>
								<tr>
									<th>HeartRate <br />(avg/min)</th>
									{#each compareArray as patient}
										<th>{patient.HeartRate}</th>
									{/each}
								</tr>
								<tr>
									<th>HRV <br />(avg)</th>
									{#each compareArray as patient}
										<th>{patient.HRV}</th>
									{/each}
								</tr>
								<tr>
									<th>Arythmia count <br />(during session)</th>
									{#each compareArray as patient}
										<th>{patient.ArythmiaCount}</th>
									{/each}
								</tr>
								<tr>
									<th>BodyTemperature <br />(avg/session)</th>
									{#each compareArray as patient}
										<th>{patient.BodyTemperature}</th>
									{/each}
								</tr>
							</tbody>
						</table>
					{/if}
				</div>
			</div>
		</div>
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

	<a href="/threshold/{patientId}/{$storeHCPId}"
		><button class="btn btn-primary">Edit Threshold</button></a
	>
</div>

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
