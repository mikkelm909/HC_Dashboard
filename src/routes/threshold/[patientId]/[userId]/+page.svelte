<script lang="ts">


    import type {PageData} from "./$types"


	export let data: PageData;


console.log(data)
</script>

<form method="POST" >
    <p>BreathingRateTH</p>
  <input name="BreathingRateTH">
  <p>BreathingDepthThreshold</p>
  <input name="BreathingDepthThreshold">
  <p>SPO2Threshold</p>
  <input name="SPO2Threshold">
  <p>BreathingDepthThreshold</p>
  <input name="BreathingDepthThreshold">
  <p>CaughingCountThreshold</p>
  <input name="CaughingCountThreshold">
  <p>HeartRateThreshold</p>
  <input name="HeartRateThreshold">
  <p>HRVThreshold</p>
  <input name="HRVThreshold">
  <p>ArythmiaCountThreshold</p>
  <input name="ArythmiaCountThreshold">
  <p>BodyTemperatureThreshold</p>
  <input name="BodyTemperatureThreshold">
  <button>Update</button>
</form>