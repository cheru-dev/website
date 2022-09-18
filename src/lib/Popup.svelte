<script lang="ts">
import {onMount} from "svelte";
import {theme} from "$lib/js/stores";
import {browser} from "$app/env";
import {fade} from "svelte/transition"

let minutePopup: boolean[] = []

onMount(() => {
    setTimeout(() => {
        minutePopup.push(true)
        minutePopup = minutePopup
        setInterval(() => {
            minutePopup.push(true)
            minutePopup = minutePopup
        }, 60000)
    }, 60000 - (new Date().getTime() % 60000))
})

let cookiePopupDisabled: boolean | null;
if (browser) {
    cookiePopupDisabled = localStorage.getItem("cookiePopupDisabled") === "true"
} else {
    cookiePopupDisabled = false
}

$: if (browser) {
    localStorage.setItem("cookiePopupDisabled", cookiePopupDisabled ? "true" : "false")
}

let cookiePopup: boolean
if (browser) {
    cookiePopup = !cookiePopupDisabled
} else {
    cookiePopup = false
}

let timeMessage = false

let visible0 = false
let visible1 = false
let visible2 = false
let visible3 = false
let visible4 = false
let visible5 = false
let visible6 = false
let visible7 = false


</script>

<div class="popupContainer">
    {#if cookiePopup}
        <div transition:fade class="popup {$theme}">
            <div class="popupContent">
                <p>🍪</p>
            </div>
            <div class="popupContent">
                <p>This site does not use cookies.</p>
            </div>
            <div class="popupContent" style="margin-left: auto; margin-right: 1%; display: flex">
                <p class="link" on:click={() => {
                cookiePopup = false
            }}>[ok]</p>
                <p>&nbsp;&nbsp;</p>
            <p class="link" on:click={() => {
                cookiePopup = false
                cookiePopupDisabled = true
            }}>[do not show again]</p>
            </div>
        </div>
    {/if}

    {#each minutePopup as minute}
        <div transition:fade class="popup {$theme}">
            <div class="popupContent">
                <p>⌛</p>
            </div>
            <div class="popupContent">
                <p>A new minute has been constructed.</p>
            </div>
            <div class="popupContent" style="margin-left: auto; margin-right: 1%; display: flex">
                <p class="link" on:click={() => {
                minutePopup.pop()
                minutePopup = minutePopup
            }}>[ok]</p>
                <p>&nbsp;&nbsp;</p>
                <!-- TODO: work on this message lol -->
           <p class="link" on:click={() => {
               timeMessage = true
            }}>[cancel]</p></div>
        </div>
    {/each}
</div>

{#if timeMessage}
    <div transition:fade on:introend={setTimeout(() => visible0 = true, 2000)} class="timeMessageContainer">
        {#if visible0}<h1 transition:fade
                          on:outroend={setTimeout(() => {visible1 = true}, 1000)}
                          on:introend={setTimeout(() => {visible0 = false}, 4000)}
                          class="timeMessage">You cannot cancel the passage of time.</h1>{/if}
        {#if visible1}<h1 transition:fade
                          on:outroend={setTimeout(() => {visible2 = true}, 1000)}
                          on:introend={setTimeout(() => {visible1 = false}, 4000)}
                          class="timeMessage">Time cannot be stopped.</h1>{/if}
        {#if visible2}<h1 transition:fade
                          on:outroend={setTimeout(() => {visible3 = true}, 1000)}
                          on:introend={setTimeout(() => {visible2 = false}, 4000)}
                          class="timeMessage">Time is inevitable.</h1>{/if}
        {#if visible3}<h1 transition:fade
                          on:outroend={setTimeout(() => {visible4 = true}, 1000)}
                          on:introend={setTimeout(() => {visible3 = false}, 4000)}
                          class="timeMessage">Time is... inescapable.</h1>{/if}
        {#if visible4}<h1 transition:fade
                          on:outroend={setTimeout(() => {visible5 = true}, 1000)}
                          on:introend={setTimeout(() => {visible4 = false}, 4000)}
                          class="timeMessage">No matter how fast you run from it, it is always right behind you.</h1>{/if}
        {#if visible5}<h1 transition:fade
                          on:outroend={setTimeout(() => {visible6 = true}, 1000)}
                          on:introend={setTimeout(() => {visible5 = false}, 4000)}
                          class="timeMessage">It waits for no one.<br>It bends for no one.</h1>{/if}
        {#if visible6}<h1 transition:fade
                          on:outroend={setTimeout(() => {visible7 = true}, 1000)}
                          on:introend={setTimeout(() => {visible6 = false}, 6000)}
                          class="timeMessage">It is an unstoppable force that penetrates any smidgen of hope you may hold in your soul.</h1>{/if}
        {#if visible7}<h1 transition:fade
                          class="link timeMessage"
                          on:click={() => {timeMessage = false; visible7 = false}}><u>[Accept?]</u></h1>{/if}
    </div>
{/if}

<style lang="sass">
  .timeMessageContainer
        position: fixed
        top: 0
        left: 0
        width: 100vw
        height: 100vh
        background-color: black
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column


  .timeMessage
    color: white
    text-align: center

  .popup
    width: 100%
    background-color: black
    color: white
    display: flex
    flex-wrap: wrap
    font-family: "Jetbrains Mono", monospace

    &.dark
      background-color: white
      color: black

      .link
        color: black !important

  .popupContainer
    position: fixed
    top: 0
    left: 0
    display: flex
    flex-direction: column
    width: 100vw

  .popupContent
    margin: 0 .5% 0 .5%
</style>
