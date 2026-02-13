'use client';
import { Users, Clock, Banknote, CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function DashboardPage() {
    const { t } = useLanguage();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">{t.dashboard.welcome}</h1>

            {/* Stats Grid */}
            <div className="stats-grid mb-8">
                <div className="card stat-card">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="stat-label">{t.dashboard.stats.totalEmployees}</p>
                            <p className="stat-value">24</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <span className="font-medium">+2</span> this month
                    </p>
                </div>

                <div className="card stat-card">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="stat-label">{t.dashboard.stats.presentToday}</p>
                            <p className="stat-value">18</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        3 Late, 3 Absent
                    </p>
                </div>

                <div className="card stat-card">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="stat-label">{t.dashboard.stats.onLeave}</p>
                            <p className="stat-value">3</p>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                            <CalendarCheck className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        2 Pending Approval
                    </p>
                </div>

                <div className="card stat-card">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="stat-label">{t.dashboard.stats.payrollEst}</p>
                            <p className="stat-value">$12,450</p>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <Banknote className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Due in 15 days
                    </p>
                </div>
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-lg font-semibold mb-4">{t.dashboard.pendingApprovals}</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">JD</div>
                                <div>
                                    <p className="font-medium">John Doe</p>
                                    <p className="text-xs text-gray-500">Sick Leave • Feb 12 - Feb 14</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-md hover:bg-green-200">Approve</button>
                                <button className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200">Reject</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">SK</div>
                                <div>
                                    <p className="font-medium">Sophea Keo</p>
                                    <p className="text-xs text-gray-500">EWA Request • $50.00</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-md hover:bg-green-200">Approve</button>
                                <button className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold mb-4">Today's Attendance</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="pb-2">Employee</th>
                                    <th className="pb-2">Time In</th>
                                    <th className="pb-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="py-2">Dara Sok</td>
                                    <td>07:55 AM</td>
                                    <td><span className="badge badge-active">On Time</span></td>
                                </tr>
                                <tr>
                                    <td className="py-2">Vanna Chan</td>
                                    <td>08:15 AM</td>
                                    <td><span className="badge badge-leave text-red-600 bg-red-100">Late</span></td>
                                </tr>
                                <tr>
                                    <td className="py-2">Bopha Ly</td>
                                    <td>-</td>
                                    <td><span className="badge badge-inactive">Absent</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-outline w-full mt-4 text-sm py-2">View Attendance Report</button>
                </div>
            </div>
        </div>
    );
}
