import { NextResponse } from "next/server";
import { testPingRequest } from "@/services/system.service";

export async function GET() {
  try {
    const payload = await testPingRequest();
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ message: "ping test failed" }, { status: 500 });
  }
}
