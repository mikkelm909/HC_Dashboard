<script lang="ts">


    import type {PageData} from "./$types"


	export let data: PageData;


console.log(data)
</script>

<form method="POST" >
    <p>BreathingRate-UP 🔼</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.BreathingRateThreshold.high} type="number" name="BreathingRate-UP">
  <p>BreathingRate-LO 🔽</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.BreathingRateThreshold.low} type="number" name="BreathingRate-LO">

  <p>BreathingDepth-UP 🔼</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.BreathingDepthThreshold.high} type="number" name="BreathingDepth-UP">
  <p>BreathingDepth-LO 🔽</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.BreathingDepthThreshold.low} type="number" name="BreathingDepth-LO">

  <p>SPO2-UP 🔼</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.SPO2Threshold.high} type="number" name="SPO2-UP">
  <p>SPO2-LO 🔽</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.SPO2Threshold.low} type="number" name="SPO2-LO">

  <p>CaughingCount-UP 🔼</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.CaughingCountThreshold.high} type="number" name="CaughingCount-UP">
  <p>CaughingCount-LO 🔽</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.CaughingCountThreshold.low} type="number" name="CaughingCount-LO">

  <p>HeartRate-UP 🔼</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.HeartRateThreshold.high} type="number" name="HeartRate-UP">
  <p>HeartRate-LO 🔽</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.HeartRateThreshold.low} type="number" name="HeartRate-LO">

  <p>HRV-UP 🔼</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.HRVThreshold.high} type="number" name="HRV-UP">
  <p>HRV-LO 🔽</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.HRVThreshold.low} type="number" name="HRV-LO">

  <p>ArythmiaCount-UP 🔼</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.ArythmiaCountThreshold.high} type="number" name="ArythmiaCount-UP">
  <p>ArythmiaCount-LO 🔽</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.ArythmiaCountThreshold.low} type="number" name="ArythmiaCount-LO">

  <p>BodyTemperature-LO 🔼</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.BodyTemperatureThreshold.high} type="number" name="BodyTemperature-UP">
  <p>BodyTemperature-LO 🔽</p>
  <input bind:value={data.patientData[0].HCProThresholds.Thresholds.BodyTemperatureThreshold.low} type="number" name="BodyTemperature-LO">

  <button>Update</button>
</form>