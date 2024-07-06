import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, username, password, confirmPassword } = reqBody;
  // console.log(reqBody);
  if (!email || !username || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "Provide all fields" },
      { status: 400 }
    );
  }
  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "password and confirm Password does not match." },
      { status: 403 }
    );
  }
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return NextResponse.json(
      { message: "Email Already exist" },
      { status: 400 }
    );
  }
  try {
    const user = await User.create({ ...reqBody });
    const userWithoutPassword = await User.findById(user).select("-password");
    // console.log(userWithoutPassword);

    return NextResponse.json(
      {
        message: "User successfully created",
        success: true,
        userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
