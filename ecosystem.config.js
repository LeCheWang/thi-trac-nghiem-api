module.exports = {
    apps: [
      {
        name: 'T_TN',
        script: './index.js',
        env: {
          NODE_ENV: 'production',
          PORT: 2100,
        },
      },
    ],
  };