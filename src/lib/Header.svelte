<script lang="ts">
    import {theme} from "$lib/js/stores.js";
</script>

<div class="header {$theme}">
    <p class="title"><a href="/"><b>Cheru.dev</b></a></p>
    <div class="links">
        <p><a href="mailto:hi@cheru.dev"><b>E-Mail</b></a></p>
        <p class="link" style="padding-right: 0; padding-left: 0"><b>|</b></p>
        <p class="link" on:click={() => {
                    $theme = $theme === 'dark' ? 'light' : 'dark'
                    }}><b>[{$theme === 'dark' ? 'Light Mode' : 'Dark Mode'}]</b></p>
    </div>
</div>
<hr class="{$theme}">

<style lang="sass">
  .header
    display: flex
    font-family: "Jetbrains Mono", monospace
    flex-wrap: wrap

    a
      color: black

    &.dark
      .link, a
        color: white

      hr
        color: white


    p
      margin: 0
      padding: 2vh 1vh 1vh 1vh

  .links
    margin-left: auto
    display: flex

  hr
    margin: 0

    &.dark
      color: white

</style>
