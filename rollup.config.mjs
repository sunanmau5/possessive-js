import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "default"
    },
    {
      file: "dist/index.mjs",
      format: "esm"
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    terser({
      format: {
        comments: false
      }
    })
  ]
};
