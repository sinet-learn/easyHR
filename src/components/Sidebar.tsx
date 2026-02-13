'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Clock,
    Banknote,
    GraduationCap,
    FileText,
    Settings,
    LogOut,
    Network,
    Bell,
    User,
    Globe
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const { language, toggleLanguage, t } = useLanguage();

    const menuItems = [
        { label: t.common.dashboard, href: '/dashboard', icon: LayoutDashboard },
        { label: t.common.employees, href: '/employees', icon: Users },
        { label: 'Organization', href: '/organization', icon: Network },
        { label: t.common.attendance, href: '/attendance', icon: Clock },
        { label: t.common.payroll, href: '/payroll', icon: Banknote },
        { label: t.common.training, href: '/training', icon: GraduationCap },
        { label: t.common.recruitment, href: '/recruitment', icon: FileText },
        { label: t.common.settings, href: '/settings', icon: Settings },
    ];

    return (
        <aside
            className="sidebar flex flex-col h-screen fixed border-r border-[var(--border)] bg-[var(--bg-card)] overflow-hidden"
            style={{
                width: isCollapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)',
                transition: 'width var(--transition-speed) var(--transition-ease)'
            }}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
            aria-label="Main Navigation"
        >
            <div className="flex flex-col h-full">
                {/* Branding */}
                <div className="relative mb-4 px-3 py-4 flex items-center min-h-[72px] border-b border-[var(--border)] overflow-hidden">
                    <div
                        className="flex items-center justify-center bg-indigo-600 rounded-lg text-white font-bold shadow-sm shrink-0 transition-all duration-300"
                        style={{
                            width: '100%',
                            height: '38px',
                            fontSize: isCollapsed ? '10px' : '18px',
                            letterSpacing: isCollapsed ? '-0.02e' : 'normal'
                        }}
                    >
                        EasyHR
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-3 overflow-y-auto scrollbar-hide py-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group/link
                                    ${isActive
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-main)] hover:text-[var(--text-main)]'
                                    }
                                    ${isCollapsed ? 'justify-center px-0' : ''}
                                `}
                                aria-current={isActive ? 'page' : undefined}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-300">
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--text-muted)] group-hover/link:text-indigo-500'}`} aria-hidden="true" />
                                </div>
                                {!isCollapsed && (
                                    <span className="max-w-[140px] truncate animate-in fade-in slide-in-from-left-2 duration-300">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto px-3 py-6 border-t border-[var(--border)] space-y-3">
                    {/* User Profile */}
                    <div className={`flex items-center gap-3 px-3 py-2.5 text-[var(--text-main)] ${isCollapsed ? 'justify-center px-0' : ''}`}>
                        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 transition-all duration-300">
                            <User className="w-5 h-5" />
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0 overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                                <p className="text-xs font-bold leading-none truncate">Admin User</p>
                                <p className="text-[10px] text-[var(--text-muted)] mt-1 truncate">HR Manager</p>
                            </div>
                        )}
                    </div>

                    {/* Notifications */}
                    <button
                        className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-[var(--text-muted)] hover:bg-[var(--bg-main)] hover:text-[var(--text-main)] transition-all ${isCollapsed ? 'justify-center px-0' : ''}`}
                        title={isCollapsed ? "Notifications" : undefined}
                    >
                        <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[var(--bg-card)]"></span>
                        </div>
                        {!isCollapsed && <span className="truncate animate-in fade-in slide-in-from-left-2 duration-300">Notifications</span>}
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-[var(--text-muted)] hover:bg-[var(--bg-main)] hover:text-[var(--text-main)] transition-all ${isCollapsed ? 'justify-center px-0' : ''}`}
                        title={isCollapsed ? (language === 'en' ? 'Khmer' : 'English') : undefined}
                    >
                        <div className="w-9 h-9 flex items-center justify-center shrink-0">
                            <Globe className="w-5 h-5" />
                        </div>
                        {!isCollapsed && <span className="truncate animate-in fade-in slide-in-from-left-2 duration-300">{language === 'en' ? 'English (US)' : 'Khmer (KM)'}</span>}
                    </button>

                    <button
                        className={`
                            group flex items-center gap-3 w-full py-2.5 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50
                            ${isCollapsed ? 'justify-center px-0' : 'px-3'}
                        `}
                        onClick={() => console.log('Signing out...')}
                        aria-label={t.common.signOut}
                        title={isCollapsed ? t.common.signOut : undefined}
                    >
                        <div className="w-9 h-9 flex items-center justify-center shrink-0">
                            <LogOut className="w-5 h-5 opacity-80 group-hover:opacity-100" aria-hidden="true" />
                        </div>
                        {!isCollapsed && (
                            <span className="whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                                {t.common.signOut}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
}
