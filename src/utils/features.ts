import mongoose from "mongoose";
import { invalidateCacheProps } from "../types/types";
import { myCache } from "../app";
import { Turf } from "../modals/turf";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI as string, { dbName: "turf" })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const invalidateCache = async ({
  user,
  userId,
  turf,
  turfId,
  booking,
  bookingId,
  admin,
}: invalidateCacheProps) => {
  if (user) {
    const userKeys: string[] = ["getAllUser"];

    if (typeof userId === "string") userKeys.push(`getUser-${userId}`);

    if (typeof userId === "object")
      userId.forEach((i) => userKeys.push(`getUser-${i}`));

    myCache.del(userKeys);
  }

  if (turf) {
    const turfKeys: string[] = ["types", "getAllTurf"];

    // const turfs = await Turf.find({}).select("_id");

    // turfs.forEach((i) => {
    //   turfKeys.push(`getTurf-${i._id}`);
    // });

    if (typeof turfId === "string") turfKeys.push(`getTurf-${turfId}`);

    if (typeof turfId === "object")
      turfId.forEach((i) => turfKeys.push(`getTurf-${i}`));

    myCache.del(turfKeys);
  }

  if (booking) {
    const bookingKeys: string[] = ["getAllBooking"];

    if(typeof bookingId === "string") bookingKeys.push(`getBooking-${bookingId}`);

    if(typeof bookingId === "object") bookingId.forEach(i=>bookingKeys.push(`getBooking-${i}`))

    myCache.del(bookingKeys);
  }

  if (admin) {
    myCache.del(["admin-stats"]);
  }
};

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
  if (lastMonth == 0) return thisMonth * 100;

  const percent = ((thisMonth - lastMonth) / lastMonth) * 100;

  return Number(percent.toFixed(0)); // toFixed return string
};

//not working properly
export const getInventories = async ({
  categories,
  turvesCount,
}: {
  categories: string[];
  turvesCount: number;
}) => {
  const categoriesCountPromise = categories.map((category) =>
    Turf.countDocuments({ category })
  );

  const categoriesCount = await Promise.all(categoriesCountPromise); //not working properly

  const categoryCount: Record<string, number>[] = [];

  categories.forEach((category, i) => {
    categoryCount.push({
      [category]: Math.round((categoriesCount[i] / turvesCount) * 100),
    });
  });

  return categoryCount;
};
