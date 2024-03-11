import { defineConfig } from 'vite';
import { sveltepress } from '@sveltepress/vite';
import { defaultTheme } from '@sveltepress/theme-default';

const config = defineConfig({
    plugins: [
        sveltepress({
            theme: defaultTheme({
                themeColor: {
                    dark: '#1e1e1e',
                    light: '#fff',
                    gradient: { end: '#4cc66f', start: '#4cc66f' },
                    // ffd70c
                    // 4cc66f
                    // ffbe00
                },
                navbar: [
                    {
                        title: 'Guide',
                        to: '/guide/introduction/getting-started/',
                    },
                    // {
                    //     title: '1.0.0',
                    //     collapsible: true,
                    //     items: [
                    //         {
                    //             title: 'Changelog',
                    //             to: '/changelog/1.0.0/',
                    //         },
                    //     ],
                    // },
                ],
                sidebar: {
                    '/guide/': [
                        {
                            title: 'Introduction',
                            collapsible: true,
                            items: [
                                {
                                    title: 'Getting Started',
                                    to: '/guide/introduction/getting-started/',
                                },
                            ],
                        },
                        {
                            title: 'Core Features',
                            collapsible: true,
                            items: [
                                {
                                    title: 'Modules',
                                    to: '/guide/core-features/modules/',
                                },
                                {
                                    title: 'Providers',
                                    to: '/guide/core-features/providers/',
                                },
                                {
                                    title: 'Controllers',
                                    to: '/guide/core-features/controllers/',
                                },
                                {
                                    title: 'Lifecycle Methods',
                                    to: '/guide/core-features/lifecycle-methods/',
                                },
                                {
                                    title: 'Guards',
                                    to: '/guide/core-features/guards/',
                                },
                                {
                                    title: 'Interceptors',
                                    to: '/guide/core-features/interceptors/',
                                },
                                {
                                    title: 'Pipes',
                                    to: '/guide/core-features/pipes/',
                                },
                                {
                                    title: 'Error Filters',
                                    to: '/guide/core-features/error-filters/',
                                },
                                {
                                    title: 'Method Decorators',
                                    to: '/guide/core-features/method-decorators/',
                                },
                                {
                                    title: 'Custom Decorators',
                                    to: '/guide/core-features/custom-decorators/',
                                },
                                {
                                    title: 'Plugins',
                                    to: '/guide/core-features/plugins/',
                                },
                            ],
                        },
                        {
                            title: 'Techniques',
                            collapsible: true,
                            items: [
                                {
                                    title: 'Rate Limiting',
                                    to: '/guide/techniques/rate-limiting/',
                                },
                            ],
                        },
                        {
                            title: 'Common',
                            collapsible: true,
                            items: [
                                {
                                    title: 'Services',
                                    to: '/guide/common/services/',
                                },
                                {
                                    title: 'Local Events',
                                    to: '/guide/common/local-events/',
                                },
                                {
                                    title: 'Local Requests',
                                    to: '/guide/common/local-requests/',
                                },
                            ],
                        },
                        {
                            title: 'Server',
                            collapsible: true,
                            items: [
                                {
                                    title: 'Events',
                                    to: '/guide/server/events/',
                                },
                                {
                                    title: 'Requests',
                                    to: '/guide/server/requests/',
                                },
                            ],
                        },
                        {
                            title: 'Client',
                            collapsible: true,
                            items: [
                                {
                                    title: 'Services',
                                    to: '/guide/client/services/',
                                },
                                {
                                    title: 'Events',
                                    to: '/guide/client/events/',
                                },
                                {
                                    title: 'Requests',
                                    to: '/guide/client/requests/',
                                },
                            ],
                        },
                        {
                            title: 'WebView',
                            collapsible: true,
                            items: [
                                {
                                    title: 'Setup',
                                    to: '/guide/webview/setup/',
                                },
                                {
                                    title: 'Events',
                                    to: '/guide/webview/events/',
                                },
                                {
                                    title: 'RPCs',
                                    to: '/guide/webview/rpcs/',
                                },
                            ],
                        },
                    ],
                },
                github: 'https://github.com/altv-mango/altv-mango',
                logo: '/mango.png',
                highlighter: {
                    languages: ['svelte', 'sh', 'js', 'html', 'ts', 'md', 'css', 'scss', 'json', 'tsx'],
                },
                docsearch: {
                    apiKey: '7823e6cece5e8ca5c8cc254bb3e6a228',
                    appId: 'VZAZMXLGRB',
                    indexName: 'altv-mango',
                },
            }),
            siteConfig: {
                title: 'Mango Framework',
                description: 'Create your own alt:V server with ease',
            },
        }),
    ],
});

export default config;
