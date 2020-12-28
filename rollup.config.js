import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const dist = "dist";

const globals = {
  react: "React",
};

const external = Object.keys(globals);

export default {
  input: "src/index.js",
  external,
  output: [
    {
      file: `${dist}/bundle.cjs.js`,
      format: "cjs",
    },
    {
      file: `${dist}/bundle.esm.js`,
      format: "esm",
    },
    {
      globals,
      name: "SmartContext",
      file: `${dist}/bundle.umd.js`,
      format: "umd",
    },
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    nodeResolve(),
    commonjs(),
    terser(),
  ],
};
