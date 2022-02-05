const express = require('express');

const mongoose = require('mongoose');

const { routes } = require('./routes');

const app = express();

// eslint-disable-next-line import/order
const path = require('path');

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '61fe8d598ab5a1890f0560eb',
  };

  next();
});

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log('сервер запущен');
}

main();
