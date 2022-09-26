import { adaptRoute } from '@/core/http/express-route-adapter';
import { makeAuthenticateStudentController } from '@/modules/students/authenticate-student/authenticate-student-controller-factory';
import { makeRegisterStudentController } from '@/modules/students/register-student/register-student-controller-factory';
import { makeUploadStudentImageController } from '@/modules/students/upload-student-image/upload-student-image-controller-factory';
import { Router } from 'express';

const studentsRouter = Router();

studentsRouter.post('/register', adaptRoute(makeRegisterStudentController()));
studentsRouter.post('/login', adaptRoute(makeAuthenticateStudentController()));
studentsRouter.post('/upload-image/:id', adaptRoute(makeUploadStudentImageController()));

export { studentsRouter };
