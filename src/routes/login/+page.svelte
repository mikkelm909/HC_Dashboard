<script lang="ts">

	import Login from "../Components/login.svelte";
	import type { PageData } from "./$types";


    export let data: PageData

    const test = data //jeg mangler desperat bedre navne til mine properties
	console.log(data)
</script>


<Login api={data.api}></Login>