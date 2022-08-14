// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
  console.log('its a middleware')
  return NextResponse.next()
}