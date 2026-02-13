import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.firstName || !body.lastName || !body.email || !body.employeeId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create employee
        const employee = await prisma.employee.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                khmerName: body.khmerName,
                email: body.email,
                phone: body.phone,
                gender: body.gender,
                dob: body.dob ? new Date(body.dob) : null,
                address: body.address,
                employeeId: body.employeeId,
                joinDate: new Date(body.joinDate),
                departmentId: body.departmentId,
                positionId: body.positionId,
                managerId: body.managerId,
                status: 'PROBATION',
                // Password for initial login - hardcoded for now or generated
                passwordHash: 'password123',
            },
        });

        return NextResponse.json(employee, { status: 201 });
    } catch (error) {
        console.error('Error creating employee:', error);
        return NextResponse.json(
            { error: 'Failed to create employee' },
            { status: 500 }
        );
    }
}
