import { NextFunction, Request, Response } from "express";
import { myCache } from "../app";
import ErrorHandler from "../utils/utility-class";
import { Turf } from "../modals/turf";
import { User } from "../modals/user";
import { Booking } from "../modals/booking";
import { calculatePercentage, getInventories } from "../utils/features";

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

      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

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

      const lastSixMonthBookingsPromise = Booking.find({
        createdAt: {
          $gte: sixMonthAgo,
          $lte: today,
        },
      });

      const latestTransactionPromise = Booking.find({})
        .limit(4)
        .select(["turfInfo", "total", "status"]);

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
        lastSixMonthBookings,
        categories,
        maleUsers,
        latestTransaction,
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
        lastSixMonthBookingsPromise,
        Turf.distinct("typeOfCourt"),
        User.countDocuments({ gender: "male" }),
        latestTransactionPromise,
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

      const bookingMonthCount = new Array(6).fill(0);
      const bookingMonthRevenue = new Array(6).fill(0);

      lastSixMonthBookings.forEach((booking) => {
        const creationDate = booking.createdAt;
        // const monthDiff = today.getMonth() - creationDate.getMonth();
        const monthDiff =
          (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < 6) {
          bookingMonthCount[6 - monthDiff - 1] += 1;
          bookingMonthRevenue[6 - monthDiff - 1] += booking.total;
        }
      });

      const categoryCount: Record<string, number>[] = await getInventories({
        categories,
        turvesCount,
      });

      const userRatio = {
        female: usersCount - maleUsers,
        male: maleUsers,
      };

      stats = {
        categoryCount, //not working properly
        changePercent,
        count,
        chart: {
          order: bookingMonthCount,
          revenue: bookingMonthRevenue,
        },
        userRatio,
        latestTransaction,
      };

      myCache.set("admin-stats", JSON.stringify(stats));
    }

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};

export const getPieCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let charts;

    if (myCache.has("admin-pie-charts")) {
      charts = JSON.parse(myCache.get("admin-pie-charts") as string);
    } else {
      const [processing, booked, canceled, categories, turvesCount] =
        await Promise.all([
          Booking.countDocuments({ status: "processing" }),
          Booking.countDocuments({ status: "booked" }),
          Booking.countDocuments({ status: "canceled" }),
          Turf.distinct("typeOfCourt"),
          Turf.countDocuments(),
        ]);

      const bookingFullfillment = {
        processing,
        booked,
        canceled,
      };

      const turvesCategories = await getInventories({
        categories,
        turvesCount,
      });

      charts = {
        bookingFullfillment,
        turvesCategories,
      };

      myCache.set("admin-pie-charts", JSON.stringify(charts));
    }

    return res.status(200).json({
      success: true,
      charts,
    });
  } catch (error) {
    next(ErrorHandler);
  }
};
