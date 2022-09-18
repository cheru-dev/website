import {error, redirect} from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, platform }: { params: any, platform: any }) {
    const redirectURL = import.meta.env.DEV
        ? params.slug == "aaa"
            ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            : null
        : await platform.env.SHORT_LINKS.get(params.slug)

    if (redirectURL) {
        throw redirect(302, redirectURL)
    }

    throw error(404, 'Not found');
}