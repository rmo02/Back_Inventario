const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

// Criar um novo equipamento
router.post('/', createCategory);

// Listar todos os equipamentos
router.get('/', getAllCategory);

// Buscar um equipamento por ID
router.get('/:id', getCategoryById);

// Atualizar um equipamento
router.put('/:id', updateCategory);

// Excluir um equipamento
router.delete('/:id', deleteCategory);

module.exports = router;
