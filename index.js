const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.post('/github-webhook', async (req, res) => {
  console.log(JSON.stringify(req.body));
  res.status(200).json({ success: true });
});

app.listen(process.env.PORT || 6969, () => {
  console.log(`CICD run at: ${process.env.PORT || 6969}`);
});
