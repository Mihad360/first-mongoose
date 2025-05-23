import { z } from "zod";

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

const updateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z
      .object({
        classTest1: z.string().max(10).optional(),
        midTerm: z.string().max(30).optional(),
        classTest2: z.string().max(10).optional(),
        finalTerm: z.string().max(50).optional(),
      })
      .optional(),
  }),
});

export const endrolledCourseValidations = {
  createEnrolledCourseValidationSchema,
  updateEnrolledCourseValidationSchema,
};
