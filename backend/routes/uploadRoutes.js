import express from 'express';
import multer from 'multer';
import { storage } from './../claudinary/index.js';

const router = express.Router();

const upload = multer({ storage });
const uploadMultipleImages = upload.array('image');

router.post('/', (req, res) => {
  uploadMultipleImages(req, res, function (err) {
    
    if (err) {
      res.status(400).send({ message: err.message });
    }

    const images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));

    res.status(200).send({
      message: 'Image uploaded successfully',
      images
    });
  });
});

export default router;
