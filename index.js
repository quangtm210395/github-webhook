const express = require('express');
const { urlencoded, json } = require('body-parser');
const shell = require('shelljs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(urlencoded({ extended: true }), json());

const mapping = {
  'clan-capital-landing': process.env.DEPLOY_CLAN_CAPITAL,
};

app.get('/', (req, res) => { res.send('hello'); });

app.post('/github-webhook', async (req, res) => {
  const { body } = req;
  const { name, full_name: fullName } = body.repository;
  console.log('=== start cicd');
  console.log(`branchs: ${body.ref}`);
  console.log(`commit before: ${body.before}`);
  console.log(`commit after: ${body.after}`);
  console.log(`pusher: ${body.pusher.name}`);
  console.log(`repo: ${fullName}`);
  const folder = mapping[name] || mapping[fullName] || 'default';
  const deployScript = `~/deploy/${folder}/run.sh`;
  const envFolder = `${folder}/env`;
  const deployFolder = `~/deploy-folder/${folder}`;

  try {
    const r = shell.exec(`bash -c '${deployScript} ${deployFolder} ${fullName} ${name} ${envFolder}'`);
    console.log('exec result: ', r.code);
  } catch (error) {
    console.error(error);
  }
  console.log('=== end cicd');

  res.status(200).json({ success: true });
});

app.listen(process.env.PORT || 6969, () => {
  console.log(`CICD run at: ${process.env.PORT || 6969}`);
});
