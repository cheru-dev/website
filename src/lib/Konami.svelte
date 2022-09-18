<script lang="ts">
    let cheatCode = []
    const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]
    let unlocked = false
</script>

<svelte:window on:keydown={(e) => {
	if (cheatCode.length >= 10) {
		[, ...cheatCode] = cheatCode
	}

	cheatCode = [...cheatCode, e.key]
		// check cheat
	let tempUnlocked = true
	if (cheatCode.length !== konami.length) tempUnlocked = false
	else for (let i = 0; i < cheatCode.length; ++i) {
        if (cheatCode[i] !== konami[i]) {
            tempUnlocked = false
            break
        }
    }

    if (tempUnlocked) {
        console.log("unlocked")
        unlocked = true
    }
}} />