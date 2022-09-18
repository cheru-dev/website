<script lang="ts">
    import Square from "$lib//Square.svelte";

    export let columns

    let squares = columns**2

    let lastHue = 0
    let hue = 0

    /*  let colors = ["red", "orange", "yellow", "green", "blue", "purple"]
     colors = ["#ff2c1a", "#ff7303", "#fae442",
        "#418307", "#0b45d9", "#8c00ff"]
    let colorIndex = 0
    $: color = colors[colorIndex]*/
</script>

    <div class="grid" style="--columns: {columns}">
        {#each {length: squares} as a,b }
            <Square extColor={`hsl(${hue}deg, 100%, 50%, 0.5)`} on:colorChange={() => {
                    // colorIndex = (colorIndex + 1) % colors.length

                    hue = (lastHue + 12 + Math.floor(Math.random() * 16)) % 360
				    lastHue = hue
                }} />
        {/each}
    </div>


<style lang="sass">
    .grid
      width: 100%
      height: 100%
      position: fixed
      display: grid
      grid-template-columns: repeat(var(--columns), 1fr)
      filter: blur(10px)
</style>