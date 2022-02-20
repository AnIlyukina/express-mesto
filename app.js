const express = require('express');

const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');

const { routes } = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(routes);
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
  console.log('сервер запущен');
}

main();
