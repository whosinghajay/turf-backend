import { NextFunction, Request, Response } from "express";

export type NewUserRequestBody = {
  phoneNumber: number;
  gender: string;
  fullName: string;
};

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
