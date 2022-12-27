import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

const dist = 'dist'

const globals = {
  react: 'React',
}

const external = Object.keys(globals)

const getPlugins = () => [nodeResolve(), commonjs(), typescript(), terser()]

export default [
  {
    input: 'src/index.ts',
    external,
    output: [
      {
        file: `${dist}/bundle.cjs.js`,
        format: 'cjs',
      },
      {
        file: `${dist}/bundle.esm.js`,
        format: 'esm',
      },
      {
        globals,
        name: 'SmartContext',
        file: `${dist}/bundle.umd.js`,
        format: 'umd',
      },
    ],
    plugins: getPlugins(),
  },
  {
    input: `src/index.ts`,
    output: [
      {
        file: `${dist}/smart-context.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
]
