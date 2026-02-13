'use client';
import { Bell, Search, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <header
            className="flex justify-between items-center mb-8 px-6 py-3 bg-[var(--bg-card)] border-b border-[var(--border)] sticky top-0 z-50 shadow-sm"
            role="banner"
        >
            <div className="relative w-full max-w-sm">
                <label htmlFor="top-search" className="sr-only">{t.common.searchPlaceholder}</label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-4 h-4" aria-hidden="true" />
                <input
                    id="top-search"
                    type="search"
                    placeholder={t.common.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border)] focus:bg-[var(--bg-card)] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm transition-all text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleLanguage}
                    className="px-3 py-1.5 rounded-md border border-[var(--border)] text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
                    aria-label={`Switch language to ${language === 'en' ? 'Khmer' : 'English'}`}
                >
                    {language === 'en' ? '🇺🇸 EN' : '🇰🇭 KM'}
                </button>

                <button
                    className="relative p-2 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-main)] hover:text-[var(--text-main)] transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" aria-hidden="true" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-[var(--bg-card)]" aria-hidden="true"></span>
                </button>

                <div className="flex items-center gap-4 pl-4 ml-2 border-l border-[var(--border)]">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-[var(--text-main)] leading-tight">Admin User</p>
                        <p className="text-xs font-medium text-[var(--text-muted)]">HR Manager</p>
                    </div>
                    <button
                        className="w-10 h-10 rounded-full bg-[var(--bg-main)] flex items-center justify-center border border-[var(--border)] hover:border-indigo-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
                        aria-label="User Profile"
                    >
                        <User className="w-5 h-5 text-[var(--text-muted)]" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </header>
    );
}
