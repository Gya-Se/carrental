import connect from "@/configs/dbConn";
import Car from "@/models/Car";
import { NextResponse } from "next/server";
import uploadImageToCloudinary from "@/configs/uploadcld";
import extractPublicIdFromUrl from "@/configs/extractcld";
import deleteImageFromCloudinary from "@/configs/deletecld";

// Connnect to the database
connect().catch(() => {
  return NextResponse.json({ error: "Error connecting to database" });
});

// Get a car
export async function GET(request, { params }) {
  try {
    const { carId } = params;

    const car = await Car.findById(carId);

    if (!car) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ car }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Edit a car
export async function PUT(request, { params }) {
  try {
    const formData = await request.formData();
    const { carId } = params;

    if (!formData || !carId) {
      return NextResponse.json(
        { message: "Form data or Car ID not provided" },
        { status: 404 }
      );
    }

    const brand = formData.get("brand");
    const model = formData.get("model");
    const year = formData.get("year");
    const price = formData.get("price");
    const available = formData.get("available");
    const imageFile = formData.get("image");

    if (imageFile === null) {
      await Car.findByIdAndUpdate(
        carId,
        {
          brand,
          model,
          year,
          price,
          available,
        },
        { new: true }
      );
    } else {
      // Fetch the current car to get the existing image URL
      const existingCar = await Car.findById(carId);

      if (!existingCar) {
        return NextResponse.json({ message: "Car not found" }, { status: 404 });
      }

      // Extract the public ID from the existing image URL and delete the image
      const existingImageUrl = existingCar.image;
      if (existingImageUrl) {
        const publicId = extractPublicIdFromUrl(existingImageUrl);
        await deleteImageFromCloudinary(publicId);
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

      await Car.findByIdAndUpdate(
        carId,
        {
          brand,
          model,
          year,
          price,
          available,
          image: imageUrl,
        },
        { new: true }
      );
    }

    return NextResponse.json(
      { message: "Car edited successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Delete a car
export async function DELETE(request, { params }) {
  try {
    const { carId } = params;

    if (!carId) {
      return NextResponse.json(
        { message: "Car ID not provided" },
        { status: 404 }
      );
    }

    // Fetch the current car to get the existing image URL
    const existingCar = await Car.findById(carId);
    if (!existingCar) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    // Extract the public ID from the existing image URL and delete the image
    const existingImageUrl = existingCar.image;
    if (existingImageUrl) {
      const publicId = extractPublicIdFromUrl(existingImageUrl);
      console.log(publicId);
      await deleteImageFromCloudinary(publicId);
    }

    await Car.findByIdAndDelete(carId);

    return NextResponse.json(
      { message: "Car deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
