/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite/"
import react from "@vitejs/plugin-react"
import ViteFonts from "vite-plugin-fonts"
import type { UserConfig as VitestUserConfigInterface } from "vitest/config"
import "dotenv/config"

const vitestConfig: VitestUserConfigInterface = {
	test: {
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.spec.*"],
		setupFiles: "./src/test/setup.ts",
		clearMocks: true,
		watch: false,
	},
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		ViteFonts({
			google: {
				families: ["Roboto"],
			},
		}),
	],
	server: {
		port: +process.env.PORT,
	},
	test: vitestConfig.test,
})
