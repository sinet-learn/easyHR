import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';



export default async function EmployeesPage() {
    const employees = await prisma.employee.findMany({
        include: {
            department: true,
            position: true,
            manager: true,
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Employees</h1>
                    <p className="text-sm text-gray-500">Manage your workforce and view records</p>
                </div>
                <Link href="/employees/new">
                    <Button leftIcon={<Plus className="w-4 h-4" />}>
                        Add Employee
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name, ID, or position..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                    />
                </div>
                <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
                    Filter
                </Button>
            </div>

            {/* Employee Table */}
            <div className="card overflow-hidden">
                <div className="table-container border-none">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="pl-6">Employee</th>
                                <th>Role/Dept</th>
                                <th>Status</th>
                                <th>Join Date</th>
                                <th>Manager</th>
                                <th className="pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-500">
                                        No employees found. Click "Add Employee" to create one.
                                    </td>
                                </tr>
                            ) : (
                                employees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="pl-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold uppercase">
                                                    {emp.photoUrl ? (
                                                        <img src={emp.photoUrl} alt="" className="w-full h-full rounded-full object-cover" />
                                                    ) : (
                                                        emp.firstName[0] + emp.lastName[0]
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{emp.khmerName || `${emp.firstName} ${emp.lastName}`}</p>
                                                    <p className="text-xs text-gray-500">{emp.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="font-medium text-sm">{emp.position?.title || 'No Position'}</p>
                                            <p className="text-xs text-gray-500">{emp.department?.name || 'No Dept'}</p>
                                        </td>
                                        <td>
                                            <span className={`badge ${emp.status === 'FULL_TIME' ? 'badge-active' :
                                                emp.status === 'PROBATION' ? 'bg-blue-100 text-blue-700' :
                                                    'badge-inactive'
                                                }`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="text-sm text-gray-600">
                                            {new Date(emp.joinDate).toLocaleDateString()}
                                        </td>
                                        <td className="text-sm text-gray-600">
                                            {emp.manager ? `${emp.manager.firstName} ${emp.manager.lastName}` : '-'}
                                        </td>
                                        <td className="pr-6 text-right">
                                            <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
