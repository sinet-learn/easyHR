import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

        // Fetch attendance for the specific date
        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                date: new Date(date),
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        photoUrl: true,
                        department: { select: { name: true } }
                    }
                }
            },
            orderBy: { checkInTime: 'desc' }
        });

        return NextResponse.json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        return NextResponse.json(
            { error: 'Failed to fetch attendance records' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { employeeId, type, latitude, longitude, address, photoUrl } = body;

        if (!employeeId || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];

        // Find existing record for today
        let record = await prisma.attendance.findFirst({
            where: {
                employeeId,
                date: new Date(dateStr)
            }
        });

        if (type === 'CHECK_IN') {
            if (record) {
                return NextResponse.json({ error: 'Already checked in today' }, { status: 400 });
            }

            // Check shift logic for LATE status would go here
            // For now assume ON_TIME

            record = await prisma.attendance.create({
                data: {
                    employeeId,
                    date: new Date(dateStr),
                    checkInTime: today,
                    status: 'PRESENT',
                    checkInLat: latitude,
                    checkInLng: longitude,
                    checkInLoc: address,
                    checkInPhoto: photoUrl
                }
            });
        } else if (type === 'CHECK_OUT') {
            if (!record) {
                return NextResponse.json({ error: 'No check-in record found for today' }, { status: 400 });
            }

            // Calculate work hours
            const checkInTime = new Date(record.checkInTime);
            const durationMs = today.getTime() - checkInTime.getTime();
            const workHours = durationMs / (1000 * 60 * 60);

            record = await prisma.attendance.update({
                where: { id: record.id },
                data: {
                    checkOutTime: today,
                    checkOutLat: latitude,
                    checkOutLng: longitude,
                    checkOutLoc: address,
                    checkOutPhoto: photoUrl,
                    workHours: workHours
                }
            });
        }

        return NextResponse.json(record);

    } catch (error) {
        console.error('Error processing attendance:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
