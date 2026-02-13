import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const employeeId = searchParams.get('employeeId');

        const where = employeeId ? { employeeId } : {};

        const requests = await prisma.leaveRequest.findMany({
            where,
            include: {
                employee: {
                    select: { firstName: true, lastName: true, photoUrl: true }
                }
            },
            orderBy: { startDate: 'desc' }
        });

        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leave requests' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validation...

        const leave = await prisma.leaveRequest.create({
            data: {
                employeeId: body.employeeId,
                leaveTypeId: body.leaveTypeId, // Make sure to seed LeaveTypes first or handle this
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                reason: body.reason,
                status: 'PENDING'
            }
        });

        return NextResponse.json(leave, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to submit leave request' }, { status: 500 });
    }
}
