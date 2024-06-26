import { NextFunction, Request, Response } from "express";
import { myCache } from "../app";
import ErrorHandler from "../utils/utility-class";
import { Turf } from "../modals/turf";
import { User } from "../modals/user";
import { Booking } from "../modals/booking";
import { calculatePercentage } from "../utils/features";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let stats;
  try {
    if (myCache.has("admin-stats")) {
      stats = JSON.parse(myCache.get("admin-stats") as string);
    } else {
      const today = new Date();

      const thisMonth = {
        start: new Date(today.getDate(), today.getMonth(), 1),
        end: today,
      };

      const lastMonth = {
        start: new Date(today.getDate(), today.getMonth() - 1, 1),
        end: new Date(today.getDate(), today.getMonth(), 0),
      };

      const thisMonthTurvesPromise = Turf.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthTurvesPromise = Turf.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      const thisMonthUsersPromise = User.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthUsersPromise = User.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      const thisMonthBookingsPromise = Booking.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthBookingsPromise = Booking.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      const [
        thisMonthTurves,
        thisMonthUsers,
        thisMonthBookings,
        lastMonthTurves,
        lastMonthUsers,
        lastMonthBookings,
        usersCount,
        turvesCount,
        allBookings,
      ] = await Promise.all([
        thisMonthTurvesPromise,
        thisMonthUsersPromise,
        thisMonthBookingsPromise,
        lastMonthTurvesPromise,
        lastMonthUsersPromise,
        lastMonthBookingsPromise,
        User.countDocuments(),
        Turf.countDocuments(),
        Booking.find({}).select("total"),
      ]);

      const thisMonthRevenue = thisMonthBookings.reduce(
        (total, booking) => total + (booking.total || 0),
        0
      );

      const lastMonthRevenue = lastMonthBookings.reduce(
        (total, booking) => total + (booking.total || 0),
        0
      );

      const changePercent = {
        revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
        user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
        turf: calculatePercentage(
          thisMonthTurves.length,
          lastMonthTurves.length
        ),
        booking: calculatePercentage(
          thisMonthBookings.length,
          lastMonthBookings.length
        ),
      };

      const revenue = allBookings.reduce(
        (total, booking) => total + (booking.total || 0),
        0
      );

      const count = {
        revenue,
        user: usersCount,
        turf: turvesCount,
        booking: allBookings.length,
      };

      stats = {
        changePercent,
        count,
      };
    }

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};
