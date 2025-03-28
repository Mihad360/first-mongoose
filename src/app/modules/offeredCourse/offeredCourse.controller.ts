import HttpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.createOfferedCourse(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Offered Course created succesfully",
    data: result,
  });
});

const getOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.getOfferedCourse();

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "SemesterRegistration find succesfully",
    data: result,
  });
});

const getEachOfferedCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await offeredCourseServices.getEachOfferedCourse(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Course find succesfully",
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await offeredCourseServices.updateOfferedCourse(id, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Course deleted succesfully",
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await offeredCourseServices.deleteOfferedCourse(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Offered course deleted succesfully",
    data: result,
  });
});

export const offeredCourseControllers = {
  createOfferedCourse,
  getOfferedCourse,
  getEachOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse
};
