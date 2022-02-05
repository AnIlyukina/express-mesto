const express = require('express');

const { getCards, createCards, deleteCard } = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);

cardRoutes.post('/', createCards);

cardRoutes.get('/:cardId', deleteCard);

exports.cardRoutes = cardRoutes;
