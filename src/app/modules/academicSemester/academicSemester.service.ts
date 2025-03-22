import HttpStatus from "http-status";
import mongoose from "mongoose";
import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import AppError from "../../erros/AppError";

const createAcademicSemester = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(HttpStatus.NOT_FOUND, "invalid semester name or code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getEachAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

const updateEachAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(HttpStatus.NOT_FOUND, "invalid semester code");
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAcademicSemester,
  getEachAcademicSemester,
  updateEachAcademicSemester,
};
