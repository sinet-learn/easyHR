import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const shifts = await prisma.shift.findMany({
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        department: { select: { name: true } }
                    }
                }
            },
            orderBy: { startTime: 'asc' }
        });
        return NextResponse.json(shifts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch shifts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validation...

        const shift = await prisma.shift.create({
            data: {
                name: body.name,
                startTime: new Date(body.startTime),
                endTime: new Date(body.endTime),
                employeeId: body.employeeId,
                // recurrence logic would go here
            }
        });

        return NextResponse.json(shift, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create shift' }, { status: 500 });
    }
}
