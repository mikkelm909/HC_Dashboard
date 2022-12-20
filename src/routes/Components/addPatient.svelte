<script lang="ts">
	import { storeUser } from "$protectedUser";
	import { json } from "@sveltejs/kit";
	import { onMount } from "svelte";
  let uid = ""

  onMount(async () => {
    let userData = $storeUser
    uid = JSON.parse(userData).uid
  })

</script>


<h1>Add a patient</h1>
<h5>Send an e-mail invite</h5>
<form method="POST">
    <input
    type="string"
    name="email"
  />  
    <input
    type="hidden"
    name="uid"
    bind:value={uid}
  />  

	<button class="btn btn-outline-primary">Send email authetication</button>
</form>