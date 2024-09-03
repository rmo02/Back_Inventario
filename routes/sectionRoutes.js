const express = require('express');
const router = express.Router();
const {
  createSection,
  deleteSection,
  getAllSection,
  getSectionById,
  updateSection
} = require('../controllers/sectionController');

// Criar uma nova seção
router.post('/', createSection);

// Listar todas as seção
router.get('/', getAllSection);

// Buscar uma seção por ID
router.get('/:id', getSectionById);

// Atualizar uma seção
router.put('/:id', updateSection);

// Excluir uma seção
router.delete('/:id', deleteSection);

module.exports = router;
