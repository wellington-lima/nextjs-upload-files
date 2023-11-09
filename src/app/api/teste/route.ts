import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Upload")
  return NextResponse.json({ success: true })
}