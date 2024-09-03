const { Shelf, Equipment } = require('../models');

// Criar uma nova estante
exports.createShelf = async (req, res) => {
  try {
    const shelf = await Shelf.create(req.body);
    res.status(201).json(shelf);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as estantes
exports.getAllShelves = async (req, res) => {
  try {
    const shelves = await Shelf.findAll({ 
      include: { model: Equipment, as: 'equipments' } // Inclui o alias correto
    });
    res.status(200).json(shelves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar uma estante por ID
exports.getShelfById = async (req, res) => {
  try {
    const { id } = req.params;
    const shelf = await Shelf.findByPk(id, { 
      include: { model: Equipment, as: 'equipments' } // Inclui o alias correto
    });

    if (!shelf) {
      return res.status(404).json({ error: 'Shelf not found' });
    }

    res.status(200).json(shelf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma estante
exports.updateShelf = async (req, res) => {
  try {
    const { id } = req.params;
    const shelf = await Shelf.findByPk(id);

    if (!shelf) {
      return res.status(404).json({ error: 'Shelf not found' });
    }

    await shelf.update(req.body);
    res.status(200).json(shelf);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir uma estante
exports.deleteShelf = async (req, res) => {
  try {
    const { id } = req.params;
    const shelf = await Shelf.findByPk(id);

    if (!shelf) {
      return res.status(404).json({ error: 'Shelf not found' });
    }

    await shelf.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
