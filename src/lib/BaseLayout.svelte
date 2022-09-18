<script lang="ts">
    import {theme} from "$lib/js/stores";
    import {browser} from "$app/env";
    import "$lib/css/normalize.css"
    import "$lib/css/main.sass"
    import Header from "$lib/Header.svelte";
    import {fade} from "svelte/transition"
    import Grid from "$lib/Grid.svelte";

    const columns = 6

    const background = import.meta.env.DEV ? "dev" : ""

    $: if (browser) {
        localStorage.setItem("theme", $theme === 'dark' ? 'dark' : 'light')
    }

    export let grid = true
    export let box = true
    export let header = true

</script>

<div class="main {background}">
    {#if grid}
        <Grid columns={columns}/>
    {/if}
    {#if box}
        <div class="page">
            <div transition:fade class="box {$theme}">
                <div class="text">
                    {#if header}
                        <Header/>
                    {/if}
                    <slot></slot>
                </div>
            </div>
        </div>
    {:else}
        <slot></slot>
    {/if}
</div>