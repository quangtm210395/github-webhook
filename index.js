const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.post('/github-webhook', async (req, res) => {
  const { body } = req;
  const { name, full_name: fullName } = body.repository;
  console.log('=== start cicd');
  console.log(`branchs: ${body.ref}`);
  console.log(`commit before: ${body.before}`);
  console.log(`commit after: ${body.after}`);
  console.log(`pusher: ${body.pusher.name}`);
  console.log(`repo: ${fullName}`);
  const deployScript = process.env.DEPLOY_SCRIPT_PATH || '~/deploy-cicd.sh';
  const deployFolder = process.env.DEPLOY_FOLDER || '~/deploy-folder';
  const envFolder = process.env.ENV_FOLDER || '~/env-folder';

  try {
    const r = shell.exec(`bash -c '${deployScript} ${deployFolder} ${fullName} ${name} ${envFolder}'`);
    console.log('exec result: ', r);
  } catch (error) {
    console.error(error);
  }
  console.log('=== end cicd');

  res.status(200).json({ success: true });
});

app.listen(process.env.PORT || 6969, () => {
  console.log(`CICD run at: ${process.env.PORT || 6969}`);
});
