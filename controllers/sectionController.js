const { Section, Equipment } = require('../models');

// Criar uma nova seção
exports.createSection = async (req, res) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as seções
exports.getAllSection = async (req, res) => {
  try {
    const sections = await Section.findAll({ 
      include: { model: Equipment, as: 'equipments' } // Inclui o alias correto
    });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar uma seção por ID
exports.getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findByPk(id, { 
      include: { model: Equipment, as: 'equipments' } // Inclui o alias correto
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma seção
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findByPk(id);

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    await section.update(req.body);
    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir uma seção
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findByPk(id);

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    await section.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
