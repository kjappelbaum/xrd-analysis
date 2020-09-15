import nodePolyfills from 'rollup-plugin-node-polyfills';
export default {
  input: 'src/index.js',
  plugins: [nodePolyfills()],
  output: {
    format: 'cjs',
    file: 'lib/index.js',
  },
};
