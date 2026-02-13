'use client';

import React, { useState } from 'react';
import { Play, CheckCircle, Lock, FileText, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CoursePlayerPage({ params }: { params: { courseId: string } }) {
    // Mock course data
    const course = {
        id: params.courseId,
        title: 'Company Policies & Compliance',
        modules: [
            { id: 'm1', title: 'Introduction to Code of Conduct', type: 'VIDEO', duration: '10:00', completed: true },
            { id: 'm2', title: 'Data Privacy Guidelines', type: 'VIDEO', duration: '15:00', completed: false },
            { id: 'm3', title: 'Workplace Harassment Policy', type: 'PDF', duration: '5:00', completed: false },
            { id: 'q1', title: 'Compliance Assessment', type: 'QUIZ', duration: '20:00', completed: false },
        ]
    };

    const [activeModule, setActiveModule] = useState(course.modules[0]);

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <div className="bg-black rounded-2xl overflow-hidden aspect-video relative flex-1 max-h-[600px] flex items-center justify-center group cursor-pointer shadow-2xl">
                    {/* Video Player Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <Play className="w-20 h-20 text-white opacity-80 group-hover:scale-110 transition-transform" />
                    <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-xl font-bold">{activeModule.title}</h2>
                        <p className="text-sm opacity-80 mt-1">Playing: {activeModule.duration}</p>
                    </div>
                </div>

                <div className="mt-6 card">
                    <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                    <p className="text-gray-500">Progress: 25% completed</p>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-green-500 h-full w-1/4"></div>
                    </div>
                </div>
            </div>

            {/* Sidebar / Module List */}
            <div className="w-full md:w-96 flex flex-col h-full">
                <div className="card h-full flex flex-col p-0 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-lg">Course Content</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {course.modules.map((module, idx) => (
                            <div
                                key={module.id}
                                onClick={() => setActiveModule(module)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-indigo-50 flex items-start gap-3 ${activeModule.id === module.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}
                            >
                                <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${module.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {module.completed ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                                </div>
                                <div>
                                    <h4 className={`text-sm font-medium ${activeModule.id === module.id ? 'text-indigo-700' : 'text-gray-700'}`}>{module.title}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        {module.type === 'VIDEO' && <Play className="w-3 h-3 text-gray-400" />}
                                        {module.type === 'PDF' && <FileText className="w-3 h-3 text-gray-400" />}
                                        {module.type === 'QUIZ' && <HelpCircle className="w-3 h-3 text-gray-400" />}
                                        <span className="text-xs text-gray-400">{module.duration}</span>
                                    </div>
                                </div>
                                {!module.completed && idx > 0 && !course.modules[idx - 1].completed && (
                                    <Lock className="w-4 h-4 text-gray-300 ml-auto" />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                        {activeModule.type === 'QUIZ' ? (
                            <Button className="w-full">Start Quiz</Button>
                        ) : (
                            <Button className="w-full" variant="outline">Mark as Completed</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
