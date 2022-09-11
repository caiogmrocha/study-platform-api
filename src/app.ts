import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { router } from './routes';

const app = express();

app.use(cors({
  exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length']
}));

app.use(fileUpload({
  createParentPath: true
}))

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(express.json({
  type: ['application/json', 'text/plain']
}));

app.use(router);

export { app };
