const multer = require("multer");
const path = require("path");

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Nombre único del archivo
  },
});

// Validación del tipo de archivo (solo imágenes)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const mimeType = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    return cb(null, true);
  }
  cb(new Error("Solo imágenes (jpeg, jpg, png) son permitidas."));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
  fileFilter: fileFilter,
}).single("image"); // 'image' es el nombre del campo en el formulario

// Controlador para subir una imagen
const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Por favor, selecciona una imagen para subir." });
    }

    // Generar la URL pública de la imagen
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    // Retornar la URL para que se pueda usar en otros controladores (como crear eventos)
    res.status(200).json({ imageUrl });
  });
};

module.exports = {
  uploadImage,
};
