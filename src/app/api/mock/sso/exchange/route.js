import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body?.client_id || !body?.code || !body?.code_verifier) {
    return NextResponse.json({ message: 'client_id, code and code_verifier are required.' }, { status: 400, headers: corsHeaders });
  }
  if (body.code !== 'mock-code') {
    return NextResponse.json({ message: 'Mock code is invalid or expired.' }, { status: 401, headers: corsHeaders });
  }
  const response = NextResponse.json({
    success: true,
    callbackUrl: 'http://localhost:5173/auth/callback',
    state: null,
    user: { id: 'mock-user-001', email: 'mock.researcher@example.com', name: 'Mock Researcher', isEmailVerified: true, isActive: true },
  }, { headers: corsHeaders });
  response.cookies.set('mock_sso_session', 'mock-session', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 600 });
  return response;
}
