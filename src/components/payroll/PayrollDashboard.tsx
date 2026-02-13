'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Download, DollarSign, FileText } from 'lucide-react';

export default function PayrollDashboard() {
    // Mock data
    const payrolls = [
        { id: '1', period: 'January 2024', base: 500, net: 480, status: 'PAID' },
        { id: '2', period: 'February 2024', base: 500, net: 485, status: 'DRAFT' },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white border-none p-6">
                    <h3 className="text-white/80 font-medium mb-1">Last Salary Paid</h3>
                    <div className="text-3xl font-bold mb-4">$480.00</div>
                    <div className="text-sm text-white/70">Paid on Jan 31, 2024</div>
                </div>
                <div className="card p-6">
                    <h3 className="text-gray-500 font-medium mb-1">Next Pay Date</h3>
                    <div className="text-3xl font-bold text-gray-800 mb-4">Feb 29</div>
                    <div className="text-sm text-gray-400">In 14 days</div>
                </div>
                <div className="card p-6">
                    <h3 className="text-gray-500 font-medium mb-1">YTD Earnings</h3>
                    <div className="text-3xl font-bold text-indigo-600 mb-4">$965.00</div>
                    <div className="text-sm text-gray-400">Total for 2024</div>
                </div>
            </div>

            <div className="card">
                <h2 className="text-lg font-bold mb-6">Salary History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="p-4 pl-6">Period</th>
                                <th className="p-4">Base Salary</th>
                                <th className="p-4">Net Salary</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 pr-6 text-right">Payslip</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payrolls.map((payroll) => (
                                <tr key={payroll.id} className="hover:bg-gray-50">
                                    <td className="p-4 pl-6 font-medium text-gray-900">{payroll.period}</td>
                                    <td className="p-4 text-gray-600">{formatCurrency(payroll.base)}</td>
                                    <td className="p-4 font-bold text-green-600">{formatCurrency(payroll.net)}</td>
                                    <td className="p-4">
                                        <span className={`badge ${payroll.status === 'PAID' ? 'badge-active' : 'bg-gray-100 text-gray-600'}`}>
                                            {payroll.status}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                        <Button variant="outline" className="h-8 text-xs" leftIcon={<Download className="w-3 h-3" />}>
                                            Download
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
