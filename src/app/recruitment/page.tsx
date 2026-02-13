import KanbanBoard from '@/components/recruitment/KanbanBoard';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function RecruitmentPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-100 rounded-lg text-indigo-600 border border-slate-200">
                        <UserPlus className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Recruitment Pipeline</h1>
                        <p className="text-sm font-medium text-slate-500">Track candidates and interviews</p>
                    </div>
                </div>
                <Button leftIcon={<UserPlus className="w-4 h-4" />}>New Candidate</Button>
            </div>

            <KanbanBoard />
        </div>
    );
}
