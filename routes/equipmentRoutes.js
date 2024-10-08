const express = require('express');
const router = express.Router();
const {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} = require('../controllers/equipmentController');
const { upload, handleMulterError } = require('../middleware/multerConfig');

// Criar um novo equipamento
router.post('/', upload.single('image'), handleMulterError, createEquipment);

// Listar todos os equipamentos
router.get('/', getAllEquipment);

// Buscar um equipamento por ID
router.get('/:id', getEquipmentById);

// Atualizar um equipamento
router.put('/:id', upload.single('image'), handleMulterError, updateEquipment);

// Excluir um equipamento
router.delete('/:id', deleteEquipment);

module.exports = router;
