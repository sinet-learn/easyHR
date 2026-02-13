'use client';
import { Bell, Search, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <header className="header-island" role="banner">
            {/* Contents moved to Sidebar */}
        </header>
    );
}
