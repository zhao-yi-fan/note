module.exports = {
  server: {
    port: 8002,
  },
  empShare: {
    name: 'host',
    remotes: {
      '@remote': 'remote@http://127.0.0.1:8001/emp.js'
    }
  }
}

