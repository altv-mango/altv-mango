// const typography = require('@tailwindcss/typography');
// const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        fontFamily: {
            sans: ['Chalet-LondonNineteenSixty'],
        },
    },

    plugins: [require('daisyui'), require('tailwindcss-animated')],
    daisyui: {
        themes: [
            {
                corporate: {
                    ...require('daisyui/src/theming/themes')['corporate'],
                    primary: '#2563eb',
                },
            },
        ],
    },
};

module.exports = config;
