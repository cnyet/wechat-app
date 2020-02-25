module.exports = {
  devServer: {
    host: 'm.yates.com',
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
};
