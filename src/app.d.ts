/// <reference types="@sveltejs/kit" />
/// <reference types="@sveltejs/adapter-cloudflare" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	interface Platform {
        env?: {
            SHORT_LINKS: KVNamespace;
            PASSWORD: string
        };
    }
	// interface Session {}
	// interface Stuff {}
}
