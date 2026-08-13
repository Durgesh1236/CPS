import multer from "multer";

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and WEBP images are allowed.'));
  }
  cb(null, true);
};

const uploadFile = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: imageFileFilter,
}).single("file");

export default uploadFile;