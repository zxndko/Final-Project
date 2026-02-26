'use client';

import { useEffect, useState } from 'react';
import HideHeader from '@/components/HideHeader';
import HideFooter from '@/components/HideFooter';
import AdminSidebar from '@/components/AdminSidebar';

interface RecentAppointment {
  id: number;
  petName: string;
  petType: string;
  date: string;
  time: string;
  status: string;
}

interface DayAppointment {
  id: number;
  petName: string;
  owner: string;
  time: string;
  status: string;
}

interface WeekDay {
  day: string;
  date: string;
  count: number;
  appointments: DayAppointment[];
}

interface DashboardData {
  totalAppointments: number;
  confirmedVisits: number;
  pendingRequests: number;
  activeDoctors: number;
  recentAppointments: RecentAppointment[];
  weeklyActivity: WeekDay[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return '#10b981';
    case 'cancelled': return '#ef4444';
    default: return '#f59e0b';
  }
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const maxCount = data?.weeklyActivity?.length
    ? Math.max(...data.weeklyActivity.map((w) => w.count), 1)
    : 1;

  return (
    <div className="admin-layout">
      <HideHeader />
      <div className="admin-container-new">
        <AdminSidebar />

        <div className="admin-content-new">
          <div className="admin-header-new">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back to PawPlan Clinic overview.</p>
            </div>
          </div>

          {loading ? (
            <div className="table-empty">⏳ กำลังโหลดข้อมูล...</div>
          ) : data ? (
            <>
              {/* Stat Cards */}
              <div className="stats-grid-new" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card-new stat-green">
                  <div className="stat-top">
                    <div className="stat-label-text">Total Appointments</div>
                    <div className="stat-icon-new">📅</div>
                  </div>
                  <div className="stat-value-new">{data.totalAppointments}</div>
                  <div className="stat-desc-new">All time records</div>
                </div>
                <div className="stat-card-new stat-blue">
                  <div className="stat-top">
                    <div className="stat-label-text">Confirmed Visits</div>
                    <div className="stat-icon-new">👤</div>
                  </div>
                  <div className="stat-value-new">{data.confirmedVisits}</div>
                  <div className="stat-desc-new">Upcoming scheduled visits</div>
                </div>
                <div className="stat-card-new stat-orange">
                  <div className="stat-top">
                    <div className="stat-label-text">Pending Requests</div>
                    <div className="stat-icon-new">⏱️</div>
                  </div>
                  <div className="stat-value-new">{data.pendingRequests}</div>
                  <div className="stat-desc-new">Requires confirmation</div>
                </div>
                <div className="stat-card-new stat-green">
                  <div className="stat-top">
                    <div className="stat-label-text">Active Doctors</div>
                    <div className="stat-icon-new">⚡</div>
                  </div>
                  <div className="stat-value-new">{data.activeDoctors}</div>
                  <div className="stat-desc-new">Available specialists</div>
                </div>
              </div>

              {/* Charts + Recent */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                {/* Weekly Activity Bar Chart */}
                <div className="stat-card-new">
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                    Weekly Activity
                  </div>

                  {/* แท่งกราฟ */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 130 }}>
                    {(data.weeklyActivity ?? []).map((w, idx) => (
                      <div
                        key={w.day}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                        onMouseEnter={() => setHoveredDay(idx)}
                        onMouseLeave={() => setHoveredDay(null)}
                      >
                        {/* Tooltip */}
                        {hoveredDay === idx && (
                          <div style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            marginBottom: 8,
                            background: '#1e293b',
                            color: 'white',
                            borderRadius: 10,
                            padding: '10px 14px',
                            minWidth: 180,
                            zIndex: 999,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            pointerEvents: 'none',
                          }}>
                            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 4 }}>
                              {w.day} {w.date} · {w.count} นัด
                            </div>
                            {w.appointments.length === 0 ? (
                              <div style={{ fontSize: 12, color: '#94a3b8' }}>ไม่มีนัดหมาย</div>
                            ) : (
                              w.appointments.map((a) => (
                                <div key={a.id} style={{ fontSize: 12, marginTop: 4, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                                  <span>🐾 {a.petName} ({a.owner})</span>
                                  <span style={{ color: getStatusColor(a.status), fontWeight: 600 }}>{a.time}</span>
                                </div>
                              ))
                            )}
                            {/* ลูกศรชี้ลง */}
                            <div style={{
                              position: 'absolute',
                              bottom: -6,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: 0,
                              height: 0,
                              borderLeft: '6px solid transparent',
                              borderRight: '6px solid transparent',
                              borderTop: '6px solid #1e293b',
                            }} />
                          </div>
                        )}

                        {/* แท่ง */}
                        <div
                          style={{
                            width: '100%',
                            backgroundColor: hoveredDay === idx ? '#5aa886' : '#7fb8ad',
                            borderRadius: '4px 4px 0 0',
                            height: `${(w.count / maxCount) * 110 + 10}px`,
                            transition: 'height 0.4s ease, background-color 0.2s ease',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Labels: วัน + วันที่ */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    {(data.weeklyActivity ?? []).map((w) => (
                      <div key={w.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{w.day}</span>
                        <span style={{ fontSize: 10, color: '#9ca3af' }}>{w.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Appointments */}
                <div className="stat-card-new">
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
                    Recent Appointments
                  </div>
                  {(data.recentAppointments ?? []).length === 0 ? (
                    <div className="table-empty">ยังไม่มีนัดหมาย</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {(data.recentAppointments ?? []).map((appt) => (
                        <div
                          key={appt.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 14px',
                            borderRadius: 10,
                            background: '#f9fafb',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>
                              {appt.petName} ({appt.petType})
                            </div>
                            <div style={{ fontSize: 12, color: '#9ca3af' }}>
                              {appt.date}, {appt.time}
                            </div>
                          </div>
                          <span
                            className="status-badge"
                            style={{
                              backgroundColor: `${getStatusColor(appt.status)}20`,
                              color: getStatusColor(appt.status),
                            }}
                          >
                            {appt.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </>
          ) : (
            <div className="table-empty">❌ ไม่สามารถโหลดข้อมูลได้</div>
          )}
        </div>
      </div>
      <HideFooter />
    </div>
  );
}
