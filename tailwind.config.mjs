/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				vt323: ['VT323', 'monospace'],
				orbitron: ['Orbitron', 'sans-serif'],
			}
		},
	},
	plugins: [],
}