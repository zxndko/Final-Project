import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const appointmentId = Number(id);

    if (isNaN(appointmentId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await req.json();
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: body.status || 'confirmed',
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/appointments/[id] error', error);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 503 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const appointmentId = Number(id);

    if (isNaN(appointmentId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/appointments/[id] error', error);
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 503 });
  }
}
