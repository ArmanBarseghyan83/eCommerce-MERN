import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_CLOUD_NAME,
  api_key: process.env.CLAUDINARY_KEY,
  api_secret: process.env.CLAUDINARY_SECRET,
});

//defining cloudinary storage
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'eCommerce',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

export { cloudinary };
