'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CalendarCheck, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';

interface LeaveType {
    id: string;
    name: string;
}

export default function LeaveDashboard({ leaveTypes }: { leaveTypes: LeaveType[] }) {
    // Mock balances
    const balances = [
        { type: 'Annual Leave', used: 4, total: 18, color: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20' },
        { type: 'Sick Leave', used: 1, total: 10, color: 'text-red-500 bg-red-500/10 border-red-500/20' },
        { type: 'Unpaid Leave', used: 0, total: 0, color: 'text-slate-500 bg-slate-500/10 border-slate-500/20' },
    ];

    const [modalOpen, setModalOpen] = useState(false);

    // In a real app, I'd implement the form submission logic here similar to EmployeeForm

    return (
        <div>
            {/* Balances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {balances.map((bal, idx) => (
                    <div key={idx} className="card p-6 flex flex-col items-center text-center">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 border ${bal.color}`}>
                            <CalendarCheck className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <h3 className="font-bold text-[var(--text-main)]">{bal.type}</h3>
                        <div className="text-3xl font-bold my-1 text-[var(--text-main)]">{bal.total - bal.used}</div>
                        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Days Available</p>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[var(--text-main)]">My Leave Requests</h2>
                <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>Request Leave</Button>
            </div>

            {/* Simple List Mockup */}
            <div className="card overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="p-4 pl-6">Type</th>
                            <th className="p-4">Dates</th>
                            <th className="p-4">Duration</th>
                            <th className="p-4">Reason</th>
                            <th className="p-4 pr-6 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                        <tr className="hover:bg-[var(--bg-main)] transition-colors">
                            <td className="p-4 pl-6 font-semibold text-[var(--text-main)]">Sick Leave</td>
                            <td className="p-4 text-[var(--text-muted)]">Feb 12 - Feb 13, 2024</td>
                            <td className="p-4 font-medium text-[var(--text-main)]">2 days</td>
                            <td className="p-4 text-[var(--text-muted)]">Flu fever</td>
                            <td className="p-4 pr-6 text-right">
                                <span className="badge-leave flex items-center gap-1.5 justify-center w-fit ml-auto border px-3 py-1">
                                    <Clock className="w-3 h-3" aria-hidden="true" /> Pending
                                </span>
                            </td>
                        </tr>
                        <tr className="hover:bg-[var(--bg-main)] transition-colors">
                            <td className="p-4 pl-6 font-semibold text-[var(--text-main)]">Annual Leave</td>
                            <td className="p-4 text-[var(--text-muted)]">Jan 15, 2024</td>
                            <td className="p-4 font-medium text-[var(--text-main)]">1 day</td>
                            <td className="p-4 text-[var(--text-muted)]">Family event</td>
                            <td className="p-4 pr-6 text-right">
                                <span className="badge-active flex items-center gap-1.5 justify-center w-fit ml-auto border px-3 py-1">
                                    <CheckCircle className="w-3 h-3" aria-hidden="true" /> Approved
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Simple Modal Trigger for Demo */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="card w-full max-w-md p-6 bg-white animate-fade-in">
                        <h2 className="text-xl font-bold mb-4">Request Leave</h2>
                        <div className="space-y-4">
                            <input type="date" className="w-full border p-2 rounded-xl" />
                            <textarea className="w-full border p-2 rounded-xl" placeholder="Reason..."></textarea>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                            <Button onClick={() => setModalOpen(false)}>Submit Request</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
