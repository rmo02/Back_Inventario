const express = require('express');
const router = express.Router();
const {
  createShelf,
  getAllShelves,
  getShelfById,
  updateShelf,
  deleteShelf,
} = require('../controllers/shelfController');

// Criar uma nova estante
router.post('/', createShelf);

// Listar todas as estantes
router.get('/', getAllShelves);

// Buscar uma estante por ID
router.get('/:id', getShelfById);

// Atualizar uma estante
router.put('/:id', updateShelf);

// Excluir uma estante
router.delete('/:id', deleteShelf);

module.exports = router;
