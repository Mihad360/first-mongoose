import { academicDepartmentModel } from "./../academicDepartment/academicDepartment.model";
import HttpStatus from "http-status";
import config from "../../config";
import AppError from "../../erros/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import mongoose from "mongoose";
import { FacultyModel } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import { TFaculty } from "../faculty/faculty.interface";
import { Admin } from "../admin/admin.model";

const createUserDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);
  userData.role = "student";
  userData.email = payload.email;

  const admissionSemesterId = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemesterId) {
    throw new AppError(400, "Admission semester not found");
  }

  // find department
  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, "Aademic department not found");
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (!admissionSemesterId) {
      throw new AppError(HttpStatus.NOT_FOUND, "not available");
    }
    userData.id = await generateStudentId(admissionSemesterId);
    // first transaction - 1
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // first transaction - 2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(HttpStatus.BAD_REQUEST, "Failed to create Student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(HttpStatus.NOT_FOUND, "Failed to create The Student");
  }
};

const createFacultyDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);
  userData.role = "faculty";
  userData.email = payload.email;

  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const facultyId = await generateFacultyId();
    if (!facultyId) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        "Failed to generate faculty ID",
      );
    }
    userData.id = facultyId;
    // first transaction - 1
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // first transaction - 2
    const newFaculty = await FacultyModel.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, "Failed to create Faculty");
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(HttpStatus.NOT_FOUND, "Failed to create The Faculty");
  }
};

const createAdminDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);
  userData.role = "admin";
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    // first transaction - 1
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, "Failed to create Admin user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // first transaction - 2
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, "Failed to create Admin");
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(HttpStatus.BAD_REQUEST, "Failed to create The Admin");
  }
};

export const UserServices = {
  createUserDB,
  createFacultyDB,
  createAdminDB,
};
