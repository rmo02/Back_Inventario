const { Equipment, Shelf, Section, Category } = require('../models');

// Função para formatar o equipamento e adicionar a URL do backend à imagem
const formatEquipment = (equipment, req) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const formattedEquipment = {
    ...equipment.toJSON(),
    image: equipment.image ? `${protocol}://${host}/uploads/${equipment.image}` : null,
  };
  return formattedEquipment;
};

// Criar um novo equipamento
exports.createEquipment = async (req, res) => {
  try {
    const { shelfId, sectionId, categoryId } = req.body;

    if ((shelfId && sectionId) || (!shelfId && !sectionId)) {
      return res.status(400).json({ error: 'Informe apenas um dos campos: shelfId ou sectionId.' });
    }

    if (shelfId) {
      const shelf = await Shelf.findByPk(shelfId);
      if (!shelf) {
        return res.status(404).json({ error: 'Shelf não encontrado.' });
      }
    }

    if (sectionId) {
      const section = await Section.findByPk(sectionId);
      if (!section) {
        return res.status(404).json({ error: 'Section não encontrado.' });
      }
    }

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category não encontrada.' });
      }
    }

    const equipment = await Equipment.create({
      ...req.body,
      image: req.file?.filename,
    });

    res.status(201).json(formatEquipment(equipment, req));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os equipamentos
exports.getAllEquipment = async (req, res) => {
  try {
    const equipments = await Equipment.findAll({
      include: [
        { model: Shelf, as: 'shelf' },
        { model: Section, as: 'section' },
        { model: Category, as: 'category' },
      ],
    });

    const formattedEquipments = equipments.map(equipment => formatEquipment(equipment, req));

    res.status(200).json(formattedEquipments);
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
        { model: Category, as: 'category' },
      ],
    });

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    res.status(200).json(formatEquipment(equipment, req));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um equipamento
exports.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { shelfId, sectionId, categoryId } = req.body;
    const equipment = await Equipment.findByPk(id);

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    if ((shelfId && sectionId) || (!shelfId && !sectionId)) {
      return res.status(400).json({ error: 'Informe apenas um dos campos: shelfId ou sectionId.' });
    }

    if (shelfId) {
      const shelf = await Shelf.findByPk(shelfId);
      if (!shelf) {
        return res.status(404).json({ error: 'Shelf não encontrado.' });
      }
    }

    if (sectionId) {
      const section = await Section.findByPk(sectionId);
      if (!section) {
        return res.status(404).json({ error: 'Section não encontrado.' });
      }
    }

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category não encontrada.' });
      }
    }

    await equipment.update({
      ...req.body,
      image: req.file?.filename || equipment.image, // Mantém a imagem atual se não for enviada uma nova
    });

    res.status(200).json(formatEquipment(equipment, req));
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
