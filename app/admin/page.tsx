// app/admin/page.tsx
'use client';
import HideHeader from '@/components/HideHeader';
import HideFooter from '@/components/HideFooter';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminPanelPage() {

    const stats = [
        { label: 'Total Appointments', value: '3', desc: 'All time records', icon: '📅', color: 'stat-blue' },
        { label: 'Confirmed Visits', value: '2', desc: 'Upcoming scheduled visits', icon: '👤', color: 'stat-green' },
        { label: 'Pending Requests', value: '1', desc: 'Requires confirmation', icon: '⏱️', color: 'stat-orange' },
        { label: 'Active Doctors', value: '2', desc: 'Available specialists', icon: '⚡', color: 'stat-blue' },
    ];

    const recentAppointments = [
        { pet: 'Bella (Rabbit)', date: 'Feb 12, 3:44 PM', status: 'confirmed', color: '#10b981' },
        { pet: 'Luna (Cat)', date: 'Feb 11, 3:44 PM', status: 'confirmed', color: '#10b981' },
        { pet: 'Max (Dog)', date: 'Feb 10, 3:44 PM', status: 'pending', color: '#f59e0b' },
    ];

    return (
        <div className="admin-layout">
            <HideHeader />
            <div className="admin-container-new">

                <AdminSidebar />

                {/* ===== MAIN CONTENT ===== */}
                <div className="admin-content-new">

                    <div className="admin-header-new">
                        <div>
                            <h1>Dashboard</h1>
                            <p>Welcome back to PawPan Clinic overview.</p>
                        </div>
                    </div>

                    <div className="stats-grid-new">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`stat-card-new ${stat.color}`}>
                                <div className="stat-top">
                                    <div className="stat-label-text">{stat.label}</div>
                                    <div className="stat-icon-new">{stat.icon}</div>
                                </div>
                                <div className="stat-value-new">{stat.value}</div>
                                <div className="stat-desc-new">{stat.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div className="charts-section">
                        <div className="chart-container">
                            <h3>Weekly Activity</h3>
                            <div className="simple-chart">
                                <div className="chart-bar" style={{ height: '40%' }}></div>
                                <div className="chart-bar" style={{ height: '65%' }}></div>
                                <div className="chart-bar" style={{ height: '50%' }}></div>
                                <div className="chart-bar" style={{ height: '55%' }}></div>
                                <div className="chart-bar" style={{ height: '75%' }}></div>
                                <div className="chart-bar" style={{ height: '35%' }}></div>
                                <div className="chart-bar" style={{ height: '30%' }}></div>
                            </div>
                            <div className="chart-labels">
                                <span>Mon</span><span>Tue</span><span>Wed</span>
                                <span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>

                        <div className="appointments-container">
                            <h3>Recent Appointments</h3>
                            <div className="appointments-list">
                                {recentAppointments.map((apt, idx) => (
                                    <div key={idx} className="appointment-item">
                                        <div className="apt-left">
                                            <div className="apt-pet">{apt.pet}</div>
                                            <div className="apt-date">{apt.date}</div>
                                        </div>
                                        <span
                                            className="admin-status-badge"
                                            style={{ background: `${apt.color}20`, color: apt.color }}
                                        >
                                            {apt.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <HideFooter />
        </div>
    );
}