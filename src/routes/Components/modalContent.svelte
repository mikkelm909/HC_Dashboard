<script lang="ts">
	import { getContext } from 'svelte';
	import EditThreshold from './editThreshold.svelte';
	const { open } = getContext('simple-modal');
	const openModal = () => open(EditThreshold);
</script>

<button class="btn btn-primary" on:click={openModal}>Modal</button>
