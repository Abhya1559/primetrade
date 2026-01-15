import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/lib/mongodb";
import User from "@/models/User";

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "authheader not found" },
        { status: 404 }
      );
    }
    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    // const { email, name } = await req.json();
    // if (!email || !name) {
    //   return NextResponse.json(
    //     { message: "header data not found" },
    //     { status: 404 }
    //   );
    // }
    const user = await User.findByIdAndDelete(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "User deleted successfully",
        user: {
          id: user._id.toString(),
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 501 });
  }
}
