import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('GET /api/doctors error', error);
    // If DB is unavailable, return an empty list so pages can still render.
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, specialty, expertise, email, imageUrl } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // map incoming `specialty` (old name) to `expertise` (schema)
    const expertiseValue = expertise ?? specialty ?? null;

    const doctor = await prisma.doctor.create({
      data: {
        name,
        expertise: expertiseValue,
        email,
        imageUrl,
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error('POST /api/doctors error', error);
    return NextResponse.json({ error: 'Error creating doctor' }, { status: 500 });
  }
}

