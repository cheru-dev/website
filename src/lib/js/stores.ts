import {writable} from "svelte/store";
import {browser} from "$app/env"

let themeIntermediate: string | null;
if (browser) {
    themeIntermediate = localStorage.getItem("theme")
} else {
    themeIntermediate = 'light'
}

export const theme = writable(themeIntermediate)