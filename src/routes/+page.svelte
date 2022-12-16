<script lang="ts">
	import { storeHCPId } from '$protectedMongoId';
	import type { PageData } from './$types';
	import ProtectedLayout from './Components/ProtectedLayout.svelte';
	export let data: PageData;
</script>

<ProtectedLayout>
	<div>
		<a href="/patientsOverview/{$storeHCPId}"><button>patientsOverview</button></a>
		<a href="/login"><button>login</button></a>
	</div>
</ProtectedLayout>
