'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className="app-layout flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div
                className="content-area"
                style={{
                    marginLeft: isCollapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)',
                    transition: 'margin-left var(--transition-speed) var(--transition-ease)'
                }}
            >
                <main id="main-content" className="flex-1 px-8 pb-12 animate-fade-in focus:outline-none" tabIndex={-1}>
                    {children}
                </main>
            </div>
        </div>
    );
}
