import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { facultyValidation } from "../faculty/faculty.validation";
import { AdminValidations } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.const";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createUser,
);
router.post(
  "/create-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facultyValidation.createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.patch(
  "/change-status/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get(
  "/me",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserControllers.getMe,
);

export const UserRoutes = router;
