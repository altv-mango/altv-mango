import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { SERVICE_WORKER_PATH } from '@sveltepress/theme-default';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
    extensions: ['.svelte', '.md'],
    preprocess: [vitePreprocess()],
    kit: {
        adapter: adapter(),
    },
};

export default config;
