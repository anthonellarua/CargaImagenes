const express = require('express');
const multer = require('multer');
const app = express();

// Configuración de Multer para validar el tipo y tamaño de archivo
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    // Validar el tipo de archivo permitido (por ejemplo, solo imágenes)
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Tamaño máximo permitido en bytes (5 MB en este ejemplo)
  },
}).array('files'); // Utilizar 'array' en lugar de 'single' para admitir la carga de múltiples archivos

app.post('/upload', upload, (req, res) => {
  const fileInfos = [];

  // Iterar sobre los archivos cargados y obtener los detalles de cada archivo
  req.files.forEach((file) => {
    const fileInfo = {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
    fileInfos.push(fileInfo);
  });

  res.send(fileInfos);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
