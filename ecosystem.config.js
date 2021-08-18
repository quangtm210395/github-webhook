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
        DEPLOY_SCRIPT_PATH: '/home/quangtm/cicd-scripts/deploy-cicd.sh',
        ENV_FOLDER: '/home/quangtm/env-folder',
        DEPLOY_FOLDER: '/home/quangtm/deploy-folder',
        DEPLOY_CLAN_CAPITAL: 'clan-capital-landing',
      },
    },
  ],
};
