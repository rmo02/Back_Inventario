require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors"); // Importa a biblioteca cors
const { sequelize } = require("./models");
const shelfRoutes = require("./routes/shelfRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors()); // Adiciona o middleware CORS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use("/api/shelves", shelfRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/category", categoryRoutes);

// Iniciar a sincronização com o banco de dados e o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
