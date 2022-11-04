<script lang="ts">
    export let patients: any[] = []
</script>

<table width="500" border="10">
    <tr>

        <th>Mikkel Meiling</th>
        {#each patients as patient}
        <th>{patient.Date.getDay()}-{patient.Date.toLocaleString('default', { month: 'short' })}</th> <!-- Getting the date for the session -->
    {/each}  
    </tr>
    <tr>
        <th>Breathing Rate (avg/min)</th>
        {#each patients as patient}
        <th>{patient.BreathingRate}</th>
    {/each}  
    </tr>
    <tr>
        <th>BreathingDepth (avg%/min)</th>
        {#each patients as patient}
        <th>{patient.BreathingDepth}</th>
    {/each}  
    </tr>
    <tr>
        <th>Oxygen (SPO2) (avg/min)</th>
        {#each patients as patient}
        <th>{patient.SPO2}</th>
    {/each}  
    </tr>
    <tr>
        <th>Caughing count (session)</th>
        {#each patients as patient}
        <th>{patient.CaughingCount}</th>
    {/each}  
    </tr>
    <tr>
        <th>HeartRate (avg/min)</th>
        {#each patients as patient}
        <th>{patient.HeartRate}</th>
    {/each}  
    </tr>
    <tr>
        <th>HRV (avg)</th>
        {#each patients as patient}
        <th>{patient.HRV}</th>
    {/each}  
    </tr>
    <tr>
        <th>Arythmia count (during session)</th>
        {#each patients as patient}
        <th>{patient.ArythmiaCount}</th>
    {/each}  
    </tr>
    <tr>
        <th>BodyTemperature (avg/session)</th>
        {#each patients as patient}
        <th>{patient.BodyTemperature}</th>
    {/each}  
    </tr>
</table>

