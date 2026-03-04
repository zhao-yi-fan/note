function loader (source) {
  console.log('inline-loader');
  console.log(source,'source===');
  return source
}

module.exports = loader