import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	build: {outDir: 'build'},
	base: '/ozon_project/',
	server: {
		port: 5202,
	},
})
