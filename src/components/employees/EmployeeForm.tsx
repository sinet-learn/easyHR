'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { Upload, Save, X } from 'lucide-react';

interface Manager {
    id: string;
    firstName: string;
    lastName: string;
}

interface EmployeeFormProps {
    departments: { id: string; name: string }[];
    positions: { id: string; title: string }[];
    managers: Manager[];
}

export default function EmployeeForm({ departments, positions, managers }: EmployeeFormProps) {
    const router = useRouter();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        khmerName: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        address: '',
        employeeId: '',
        joinDate: new Date().toISOString().split('T')[0],
        departmentId: '',
        positionId: '',
        managerId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create employee');
            }

            router.push('/employees');
            router.refresh(); // Refresh server components
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">

            {/* Basic Info Section */}
            <div className="card">
                <h2 className="text-lg font-semibold mb-6 border-b border-gray-100 pb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input
                        label="First Name (English)"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sok"
                    />
                    <Input
                        label="Last Name (English)"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Dara"
                    />
                    <Input
                        label="Khmer Name"
                        name="khmerName"
                        value={formData.khmerName}
                        onChange={handleChange}
                        placeholder="e.g. សុខ ដារ៉ា"
                    />
                    <Select
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        options={[
                            { value: 'MALE', label: 'Male' },
                            { value: 'FEMALE', label: 'Female' },
                        ]}
                    />
                    <Input
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    <Input
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="012 345 678"
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="dara@company.com"
                    />
                    <div className="md:col-span-2">
                        <Input
                            label="Current Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="House #, St., Sangkat, Khan, City"
                        />
                    </div>
                </div>
            </div>

            {/* Employment Details */}
            <div className="card">
                <h2 className="text-lg font-semibold mb-6 border-b border-gray-100 pb-4">Employment Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input
                        label="Employee ID"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        placeholder="e.g. EMP-001"
                    />
                    <Input
                        label="Join Date"
                        type="date"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleChange}
                        required
                    />
                    <Select
                        label="Department"
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleChange}
                        options={departments.map(d => ({ value: d.id, label: d.name }))}
                    />
                    <Select
                        label="Position"
                        name="positionId"
                        value={formData.positionId}
                        onChange={handleChange}
                        options={positions.map(p => ({ value: p.id, label: p.title }))}
                    />
                    <Select
                        label="Line Manager"
                        name="managerId"
                        value={formData.managerId}
                        onChange={handleChange}
                        options={managers.map(m => ({ value: m.id, label: `${m.firstName} ${m.lastName}` }))}
                    />
                </div>
            </div>

            {/* Document Upload Placeholder */}
            <div className="card">
                <h2 className="text-lg font-semibold mb-6 border-b border-gray-100 pb-4">Required Documents</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                        <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Click to upload documents</p>
                    <p className="text-xs text-gray-500 mt-1">NID, Family Book, Certificates (PDF/JPG)</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pb-12">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading} leftIcon={<Save className="w-4 h-4" />}>
                    Save Employee
                </Button>
            </div>

            {error && (
                <div className="fixed bottom-8 right-8 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg animate-fade-in flex items-center gap-3">
                    <X className="w-5 h-5 cursor-pointer" onClick={() => setError('')} />
                    <p>{error}</p>
                </div>
            )}
        </form>
    );
}
