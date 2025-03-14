// app.config.ts
import { defineConfig } from "@tanstack/react-start/config";
import path from "node:path";
import tsConfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  tsr: {
    appDirectory: "src"
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"]
      })
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src")
        // Set '~' to point to the 'src' folder
      }
    }
  }
});
export {
  app_config_default as default
};
