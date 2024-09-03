const { Equipment, Shelf, Section } = require('../models');

// Criar um novo equipamento
exports.createEquipment = async (req, res) => {
  try {
    const { shelfId, sectionId } = req.body;

    // Verifica se ambos os campos ou nenhum foram fornecidos
    if ((shelfId && sectionId) || (!shelfId && !sectionId)) {
      return res.status(400).json({ error: 'Informe apenas um dos campos: shelfId ou sectionId.' });
    }

    // Verifica se o shelfId foi fornecido e se o Shelf existe
    if (shelfId) {
      const shelf = await Shelf.findByPk(shelfId);
      if (!shelf) {
        return res.status(404).json({ error: 'Shelf não encontrado.' });
      }
    }

    // Verifica se o sectionId foi fornecido e se o Section existe
    if (sectionId) {
      const section = await Section.findByPk(sectionId);
      if (!section) {
        return res.status(404).json({ error: 'Section não encontrado.' });
      }
    }

    // Cria o equipamento com a imagem (se houver)
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
    const equipment = await Equipment.findAll({
      include: [
        { model: Shelf, as: 'shelf' },
        { model: Section, as: 'section' },
      ],
    });
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar um equipamento por ID
exports.getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findByPk(id, {
      include: [
        { model: Shelf, as: 'shelf' },
        { model: Section, as: 'section' },
      ],
    });

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
    const { shelfId, sectionId } = req.body;
    const equipment = await Equipment.findByPk(id);

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    // Verifica se ambos os campos ou nenhum foram fornecidos
    if ((shelfId && sectionId) || (!shelfId && !sectionId)) {
      return res.status(400).json({ error: 'Informe apenas um dos campos: shelfId ou sectionId.' });
    }

    // Verifica se o shelfId foi fornecido e se o Shelf existe
    if (shelfId) {
      const shelf = await Shelf.findByPk(shelfId);
      if (!shelf) {
        return res.status(404).json({ error: 'Shelf não encontrado.' });
      }
    }

    // Verifica se o sectionId foi fornecido e se o Section existe
    if (sectionId) {
      const section = await Section.findByPk(sectionId);
      if (!section) {
        return res.status(404).json({ error: 'Section não encontrado.' });
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
