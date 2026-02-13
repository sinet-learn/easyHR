'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Calendar, Plus } from 'lucide-react';

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
}

export default function ShiftScheduler({ employees }: { employees: Employee[] }) {
    const [shifts, setShifts] = useState<any[]>([]); // mock for now

    // Form state
    const [newShift, setNewShift] = useState({
        name: 'Morning Shift',
        date: new Date().toISOString().split('T')[0],
        startTime: '08:00',
        endTime: '17:00',
        employeeId: ''
    });

    const handleCreateShift = async (e: React.FormEvent) => {
        e.preventDefault();
        // Construct DateTime objects
        const start = new Date(`${newShift.date}T${newShift.startTime}`);
        const end = new Date(`${newShift.date}T${newShift.endTime}`);

        const res = await fetch('/api/shifts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: newShift.name,
                startTime: start,
                endTime: end,
                employeeId: newShift.employeeId
            })
        });

        if (res.ok) {
            alert("Shift created!");
            // Refresh logic
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="card lg:col-span-1">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Assign Shift
                </h2>
                <form onSubmit={handleCreateShift} className="space-y-4">
                    <Select
                        label="Employee"
                        options={employees.map(e => ({ value: e.id, label: `${e.firstName} ${e.lastName}` }))}
                        value={newShift.employeeId}
                        onChange={e => setNewShift({ ...newShift, employeeId: e.target.value })}
                        required
                    />
                    <Input
                        label="Shift Name"
                        value={newShift.name}
                        onChange={e => setNewShift({ ...newShift, name: e.target.value })}
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={newShift.date}
                        onChange={e => setNewShift({ ...newShift, date: e.target.value })}
                        required
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            label="Start Time"
                            type="time"
                            value={newShift.startTime}
                            onChange={e => setNewShift({ ...newShift, startTime: e.target.value })}
                            required
                        />
                        <Input
                            label="End Time"
                            type="time"
                            value={newShift.endTime}
                            onChange={e => setNewShift({ ...newShift, endTime: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Create Shift</Button>
                </form>
            </div>

            <div className="card lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Calendar className="w-5 h-5" /> Weekly Schedule
                    </h2>
                    <div className="flex gap-2">
                        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-xs font-bold">Week 12</div>
                    </div>
                </div>

                <div className="border border-gray-100 rounded-xl bg-gray-50/50 p-8 text-center text-gray-500">
                    Calendar View Placeholder (Requires complex calendar component)
                </div>
            </div>
        </div>
    );
}
