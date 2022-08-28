const path = require('path')
const pkg = require(path.resolve(process.cwd(), 'package.json'))

const NAME = 'AnimationFramer'
const banner = `/*!
 * ${NAME || pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * @license ${pkg.license}
 * Copyright ${pkg.author}
 */`

module.exports = {
  babel: {
    minimal: true,
  },
  banner,
  input: ['src/index.ts'],
  output: {
    moduleName: 'animation-framer',
    format: ['es'],
    sourceMap: false,
    target: 'browser',
  },
  plugins: {
    replace: { preventAssignment: true },
  },
}
