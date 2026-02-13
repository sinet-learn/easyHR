import AttendanceDashboard from '@/components/attendance/AttendanceDashboard';

export default function AttendancePage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Attendance Tracking</h1>
                <p className="text-sm text-gray-500">Monitor employee check-ins and shifts</p>
            </div>

            <AttendanceDashboard />
        </div>
    );
}
