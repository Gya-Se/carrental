import connect from "@/configs/dbConn";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";

// Connnect to the database
connect().catch(() => {
  return NextResponse.json({ error: "Error connecting to database" });
});

export async function GET(request) {
  try {
    // Extract user ID from the authentication token
    const userId = await getDataFromToken(request);

    // Find the user in the database based on the user ID
    const user = await Admin.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "Admin found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
