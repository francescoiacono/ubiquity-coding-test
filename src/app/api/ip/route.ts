import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles the GET request for retrieving IP information.
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the IP information in JSON format.
 */
export async function GET(req: NextRequest) {
  const data = {
    ip: req.ip || req.headers.get('X-Forwarded-For'),
  };

  return new NextResponse(JSON.stringify(data, null, 2));
}
