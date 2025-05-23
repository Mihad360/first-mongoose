import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonth,
  TNameCodeMapper,
} from "./academicSemester.interface";

export const Months: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
];
export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

export const academicSemesterNameCodeMapper: TNameCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

export const academicSemesterSearch = [
  "name",
  "year",
  "startMonth",
  "endMonth",
];
