const { build } = require('esbuild');
const chalk = require('chalk');

const time = new Date().getTime();

const minify = false;

build({
  entryPoints: ['./src/main.js'],
  outfile: './dist/bundle_esbuild.js',
  minify,
  bundle: true,
}).catch(() => process.exit(1)).finally(() => {
  console.log(chalk.green(`【esbuild】${minify ? '（压缩后）' : ''}耗时`, new Date().getTime() - time + 'ms'));
  console.log('');
})