import cron from "node-cron";
import { Turf } from "../modals/turf.js";
import { Court } from "../types/types.js";

// Function to add new day slots to a turf
const addNewDaySlots = async (turf: any, numberOfDays: number) => {
  const today = new Date();
  const newDate = new Date(today);
  newDate.setDate(today.getDate() + numberOfDays);

  const formattedDate = newDate.toISOString().split("T")[0];

  const newSlots = {
    date: formattedDate,
    slots: [
      { time: "00:00", booked: false },
      { time: "01:00", booked: false },
      { time: "02:00", booked: false },
      { time: "03:00", booked: false },
      { time: "04:00", booked: false },
      { time: "05:00", booked: false },
      { time: "06:00", booked: false },
      { time: "07:00", booked: false },
      { time: "08:00", booked: false },
      { time: "09:00", booked: false },
      { time: "10:00", booked: false },
      { time: "11:00", booked: false },
      { time: "12:00", booked: false },
      { time: "13:00", booked: false },
      { time: "14:00", booked: false },
      { time: "15:00", booked: false },
      { time: "16:00", booked: false },
      { time: "17:00", booked: false },
      { time: "18:00", booked: false },
      { time: "19:00", booked: false },
      { time: "20:00", booked: false },
      { time: "21:00", booked: false },
      { time: "22:00", booked: false },
      { time: "23:00", booked: false },
    ],
  };

  turf.slot.forEach((court: Court) => {
    // Removing the first day (yesterday) and add new day slots
    court.days.shift();
    court.days.push(newSlots);
  });

  await turf.save();
  console.log(`Updated slots for Turf ID: ${turf._id}`);
};

// Scheduling the task to run at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled task to update turf slots");
  try {
    const turfs = await Turf.find();

    for (const turf of turfs) {
      await addNewDaySlots(turf, 7-1);
    }
  } catch (error) {
    console.error("Error updating turf slots:", error);
  }
});

const initializeTurfSlots = async () => {
  console.log("Checking and updating turf slots on server start");
  const turfs = await Turf.find(); 
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Resetting to start of the day


  for (const turf of turfs) {
    // Checking the last updated date and update accordingly
    const lastUpdated = turf.updatedAt; // It will get the last updated date from turf data
    lastUpdated.setHours(0, 0, 0, 0); // Resetting to start of the day
    const daysDifference =
      (today.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);

    for (let i = 0; i < daysDifference; i++) {
      await addNewDaySlots(turf, 7 - 1 - daysDifference + i + 1);
    }
  }
};

initializeTurfSlots();
