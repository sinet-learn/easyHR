import PayrollDashboard from '@/components/payroll/PayrollDashboard';
import { DollarSign } from 'lucide-react';

export default function PayrollPage() {
    return (
        <div>
            <div className="mb-8 flex items-center gap-3">
                <div className="p-3 bg-green-50 rounded-xl text-green-600">
                    <DollarSign className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Payroll & Salary</h1>
                    <p className="text-sm text-gray-500">View payslips and salary details</p>
                </div>
            </div>

            <PayrollDashboard />
        </div>
    );
}
