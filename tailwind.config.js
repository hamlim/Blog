let path = require('path')

module.exports = {
  content: [
    './app/**/*.tsx',
    './lib/**/*.tsx',
    path.join(path.dirname(require.resolve('@ds-pack/daisyui')), '/**/*.js'),
  ],
  plugins: [require('daisyui')],
  daisyui: {
    logs: false,
  },
}
