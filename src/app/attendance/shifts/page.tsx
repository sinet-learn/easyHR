import ShiftScheduler from '@/components/attendance/ShiftScheduler';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ShiftsPage() {
    const employees = await prisma.employee.findMany({ select: { id: true, firstName: true, lastName: true } });

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Shift Configuration</h1>
                <p className="text-sm text-gray-500">Assign shifts and manage rosters</p>
            </div>

            <ShiftScheduler employees={employees} />
        </div>
    );
}
