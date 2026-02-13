'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Wallet, ArrowRight } from 'lucide-react';

export default function EWAPage() {
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic
        alert("Request submitted!");
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-indigo-200">
                    <Wallet className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold">Earned Wage Access</h1>
                <p className="text-sm text-gray-500 mt-2">Access your salary before payday for emergencies.</p>
            </div>

            <div className="card p-8">
                <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl mb-8">
                    <div>
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Available Limit</p>
                        <p className="text-2xl font-bold text-indigo-900">$150.00</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Accrued Salary</p>
                        <p className="text-lg font-medium text-gray-700">$300.00</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Withdraw</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-100 outline-none text-lg font-bold"
                                placeholder="0.00"
                                max="150"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Max withdrawal: $150.00 (50% of accrued)</p>
                    </div>

                    <Input
                        label="Reason (Optional)"
                        placeholder="e.g. Medical emergency"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                    />

                    <div className="pt-4">
                        <Button className="w-full py-4 text-lg shadow-indigo-200 shadow-lg" leftIcon={<ArrowRight className="w-5 h-5" />}>
                            Request Instant Transfer
                        </Button>
                        <p className="text-center text-xs text-gray-400 mt-4">Funds usually arrive within 30 minutes.</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
