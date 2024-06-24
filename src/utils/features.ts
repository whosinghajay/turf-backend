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

export const invalidateCache = async ({ turf }: invalidateCacheProps) => {
  if (turf) {
    const turfKeys: string[] = ["types", "getAllTurf"];

    const turfs = await Turf.find({}).select("_id");

    turfs.forEach((i) => {
      turfKeys.push(`getTurf-${i._id}`);
    });

    myCache.del(turfKeys);
  }
};
