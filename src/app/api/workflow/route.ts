import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log('Received workflow request:', payload);

    // TODO: Implement durable workflow logic with @vercel/functions
    // e.g., triggering the TinyClaw orchestrator

    return NextResponse.json({ status: 'Workflow initiated', payload });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process workflow' }, { status: 500 });
  }
}
