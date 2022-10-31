<script lang="ts">

	import Login from "../Components/login.svelte";
	import type { PageData } from "./$types";


    export let data: PageData
</script>


<Login api={data.api}></Login>