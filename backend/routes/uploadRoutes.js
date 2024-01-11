import express from 'express';
import multer from 'multer';
import { storage } from './../claudinary/index.js';

const router = express.Router();

const upload = multer({ storage })
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `${req.file.path}`,
    });
  });
});

export default router;
