import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const candidates = await prisma.candidate.findMany({
            orderBy: { appliedAt: 'desc' }
        });
        return NextResponse.json(candidates);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validation...

        const candidate = await prisma.candidate.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                resumeUrl: body.resumeUrl,
                status: 'NEW',
                appliedPosition: body.appliedPosition
            }
        });

        return NextResponse.json(candidate, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create candidate' }, { status: 500 });
    }
}
