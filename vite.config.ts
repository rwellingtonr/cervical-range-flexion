/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite"
import ViteFonts from "vite-plugin-fonts"
import reactRefresh from "@vitejs/plugin-react-refresh"
import type { UserConfig as VitestUserConfigInterface } from "vitest/config"

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
		reactRefresh(),
		ViteFonts({
			google: {
				families: ["Roboto"],
			},
		}),
	],
	test: vitestConfig.test,
})
