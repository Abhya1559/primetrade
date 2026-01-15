import { connectDb } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET: any = process.env.JWT_SECRET;
console.log(JWT_SECRET);
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
export async function POST(req: Request) {
  try {
    await connectDb();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "email not founding" });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return NextResponse.json({ message: "Please register" }, { status: 400 });
    }
    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      return NextResponse.json({ message: "credential Error" });
    }

    const token = jwt.sign(
      {
        userId: userExists._id,
        email: userExists.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: userExists._id,
          email: userExists.email,
        },
        token: token,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
