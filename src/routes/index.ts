import { Router } from 'express';
import { studentsRouter } from './students.routes';

const router = Router();

router.use('/students', studentsRouter);

export { router };
