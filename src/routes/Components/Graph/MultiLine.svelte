<!--
  @component
  Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
 <script lang="ts">
  import { getContext } from 'svelte';
	import Login from '../login.svelte';

  const { data, xGet, yGet, zGet } = getContext('LayerCake');

  $: path = values => {
    return 'M' + values
      .map(d => {
        return $xGet(d) + ',' + $yGet(d);
      })
      .join('L');
  }; 

  
  var colors = [
    "#e67373",
    "#e69973",
    "#e6da73",
    "#73e67e",
    "#73e6d4",
    "#73b4e6",
    "#7a73e6",
    "#b873e6",
    "#e673d0",
    "#e6da73",
    "#73e67e",
  ]
</script>

<g class="line-group">
  {#each $data as group, i}

  <path
      class='path-line'
      d='{path(group.values)}'
      stroke={colors[i]}
    ></path>

    
  {/each}
</g>

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 3px;
  }
</style>