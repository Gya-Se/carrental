import { Schema, models, model } from "mongoose";

const BookSchema = new Schema(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: "car",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now(),
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.book || model("book", BookSchema);
