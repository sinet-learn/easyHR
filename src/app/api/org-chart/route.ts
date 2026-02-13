import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const employees = await prisma.employee.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                photoUrl: true,
                position: { select: { title: true } },
                managerId: true,
                department: { select: { name: true } },
            },
        });

        // Build tree structure
        const employeeMap = new Map<string, any>();
        const rootNodes: any[] = [];

        employees.forEach((emp: any) => {
            employeeMap.set(emp.id, { ...emp, children: [] });
        });

        employees.forEach((emp: any) => {
            if (emp.managerId) {
                const manager = employeeMap.get(emp.managerId);
                if (manager) {
                    manager.children.push(employeeMap.get(emp.id));
                } else {
                    rootNodes.push(employeeMap.get(emp.id));
                }
            } else {
                rootNodes.push(employeeMap.get(emp.id));
            }
        });

        return NextResponse.json(rootNodes);
    } catch (error) {
        console.error('Error fetching org chart:', error);
        return NextResponse.json(
            { error: 'Failed to fetch organization chart' },
            { status: 500 }
        );
    }
}
