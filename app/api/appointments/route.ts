import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('GET /api/appointments error', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patient, service, date, time, owner, phone, petName, petType, notes } = body;

    // Validate required fields
    if (!patient || !service || !date || !time || !owner || !phone || !petName || !petType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patient,
        service,
        date,
        time,
        owner,
        phone,
        petName,
        petType,
        notes: notes || '',
        status: 'pending',
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('POST /api/appointments error', error);
    return NextResponse.json({ error: 'Error creating appointment' }, { status: 503 });
  }
}
