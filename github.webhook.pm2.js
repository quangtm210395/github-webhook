module.exports = {
  apps: [
    {
      name: 'github_webhook',
      script: 'index.js',
      watch: true,
      env: {
        PORT: 6968,
        NODE_ENV: 'development',
        DEPLOY_SCRIPT_PATH: './test.sh',
      },
      env_production: {
        PORT: 6969,
        NODE_ENV: 'production',
        DEPLOY_SCRIPT_PATH: '/home/quangtm/cicd-scripts/deploy.sh',
      },
    },
  ],
};
