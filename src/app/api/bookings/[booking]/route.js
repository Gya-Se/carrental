import connect from "@/configs/dbConn";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

// Connnect to the database
connect().catch(() => {
  return NextResponse.json({ error: "Error connecting to database" });
});

// Get a booking
export async function GET(request, { params }) {
  try {
    const { bookingId } = params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Edit a booking
export async function PUT(request, { params }) {
  try {
    const formData = request.formData();
    const { bookingId } = params;

    if (!formData || !bookingId) {
      return NextResponse.json(
        { message: "Form data or Booking ID not provided" },
        { status: 404 }
      );
    }

    await Booking.findByIdAndUpdate(bookingId, formData, { new: true });

    return NextResponse.json(
      { message: "Booking edited successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Delete a booking
export async function DELETE(request, { params }) {
  try {
    const { bookingId } = params;

    if (!bookingId) {
      return NextResponse.json(
        { message: "Booking ID not provided" },
        { status: 404 }
      );
    }

    await Booking.findByIdAndDelete(bookingId);

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
