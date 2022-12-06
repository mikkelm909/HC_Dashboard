<script lang="ts">
	import { getContext } from 'svelte';
	import EditThreshold from './editThreshold.svelte';
	export let patientData;
	export let thresholds;
	const { open } = getContext('simple-modal');
	const openModal = () => open(EditThreshold, { thresholds: thresholds });
</script>

<button class="btn btn-primary" on:click={openModal}>Modal</button>
