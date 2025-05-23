import { Schema, model } from "mongoose";
import { facultyUserNameSchema } from "./faculty.const";
import { TFaculty } from "./faculty.interface";

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "User",
      required: true,
    },
    designation: { type: String, required: true },
    name: facultyUserNameSchema,
    gender: { type: String, enum: ["male", "female"], required: true },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImg: { type: String, default: "" },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },

  { timestamps: true, toJSON: { virtuals: true } },
);

facultySchema.virtual("fullName").get(function (next) {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
  next();
});

export const FacultyModel = model<TFaculty>("Faculty", facultySchema);
