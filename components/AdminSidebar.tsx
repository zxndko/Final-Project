'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Calendar, FileText, Stethoscope, BookOpen, LogOut } from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, href: '/admin/appointment' },
    { id: 'history', label: 'History', icon: FileText, href: '/admin/history' },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope, href: '/admin/doctors' },
    { id: 'content', label: 'Content', icon: BookOpen, href: '/admin/content' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="admin-sidebar-new">

            {/* Brand */}
            <div className="sidebar-brand">
                <div className="brand-circle">🐾</div>
                <div>
                    <div className="brand-name">Pawplan</div>
                    <div className="brand-desc">Vet Clinic Admin</div>
                </div>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                        >
                            <Icon size={18} className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <button className="sidebar-logout" onClick={() => router.push('/')}>
                <div className="sidebar-logout-icon">
                    <LogOut size={18} />
                </div>
                <div>
                    <span className="sidebar-logout-title">ออกจากระบบ</span>
                    <span className="sidebar-logout-sub">คลิกเพื่อออกจากระบบ</span>
                </div>
            </button>

        </div>
    );
}