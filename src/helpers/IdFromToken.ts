import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export const IdFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("access_token")?.value || "";
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    return payload.userID;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
