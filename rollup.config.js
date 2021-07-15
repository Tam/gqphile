import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

const babelPlugin = babel({
	babelHelpers: 'bundled',
	exclude: 'node_modules/**',
});

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: 'gqphile',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find dependencies
			babelPlugin,
			commonjs(), // so Rollup can convert dependencies to an ES module
			replace({
				preventAssignment: true,
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
		],
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: ['graphql'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			babelPlugin,
		],
	},
];
