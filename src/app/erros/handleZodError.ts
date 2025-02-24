import { TResponseErrorType } from './../interface/error';
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";

export const handleZodError = (err: ZodError) : TResponseErrorType => {
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSource,
  };
};
