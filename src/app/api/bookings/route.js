import connect from "@/configs/dbConn";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

// Connnect to the database
connect().catch(() => {
  return NextResponse.json({ error: "Error connecting to database" });
});

// Get bookings
export async function GET() {
  try {
    const bookings = await Booking.find({}).populate("car");

    if (!bookings) {
      return NextResponse.json(
        { message: "No bookings found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Add a booking
export async function POST(request) {
  try {
    const formData = await request.formData();

    if (!formData) {
      return NextResponse.json(
        { message: "Form data not provided" },
        { status: 404 }
      );
    }

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const car = formData.get("car");

    // Create a new booking
    const booking = await Booking.create({
      name,
      email,
      phone,
      startDate,
      endDate,
      car,
    });

    // Verify if the booking was actually saved
    if (!booking) {
      return NextResponse.json(
        { message: "Failed to save booking" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Booking added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
