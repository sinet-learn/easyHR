import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation logic: checks if amount < accrued salary
        // Mock validation for now

        const ewa = await prisma.eWARequest.create({
            data: {
                employeeId: body.employeeId,
                amount: body.amount,
                reason: body.reason,
                status: 'PENDING'
            }
        });

        return NextResponse.json(ewa, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit EWA request' }, { status: 500 });
    }
}
