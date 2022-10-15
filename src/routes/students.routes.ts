import { adaptMiddleware } from '@/core/http/express-middleware-adapter';
import { adaptRoute } from '@/core/http/express-route-adapter';
import { makeIsStudentAuthenticatedMiddleware } from '@/core/http/middlewares/is-student-authenticated-middleware-factory';
import { makeAuthenticateStudentController } from '@/modules/students/authenticate-student/authenticate-student-controller-factory';
import { makeRegisterStudentController } from '@/modules/students/register-student/register-student-controller-factory';
import { makeUpdateStudentController } from '@/modules/students/update-student/update-student-controller-factory';
import { makeUploadStudentImageController } from '@/modules/students/upload-student-image/upload-student-image-controller-factory';
import { Router } from 'express';

const studentsRouter = Router();

studentsRouter.post('/register', adaptRoute(makeRegisterStudentController()));
studentsRouter.post('/login', adaptRoute(makeAuthenticateStudentController()));
studentsRouter.post(
  '/upload-image/:id',
  adaptMiddleware(makeIsStudentAuthenticatedMiddleware()),
  adaptRoute(makeUploadStudentImageController())
);
studentsRouter.put(
  '/update/:id',
  adaptMiddleware(makeIsStudentAuthenticatedMiddleware()),
  adaptRoute(makeUpdateStudentController())
);

export { studentsRouter };

