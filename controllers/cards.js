const { BadRequestError, ForbiddenError, NotFoundError } = require('../errors');
const Card = require('../models/card');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const card = new Card({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    res.status(201).send(await card.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = await Card.findById(cardId);
    if (!card) {
      throw new ForbiddenError('Пользователь не найден');
    }
    if (!card.owner.equals(userId)) {
      throw new ForbiddenError('Данную карточку нельзя удалить');
    }
    const isDeletedCard = await Card.findByIdAndDelete(cardId);
    if (isDeletedCard) {
      res.status(200).send(card);
    } else {
      throw new NotFoundError('Данная карточка не найдена');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const cardLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (cardLike) {
      res.status(200).send(cardLike);
    } else {
      throw new NotFoundError('Данная карточка не найдена');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const cardDislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (cardDislike) {
      res.status(200).send(cardDislike);
    } else {
      throw new NotFoundError('Данная карточка не найдена');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};
