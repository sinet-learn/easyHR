import prisma from '@/lib/prisma';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewEmployeePage() {
    // Fetch data for dropdowns
    const departments = await prisma.department.findMany({ select: { id: true, name: true } });
    const positions = await prisma.position.findMany({ select: { id: true, title: true } });
    const managers = await prisma.employee.findMany({
        where: { role: { in: ['ADMIN', 'MANAGER'] } },
        select: { id: true, firstName: true, lastName: true }
    });

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/employees" className="p-2 hover:bg-white rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Add New Employee</h1>
                    <p className="text-sm text-gray-500">Create a new employee profile and onboarding record</p>
                </div>
            </div>

            <EmployeeForm
                departments={departments}
                positions={positions}
                managers={managers}
            />
        </div>
    );
}
