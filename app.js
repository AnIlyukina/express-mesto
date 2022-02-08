const express = require('express');

const mongoose = require('mongoose');

const { routes } = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

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
  console.log('сервер запущен');
}

main();
