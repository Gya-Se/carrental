import connect from "@/configs/dbConn";
import Car from "@/models/Car";
import { NextResponse } from "next/server";
import  uploadImageToCloudinary  from "@/configs/uploadcld";

// Connnect to the database
connect().catch(() => {
  return NextResponse.json({ error: "Error connecting to database" });
});

// Get cars
export async function GET() {
  try {
    const cars = await Car.find({});

    if (!cars) {
      return NextResponse.json({ message: "No cars found" }, { status: 404 });
    }

    return NextResponse.json({ data: cars }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Add a car
export async function POST(request) {
  try {
    const formData = await request.formData();

    const brand = formData.get("brand");
    const model = formData.get("model");
    const year = formData.get("year");
    const price = formData.get("price");
    const imageFile = formData.get("image");

    if (!brand || !model || !year || !price || !imageFile) {
      return NextResponse.json(
        { message: "All fields are required including image" },
        { status: 400 }
      );
    }

    // Convert file to buffer if needed (depending on your server environment)
    const imageBuffer = await imageFile.arrayBuffer();

    // Upload the image to Cloudinary
    const imageResponse = await uploadImageToCloudinary(
      Buffer.from(imageBuffer)
    );

    // Extract the secure URL from the response
    const imageUrl = imageResponse.secure_url;

    if (!imageUrl) {
      throw new Error("Failed to obtain image URL from Cloudinary");
    }

    // Create the car in the database with the image URL
    await Car.create({
      brand,
      model,
      year,
      price,
      image: imageUrl,
      available: true,
    });

    return NextResponse.json(
      { message: "Car added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
