console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);

module.exports = {
  publicPath: '/',
  devServer: {
    port: 9527,
    proxy: {
      '/data': {
        target: 'http://localhost:2222',
        changeOrigin: true,
        pathRewrite: {
          '^/data/': '/'
        }
      },
      '/server': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/server/': '/'
        }
      }
    }
  }
}