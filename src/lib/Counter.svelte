<script lang="ts">
    import {browser} from "$app/env";
    import converter from "number-to-words"

    let visitCount: number
    if (browser) {
        visitCount = parseInt(localStorage.getItem("visitCount") || "0")
        visitCount += 1
    } else {
        visitCount = 1
    }

    $: if (browser) {
        localStorage.setItem("visitCount", String(visitCount))
    }

</script>

{converter.toWords(visitCount) + ' ' + (visitCount === 1 ? "time" : "times")}