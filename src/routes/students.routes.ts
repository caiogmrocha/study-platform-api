import { adaptRoute } from '@/core/adapters/express/express-route-adapter';
import { makeRegisterStudentController } from '@/modules/students/register-student/register-student-controller-factory';
import { Router } from 'express';

const studentsRouter = Router();

studentsRouter.post('/register', adaptRoute(makeRegisterStudentController()));

export { studentsRouter };
