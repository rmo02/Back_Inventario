const { Equipment, Shelf } = require('../models');

// Criar um novo equipamento
exports.createEquipment = async (req, res) => {
  try {
    const { shelfId } = req.body;
    const shelf = await Shelf.findByPk(shelfId);

    if (!shelf) {
      return res.status(404).json({ error: 'Shelf not found' });
    }

    const equipment = await Equipment.create({
      ...req.body,
      image: req.file?.filename,
    });

    res.status(201).json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os equipamentos
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findAll({ include: Shelf });
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar um equipamento por ID
exports.getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findByPk(id, { include: Shelf });

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um equipamento
exports.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { shelfId } = req.body;
    const equipment = await Equipment.findByPk(id);

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    if (shelfId) {
      const shelf = await Shelf.findByPk(shelfId);
      if (!shelf) {
        return res.status(404).json({ error: 'Shelf not found' });
      }
    }

    await equipment.update({
      ...req.body,
      image: req.file?.filename || equipment.image,
    });

    res.status(200).json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir um equipamento
exports.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findByPk(id);

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    await equipment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
