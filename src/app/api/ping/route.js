import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/mongoose";

export function GET(){
    connectDB()
    return NextResponse.json({
        message: "Hello Word!"
    });
};