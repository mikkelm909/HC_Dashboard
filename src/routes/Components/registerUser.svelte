<script>
    let selectedGender;
    export let display;
  </script>
  
{#if display == true}
<h1>Confirm your account</h1>
<h2>Please enter your details</h2>
<form method="POST">
  <p class="margin">Name</p>
    <input
    type="string"
    name="name"
  />
  <p class="margin">Age</p>
    <input
    type="number"
    name="age"
  />
  <p class="margin">Weight (kg)</p>
    <input
    type="number"
    name="weight"
  />
  <p class="margin">Height (cm)</p>
    <input
    type="string"
    name="height"
  />
  <p class="margin">Gender</p>
  <select bind:value={selectedGender}>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>

  <input
    type="hidden"
    name="sex"
    bind:value={selectedGender}
  />
    <button class="btn btn-outline-primary">Add yourself</button>
</form>
{:else}
    <h1>There are no pending requests...</h1>
{/if }
  
  <style>
    .margin{
      margin-top: 10px;
      margin-bottom: 5px;
    }
  </style>