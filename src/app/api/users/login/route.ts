import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  if (!email || !password) {
    return NextResponse.json(
      { message: "Please Provide both field" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Password is incorrect" },
        { status: 400 }
      );
    }
    const token = await user.createJWT();
    const userWithoutPassword = await User.findById(user).select("-password");
    const response = NextResponse.json(
      {
        message: "User successfully logged in",
        success: true,
        userWithoutPassword,
      },
      { status: 200 }
    );
    response.cookies.set("access_token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
