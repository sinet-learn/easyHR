import OrgChart from '@/components/organization/OrgChart';
import { Network } from 'lucide-react';

export default function OrganizationPage() {
    return (
        <div>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                    <Network className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Organization Structure</h1>
                    <p className="text-sm text-gray-500">Visual hierarchy and reporting lines</p>
                </div>
            </div>

            <OrgChart />
        </div>
    );
}
