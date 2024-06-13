import { NextFunction, Request, Response } from "express";
import { Sport } from "../model/sportSchema";
import { Court } from "../model/courtSchema";
import { User } from "../model/userSchema";
import { Booking } from "../model/bookingSchema";

export const bookingController = () => {
  return {
    bookCourt: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { sportId, courtId, date, time, userId, duration } = req.body;

        // Validate sport, court, and user existence
        const sport = await Sport.findById(sportId);
        if (!sport) {
          return res.status(404).json({
            status: false,
            message: "Sport not found",
          });
        }

        const court = await Court.findById(courtId);
        if (!court) {
          return res.status(404).json({
            status: false,
            message: "Court not found",
          });
        }

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({
            status: false,
            message: "User not found",
          });
        }

        // Create new booking
        const booking = await Booking.create({
          sportId,
          courtId,
          date,
          time,
          userId,
          duration,
        });

        return res.json({
          status: true,
          data: booking,
          message: "Booking added",
        });
      } catch (error) {
        next(error);
      }
    },
  };
};
