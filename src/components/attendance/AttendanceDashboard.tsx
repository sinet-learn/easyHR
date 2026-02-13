'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { MapPin, Camera, Clock, CheckCircle, XCircle } from 'lucide-react';

interface AttendanceRecord {
    id: string;
    employee: {
        firstName: string;
        lastName: string;
        photoUrl: string | null;
        department: { name: string } | null;
    };
    checkInTime: string;
    checkOutTime: string | null;
    status: string;
    checkInLoc: string | null;
}

export default function AttendanceDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        // Mock getting location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            }, (err) => {
                console.error("Geo error", err);
            });
        }

        fetch('/api/attendance')
            .then(res => res.json())
            .then(data => {
                setRecords(data);
                setLoading(false);
            })
            .catch(err => console.error(err));

        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = async () => {
        // In a real app, we'd get the logged-in user's ID.
        // For demo, we might need to hardcode specific ID or use a selector if testing as admin.
        // Assuming Admin ID from seed: ADMIN001 is the employeeId? No, UUID is the ID.
        // I need to know the ID of the current user. 
        // For now, I'll alert that this requires auth context.
        alert("Check-in functionality requires User Context (Logged-in Employee ID).");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Check-in Card */}
            <div className="card md:col-span-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
                <div className="text-center p-6">
                    <h2 className="text-lg font-medium opacity-90 mb-1">Current Time</h2>
                    <div className="text-4xl font-bold mb-6 tracking-wide">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm relative">
                            <MapPin className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
                            {location ? (
                                <span className="text-xs mt-12 bg-green-500 px-2 py-0.5 rounded text-white">GPS Active</span>
                            ) : (
                                <span className="text-xs mt-12 bg-red-400 px-2 py-0.5 rounded text-white animate-pulse">Locating...</span>
                            )}
                        </div>
                    </div>

                    <p className="text-sm opacity-80 mb-8">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <div className="flex gap-3 justify-center">
                        <button onClick={handleCheckIn} className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition shadow-lg active:scale-95 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> Check In
                        </button>
                        <button className="bg-white/20 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/30 transition active:scale-95 flex items-center gap-2">
                            <XCircle className="w-5 h-5" /> Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Attendance List */}
            <div className="card md:col-span-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Today's Attendance</h2>
                    <Button variant="outline" className="text-xs">View Report</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-gray-100">
                                <th className="pb-3 pl-4">Employee</th>
                                <th className="pb-3">Check In</th>
                                <th className="pb-3">Check Out</th>
                                <th className="pb-3">Location</th>
                                <th className="pb-3 pr-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
                            ) : records.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-8 text-gray-500">No attendance records for today</td></tr>
                            ) : (
                                records.map(record => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="py-3 pl-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                                                    {record.employee.photoUrl ? <img src={record.employee.photoUrl} className="w-full h-full rounded-full object-cover" /> : record.employee.firstName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{record.employee.firstName} {record.employee.lastName}</p>
                                                    <p className="text-xs text-gray-500">{record.employee.department?.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-gray-600 font-medium">
                                            {new Date(record.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="text-gray-600">
                                            {record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </td>
                                        <td className="text-gray-500 max-w-[150px] truncate" title={record.checkInLoc || ''}>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {record.checkInLoc || 'Unknown'}
                                            </div>
                                        </td>
                                        <td className="pr-4 text-right">
                                            <span className={`badge ${record.status === 'PRESENT' ? 'badge-active' :
                                                    record.status === 'LATE' ? 'badge-leave' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}>
                                                {record.status}
                                            </span>
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
