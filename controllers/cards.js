const Card = require('../models/card');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
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
    res.status(500).send(err);
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

exports.likeCard = async (req, res) => {
  try {
    const cardLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    res.send(cardLike);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const cardDislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    res.send(cardDislike);
  } catch (err) {
    res.status(500).send(err);
  }
};
