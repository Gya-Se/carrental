import connect from "@/configs/dbConn";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect().catch(() => {
  return NextResponse.json({ error: "Error connecting to database" });
});

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    //check if user exists
    const user = await Admin.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { message: "Admin does not exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
    };

    // Create a token with expiration of 1 day
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "Login successful",
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
