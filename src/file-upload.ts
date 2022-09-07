import { randomUUID } from 'crypto';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname)
    const filename = `${randomUUID()}-${Date.now()}.${extension}`

    cb(null, filename)
  }
})

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif'
    ]
    const extension = path.extname(file.originalname)

    if (extensions.includes(extension)) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})
