<script lang="ts">
	import type { PageData } from ".svelte-kit/types/src/routes/$types";    
    export let data: PageData
    $: ({test} = data)
</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
