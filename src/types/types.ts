import { NextFunction, Request, Response } from "express";

export type NewUserRequestBody = {
  phoneNumber: number;
  gender: string;
  fullName: string;
  location: string;
  role: string;
};

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type invalidateCacheProps = {
  user?: boolean;
  userId?: string | string[];
  turf?: boolean;
  turfId?: string | string[];
  booking?: boolean;
  bookingId?: string | string[];
  admin?: boolean;
};


// court type starts here

interface TimeSlot {
  time: string; // or Date based on your requirement
  booked: boolean;
}

interface Day {
  date: Date;
  slots: TimeSlot[];
}

export interface Court {
  courtNumber: number;
  days: Day[];
}

// court type ends here