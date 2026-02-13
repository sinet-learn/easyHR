'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Types from Prisma schema or similar
interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    status: 'NEW' | 'SCREENING' | 'INTERVIEW' | 'OFFERED' | 'HIRED' | 'REJECTED';
    appliedPosition: string;
}

const COLUMNS = [
    { id: 'NEW', title: 'New Applied' },
    { id: 'SCREENING', title: 'Screening' },
    { id: 'INTERVIEW', title: 'Interview' },
    { id: 'OFFERED', title: 'Offered' },
    { id: 'HIRED', title: 'Hired' },
];

export default function KanbanBoard() {
    const [candidates, setCandidates] = useState<Candidate[]>([
        { id: '1', firstName: 'Sok', lastName: 'Visal', status: 'NEW', appliedPosition: 'Frontend Dev' },
        { id: '2', firstName: 'Chan', lastName: 'Thida', status: 'INTERVIEW', appliedPosition: 'HR Manager' },
        { id: '3', firstName: 'Ly', lastName: 'Bopha', status: 'OFFERED', appliedPosition: 'Sales Rep' },
    ]);

    const onDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("id", id);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const onDrop = (e: React.DragEvent, status: string) => {
        const id = e.dataTransfer.getData("id");
        setCandidates(candidates.map(c => {
            if (c.id === id) return { ...c, status: status as any };
            return c;
        }));
        // In real app, call API to update status here
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-200px)]">
            {COLUMNS.map(col => (
                <div
                    key={col.id}
                    className="w-80 shrink-0 flex flex-col"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, col.id)}
                >
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                            {col.title}
                            <span className="bg-[var(--bg-main)] text-[var(--text-muted)] text-xs px-2 py-0.5 rounded-full border border-[var(--border)]">
                                {candidates.filter(c => c.status === col.id).length}
                            </span>
                        </h3>
                        <button
                            className="text-[var(--text-muted)] hover:text-[var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md p-1"
                            aria-label={`Options for ${col.title}`}
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 bg-[var(--bg-main)]/50 rounded-xl p-4 gap-4 flex flex-col overflow-y-auto border border-[var(--border)]">
                        {candidates.filter(c => c.status === col.id).map(candidate => (
                            <div
                                key={candidate.id}
                                draggable
                                onDragStart={(e) => onDragStart(e, candidate.id)}
                                className="card p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all border-l-4 border-l-indigo-500 bg-[var(--bg-card)]"
                            >
                                <h4 className="font-bold text-[var(--text-main)]">{candidate.firstName} {candidate.lastName}</h4>
                                <p className="text-sm text-[var(--text-muted)] mb-2 font-medium">{candidate.appliedPosition}</p>

                                <div className="flex justify-between items-center mt-4 pt-3 border-t border-[var(--border)] opacity-80">
                                    <div className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded">High Match</div>
                                    <div className="text-[10px] font-semibold text-[var(--text-muted)]">2d ago</div>
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" className="border-2 border-dashed border-[var(--border)] text-[var(--text-muted)] hover:border-indigo-400 hover:text-indigo-500 w-full justify-start py-3">
                            <Plus className="w-4 h-4 mr-2" /> Add Candidate
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
