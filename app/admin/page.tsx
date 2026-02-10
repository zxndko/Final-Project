// app/admin/page.tsx
'use client';
import Link from 'next/link';
import HideHeader from '@/components/HideHeader';

export default function AdminPanelPage() {
    // สถิติตัวอย่าง
    const stats = [
        { label: 'นัดหมายวันนี้', value: '5', icon: '📅', color: 'stat-blue' },
        { label: 'นัดหมายรอดำเนิน', value: '12', icon: '⏳', color: 'stat-orange' },
        { label: 'เสร็จแล้ว', value: '48', icon: '✅', color: 'stat-green' },
        { label: 'แพทย์ทั้งหมด', value: '8', icon: '👨‍⚕️', color: 'stat-red' },
    ];

    const menuItems = [
        {
            title: '📋 จัดการนัดหมาย',
            description: 'ดูและอนุมัติการจองนัดหมายจากผู้ใช้',
            href: '/admin/appointment',
            icon: '📅',
            color: 'bg-blue-500'
        },
        {
            title: '👨‍⚕️ จัดการบัญชีหมอ',
            description: 'เพิ่ม แก้ไข หรือลบข้อมูลแพทย์สัตวแพทย์',
            href: '/admin/docters',
            icon: '💊',
            color: 'bg-purple-500'
        },
    ];

    return (
        <section className="admin-dashboard page-animate">
            <HideHeader />
            
            {/* Header Section */}
            <div className="admin-dashboard-header page-header">
                <div className="container">
                    <div className="admin-header-content">
                        <div>
                            <h1>🏥 Admin Panel</h1>
                            <p>ยินดีต้อนรับสู่ศูนย์บริหารคลินิก Pawplan</p>
                        </div>
                        <div className="admin-header-badge">
                            <span>🔐 ผู้ดูแลระบบ</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Statistics Section */}
                <div className="stats-section">
                    <h2>📊 สถิติรวม</h2>
                    <div className="stats-grid">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`stat-card ${stat.color}`}>
                                <div className="stat-card-content">
                                    <div className="stat-card-icon">{stat.icon}</div>
                                    <div className="stat-card-info">
                                        <div className="stat-card-value">{stat.value}</div>
                                        <div className="stat-card-label">{stat.label}</div>
                                    </div>
                                </div>
                                <div className="stat-card-decoration"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu Section */}
                <div className="admin-menu-section">
                    <h2>🎯 การจัดการหลัก</h2>
                    <p className="menu-section-desc">เลือกฟีเจอร์ที่ต้องการจัดการ</p>
                    <div className="menu-grid">
                        {menuItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="menu-card-wrapper"
                            >
                                <div className="menu-card">
                                    <div className="menu-card-header">
                                        <div className="menu-card-icon">{item.icon}</div>
                                        <h3>{item.title}</h3>
                                    </div>
                                    <p className="menu-card-desc">{item.description}</p>
                                    <div className="menu-card-action">
                                        <span>เข้าสู่ระบบ</span>
                                        <span className="arrow">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Info */}
                <div className="admin-info-section">
                    <div className="info-card">
                        <div className="info-card-icon">ℹ️</div>
                        <div className="info-card-content">
                            <h3>เคล็ดลับการใช้งาน</h3>
                            <ul>
                                <li>ตรวจสอบนัดหมายใหม่ทุกวัน</li>
                                <li>อัปเดตข้อมูลแพทย์อย่างสม่ำเสมอ</li>
                                <li>ดูประวัติการจองเพื่อติดตามลูกค้า</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="admin-footer">
                    <p>
                        © 2568 ระบบจัดการคลินิกสัตว์เลี้ยง Pawplan | สัตวแพทย์เพื่อความสุขของเพื่อนรัก
                    </p>
                </div>
            </div>
        </section>
    );
}