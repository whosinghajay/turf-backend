import cron from "node-cron";
import { Turf } from "../modals/turf.js"; // Adjust the path as needed
import { Court } from "../types/types.js";

// Function to add new day slots to a turf
const addNewDaySlots = async (turf: any, numberOfDays: number) => {
  const today = new Date();
  const newDate = new Date(today);
  newDate.setDate(today.getDate() + numberOfDays);

  const newSlots = {
    date: newDate,
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
    // Remove the first day (yesterday) and add new day slots
    court.days.shift();
    court.days.push(newSlots);
  });

  await turf.save();
  console.log(`Updated slots for Turf ID: ${turf._id}`);
};

// Schedule the task to run at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled task to update turf slots");
  try {
    const turfs = await Turf.find();

    for (const turf of turfs) {
      await addNewDaySlots(turf, 7); // Adjust number of days as per your requirement
    }
  } catch (error) {
    console.error("Error updating turf slots:", error);
  }
});
