import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { installGlobals } from "@remix-run/node";

installGlobals();

export default defineConfig({
    plugins: [remix({
        ignoredRouteFiles: ["**/*.css"],
    }), netlifyPlugin(), tsconfigPaths()],
});
