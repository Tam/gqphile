const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

require('esbuild').build({
	entryPoints: ['src/index.js'],
	bundle: true,
	format: 'iife',
	globalName: 'gqphile',
	minify: isProduction,
	sourcemap: !isProduction,
	outfile: pkg.main,
	watch: true,
}).then(result => {
	// Call "stop" on the result when you're done
	// result.stop();
});//.catch(() => process.exit(1));
