module.exports = {
  server: {
    port: 8001,
  },
  empShare: {
    name: 'remote',
    exposes: {
      './App': './src/App',
      './test': './src/test'
    }
  }
}
