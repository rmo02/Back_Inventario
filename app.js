require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const shelfRoutes = require('./routes/shelfRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');

const app = express();

app.use(express.json());
app.use('/api/shelves', shelfRoutes);
app.use('/api/section', sectionRoutes);
app.use('/api/equipment', equipmentRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
