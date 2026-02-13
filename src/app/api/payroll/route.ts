import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const payrolls = await prisma.payroll.findMany({
            include: {
                employee: {
                    select: { firstName: true, lastName: true, department: { select: { name: true } } }
                }
            },
            orderBy: { periodStart: 'desc' }
        });
        return NextResponse.json(payrolls);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch payroll records' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { employeeId, month, year } = await request.json();

        // 1. Fetch Employee Data & Salary Info
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId },
            include: {
                attendances: {
                    where: {
                        date: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1)
                        }
                    }
                }
            }
        });

        if (!employee) return NextResponse.json({ error: 'Employee not found' }, { status: 404 });

        // 2. Mock Calculation Logic (Replace with real logic from DB/Contract)
        const baseSalary = 500.00; // Mock base
        const allowances = 50.00;
        const deductions = 0.00;
        const tax = baseSalary * 0.10; // 10% tax mock

        // Calculate attendance-based deductions or OT here
        const totalWorkHours = employee.attendances.reduce((sum, att) => sum + (att.workHours || 0), 0);
        // e.g. if totalWorkHours < required, deduct...

        const netSalary = baseSalary + allowances - deductions - tax;

        // 3. Create Payroll Record
        const payroll = await prisma.payroll.create({
            data: {
                employeeId,
                month,
                year,
                periodStart: new Date(year, month - 1, 1),
                periodEnd: new Date(year, month, 0), // Last day of month
                baseSalary,
                allowances,
                deductions,
                tax,
                netSalary,
                status: 'DRAFT'
            }
        });

        return NextResponse.json(payroll, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Payroll generation failed' }, { status: 500 });
    }
}
