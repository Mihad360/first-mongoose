import HttpStatus from "http-status";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createUserDB(password, studentData);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Student created succesfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: faculty } = req.body;

  const result = await UserServices.createFacultyDB(password, faculty);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Student created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password } = req.body;

  const result = await UserServices.createAdminDB(password, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Admi created succesfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  createFaculty,
  createAdmin
};
