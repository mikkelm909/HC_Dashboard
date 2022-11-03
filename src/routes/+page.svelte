

<script lang="ts">
    import type { PageData } from "./$types";
	import ProtectedLayout from "./Components/ProtectedLayout.svelte";
    export let data: PageData

    

    


</script>
<ProtectedLayout>
        <div>
        <h1>Query fetch from Mongodb</h1>

        <table width="500" border="10"> 
            <tr> 
                <th>id</th> 
                <th>Message</th> 
            </tr> 
            {#each data.test as i} 
            <tr> 
                <td>{i.id}</td> 
                <td> {i.message}</td> 
            </tr> 
            {/each} 
        </table>
    </div>
</ProtectedLayout>



