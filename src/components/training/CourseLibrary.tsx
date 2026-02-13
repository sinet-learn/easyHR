'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlayCircle, Clock, Search, BookOpen } from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
    modules: any[];
}

export default function CourseLibrary() {
    // Mock data for now if API is empty
    const [courses, setCourses] = useState<Course[]>([
        {
            id: '1',
            title: 'Company Polices & Compliance',
            description: 'Essential guide to our company policies, code of conduct, and compliance standards.',
            thumbnailUrl: null,
            modules: [{}, {}, {}]
        },
        {
            id: '2',
            title: 'Health & Safety Training',
            description: 'Workplace safety 101. Learn how to maintain a safe environment for everyone.',
            thumbnailUrl: null,
            modules: [{}]
        },
        {
            id: '3',
            title: 'Advanced Leadership Skills',
            description: 'Develop the soft skills needed to lead high-performing teams effectively.',
            thumbnailUrl: null,
            modules: [{}, {}]
        }
    ]);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold">Training Library</h1>
                    <p className="text-sm text-gray-500">Enhance your skills with our e-learning courses</p>
                </div>

                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                    <div key={course.id} className="card group hover:shadow-lg transition-all border-none overflow-hidden flex flex-col h-full">
                        <div className="h-48 bg-gray-200 relative">
                            {/* Thumbnail placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <PlayCircle className="text-white w-12 h-12 opacity-80 group-hover:scale-110 transition-transform" />
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">{course.description}</p>

                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.modules.length} Modules</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2h 30m</span>
                            </div>

                            <Link href={`/training/${course.id}`} className="mt-4 w-full">
                                <button className="w-full py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium text-sm hover:bg-indigo-100 transition-colors">
                                    Start Learning
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
