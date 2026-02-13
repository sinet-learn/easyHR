'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface OrgNode {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
    position: { title: string } | null;
    department: { name: string } | null;
    children: OrgNode[];
}

export default function OrgChart() {
    const [data, setData] = useState<OrgNode[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/org-chart')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading structure...</div>;
    if (!data || data.length === 0) return <div className="p-8 text-center text-gray-500">No organization data found.</div>;

    return (
        <div className="w-full h-full min-h-[600px] bg-white/40 rounded-3xl border border-white/50 backdrop-blur-sm overflow-auto p-12 custom-scrollbar">
            <div className="flex justify-center min-w-max">
                {data.map(root => (
                    <RecursiveNode key={root.id} node={root} />
                ))}
            </div>
        </div>
    );
}

const RecursiveNode = ({ node }: { node: OrgNode }) => {
    return (
        <div className="flex flex-col items-center mx-4">
            <div className="card p-4 min-w-[220px] max-w-[220px] flex flex-col items-center text-center border-t-4 border-indigo-500 bg-white/90 backdrop-blur shadow-sm hover:shadow-lg transition-all cursor-pointer z-10 relative group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center mb-3 text-indigo-600 font-bold text-lg border-2 border-white shadow-sm overflow-hidden">
                    {node.photoUrl ? (
                        <img src={node.photoUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <span>{node.firstName[0]}{node.lastName[0]}</span>
                    )}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{node.firstName} {node.lastName}</h3>
                <p className="text-xs text-indigo-600 font-medium mt-1 mb-2 px-2 py-0.5 bg-indigo-50 rounded-full">{node.position?.title || 'No Position'}</p>
                <p className="text-xs text-gray-500">{node.department?.name}</p>
            </div>

            {node.children.length > 0 && (
                <div className="flex flex-col items-center">
                    {/* Vertical line from parent */}
                    <div className="h-8 w-px bg-gray-300"></div>

                    {/* Horizontal line */}
                    <div className="relative flex gap-8 pt-4 border-t border-gray-300">
                        {/* We need to hide the horizontal line's excess length for the first and last child.
                             A common CSS trick is using pseudo-elements on the children instead of a parent border.
                             Let's try a different approach for lines to be perfect.
                         */}
                        <div className="absolute top-0 left-0 w-full -translate-y-px hidden"></div>

                        {node.children.map((child, index) => (
                            <div key={child.id} className="flex flex-col items-center relative">
                                {/* Connector adjustment */}
                                <div className={`absolute -top-4 w-full h-px bg-gray-300 ${index === 0 ? 'left-1/2 w-1/2' : ''} ${index === node.children.length - 1 ? 'w-1/2 right-1/2' : ''} ${node.children.length === 1 ? 'hidden' : ''}`}></div>

                                {/* Vertical line to child */}
                                <div className="absolute -top-4 w-px h-4 bg-gray-300"></div>

                                <RecursiveNode node={child} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
