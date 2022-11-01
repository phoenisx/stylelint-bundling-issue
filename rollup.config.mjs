import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import esbuild from "rollup-plugin-esbuild";

const isProd = process.env.NODE_ENV === "production";

const commonPlugins = [
  alias({
    customResolver: resolve({ extensions: [".ts", ".js", ".json"] }),
  }),
  json(),
  resolve({
    browser: false,
    preferBuiltins: true,
  }),
  commonjs({
    ignoreGlobal: true,
  }),
  esbuild({
    minify: isProd,
    sourceMap: true,
    sourcesContent: !isProd,
    platform: "node",
    target: "node16",
  }),
];

/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    input: "src/stylelint.js",
    output: {
      file: "./out/bundle.js", // Should be same as package.json#main property value -> pkg.main
      format: "cjs",
      sourcemap: true,
      sourcemapExcludeSources: isProd,
    },
    plugins: commonPlugins,
  },
];
