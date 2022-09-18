import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		'__DATE__': '"' + new Date().toLocaleDateString('en-US', {
			year: "numeric",
			month: "long",
			day: "numeric"
		}) + '"'
	}
};

export default config;
