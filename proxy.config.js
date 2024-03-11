const proxy = [
    {
      context: '/api',
      target: 'https://economia.awesomeapi.com.br/',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;