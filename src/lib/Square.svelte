<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let extColor

    const dispatch = createEventDispatcher()
    let color: string
    let opacity = "0"
    let className = "fast"

    let colorPermanent = false

    let mouseHovering = false

    function changeColor() {
        mouseHovering = true
        if (!colorPermanent) {
            color = extColor
            opacity = "100%"
            dispatch('colorChange')
            className = "fast"
        }
    }

    function revertColor() {
        mouseHovering = false
        if (!colorPermanent) {
            setTimeout(() => {
                if (!mouseHovering) {
                    opacity = "0"
                    className = ""
                }
            }, 500)
        }
    }

    function clickHandler() {
        if (colorPermanent) {
            opacity = "0"
            className = ""
            colorPermanent = false
        } else {
            colorPermanent = true
        }
    }
</script>


    <div class="square {className}" on:mouseenter={changeColor} on:mouseleave={revertColor} on:click={clickHandler} style="background-color: {color}; opacity: {opacity}"></div>


<style lang="sass">
  .square
    height: 100%
    width: 100%
    transition: 800ms opacity linear

    &.fast
      transition: 50ms opacity linear


</style>