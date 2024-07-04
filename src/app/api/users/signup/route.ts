import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json;
    const { email, username, password, confirmPassword } = reqBody;
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "password and confirm Password does not match." },
        { status: 403 }
      );
    }
    // const isEmailExist=await User
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
