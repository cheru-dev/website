<script lang="ts">
    import {page} from "$app/stores"
</script>


<h1>Error {$page.status}!</h1>
<p>{$page.error.message}</p>
{#if $page.status === 404}
    <img src="https://c.tenor.com/VFFJ8Ei3C2IAAAAM/rickroll-rick.gif" alt="Rick Astley!">
    <p><em>Sorry not sorry.</em></p>
    {/if}