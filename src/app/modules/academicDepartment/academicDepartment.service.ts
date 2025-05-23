import QueryBuilder from "../../builder/QueryBuilder";
import { academicDepartmentSearch } from "./academicDepartment.const";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await academicDepartmentModel.create(payload);
  return result;
};

const getAcademicDepartment = async (query: Record<string, unknown>) => {
  const academicDepartmentQuery = new QueryBuilder(
    academicDepartmentModel.find().populate("academicFaculty"),
    query,
  )
    .search(academicDepartmentSearch)
    .filter()
    .sort()
    .pagination()
    .limitFields();
  const meta = await academicDepartmentQuery.countTotal();
  const result = await academicDepartmentQuery.modelQuery;
  return { meta, result };
};

const getEachAcademicDepartment = async (id: string) => {
  const result = await academicDepartmentModel
    .findOne({
      _id: id,
    })
    .populate("academicFaculty");
  return result;
};

const updateEachAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await academicDepartmentModel.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartment,
  getAcademicDepartment,
  getEachAcademicDepartment,
  updateEachAcademicDepartment,
};
