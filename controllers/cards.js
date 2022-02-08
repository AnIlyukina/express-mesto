const Card = require('../models/card');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

exports.createCard = async (req, res) => {
  try {
    const card = new Card({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    res.status(201).send(await card.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы невалидные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (card) {
      res.status(200).send(card);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

exports.likeCard = async (req, res) => {
  try {
    const cardLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (cardLike) {
      res.status(200).send(cardLike);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const cardDislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (cardDislike) {
      res.status(200).send(cardDislike);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};
