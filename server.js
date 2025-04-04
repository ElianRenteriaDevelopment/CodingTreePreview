const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const emailsDir = path.join(__dirname, 'emails_data');
if (!fs.existsSync(emailsDir)) {
  fs.mkdirSync(emailsDir);
}
const emailFilePath = path.join(__dirname, 'emails_data', 'emails.txt');

app.post('/signup', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Email is required');

  fs.appendFile(emailFilePath, email + '\n', (err) => {
    if (err) {
      console.error('Error saving email:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Email saved');
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));