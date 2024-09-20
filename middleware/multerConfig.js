const multer = require('multer');
const path = require('path');

// Configuração do armazenamento para salvar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório de destino para upload
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // Define o nome do arquivo como timestamp seguido do nome original
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configuração do Multer
const upload = multer({
  storage,
  // Filtro de arquivos para permitir apenas imagens JPEG, JPG e PNG
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype); // Verifica o mimetype do arquivo
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Verifica a extensão do arquivo

    if (mimetype && extname) {
      return cb(null, true); // Aceita o arquivo
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos!')); // Rejeita arquivos de outros tipos
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamanho de arquivo (5MB)
});

// Tratamento de erros de upload
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Erros específicos do Multer (como limite de tamanho)
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // Outros erros (como tipo de arquivo inválido)
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = { upload, handleMulterError };
