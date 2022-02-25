const express = require('express');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCardId, validateCard } = require('../middlewares/validation');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', express.json(), validateCard, createCard);

cardsRoutes.delete('/:cardId', validateCardId, deleteCard);

cardsRoutes.put('/:cardId/likes', validateCardId, likeCard);

cardsRoutes.delete('/:cardId/likes', validateCardId, dislikeCard);

exports.cardsRoutes = cardsRoutes;
