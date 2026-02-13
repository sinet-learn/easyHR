import LeaveDashboard from '@/components/leave/LeaveDashboard';
import prisma from '@/lib/prisma';

export default async function LeavePage() {
    const leaveTypes = [
        { id: 'ANNUAL', name: 'Annual Leave' },
        { id: 'SICK', name: 'Sick Leave' },
        { id: 'UNPAID', name: 'Unpaid Leave' },
        { id: 'MATERNITY', name: 'Maternity Leave' },
        { id: 'PATERNITY', name: 'Paternity Leave' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Leave Management</h1>
                <p className="text-sm text-gray-500">Track balances and manage requests</p>
            </div>

            <LeaveDashboard leaveTypes={leaveTypes} />
        </div>
    );
}
