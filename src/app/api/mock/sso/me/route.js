import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request) {
  if (request.cookies.get('mock_sso_session')?.value !== 'mock-session') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401, headers: corsHeaders });
  }
  return NextResponse.json({ user: { id: 'mock-user-001', email: 'mock.researcher@example.com', name: 'Mock Researcher', isEmailVerified: true, isActive: true } }, { headers: corsHeaders });
}
