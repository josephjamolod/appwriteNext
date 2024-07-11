import { connectDB } from "@/dbConfig/dbConfig";
import { IdFromToken } from "@/helpers/IdFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userID = await IdFromToken(request);
    const user = await User.findById(userID).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "There is a user", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
