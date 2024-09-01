import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connect from "@/configs/dbConn";
import Admin from "@/models/Admin";

connect().catch(() => {
  return NextResponse.json({ error: "Error connecting to database" });
});
// Calls the connect function to establish a connection to the database.

export async function POST(request) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    const { username, password, code } = reqBody;

    if (code !== "Carrentalproject") {
      return NextResponse.json(
        { message: "Admin code is incorrect" },
        { status: 401 }
      );
    }

    //Checks if a admin with the provided username already exists.
    const admin = await Admin.findOne({ username });

    //If yes, returns a 400 response.
    if (admin) {
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 400 }
      );
    }

    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    // Saves the new admin to the database.
    const savedAdmin = await newAdmin.save();

    return NextResponse.json({
      message: "Admin created successfully",
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
