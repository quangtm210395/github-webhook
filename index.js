const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.post('/github-webhook', async (req, res) => {
  const { body } = req;
  console.log('=== start cicd');
  console.log(`branchs: ${body.ref}`);
  console.log(`commit before: ${body.before}`);
  console.log(`commit after: ${body.after}`);
  console.log(`pusher: ${body.pusher.name}`);

  try {
    const r = shell.exec(`bash -c ${process.env.DEPLOY_SCRIPT_PATH || '~/deploy.sh'}`);
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
