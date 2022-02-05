const Card = require('../models/card');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    res.status(200).send(card);
  // eslint-disable-next-line no-empty
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

exports.createCards = async (req, res) => {
  try {
    const card = new Card(req.body);
    res.status(201).send(await card.save());
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};
