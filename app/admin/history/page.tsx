'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HideHeader from '@/components/HideHeader';

interface Appointment {
  id: number;
  patient: string;
  service: string;
  date: string;
  time: string;
  owner: string;
  phone: string;
  petName: string;
  petType: string;
  notes?: string;
  status?: string;
  createdAt?: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Appointment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const data = JSON.parse(localStorage.getItem('appointments') || '[]');
        const confirmed = data.filter((a: Appointment) => a.status === 'confirmed');
        setHistory(confirmed);
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  const patients = [...new Set(history.map((a) => a.patient))];
  const filteredHistory = history.filter((a) => {
    const matchDate = !selectedDate || a.date === selectedDate;
    const matchPatient = !selectedPatient || a.patient === selectedPatient;
    return matchDate && matchPatient;
  });

  return (
    <section className="admin-page">
      <HideHeader />

      <div className="admin-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>📊 ประวัติการนัดหมาย</h1>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.95 }}>
                ทั้งหมด <strong>{history.length}</strong> รายการ
              </p>
            </div>
            <div className="admin-header-badge">✅ การนัดหมายที่สำเร็จ</div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Filter Section */}
        <div className="admin-section">
          <h2>🔍 ตัวกรอง</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <strong>📅 ค้นหาตามวันที่:</strong>
              <input
                type="date"
                className="history-date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button
                onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                className="admin-btn admin-btn-primary"
              >
                วันนี้
              </button>
            </label>
            <Link href="/admin">
              <button className="admin-btn admin-btn-secondary">
                ← กลับหน้าหลัก
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="admin-section" style={{ textAlign: 'center' }}>
            <p>⏳ กำลังโหลดข้อมูล...</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="admin-section" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>ไม่มีข้อมูลการจองในวันที่นี้</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            {/* Patients List Section */}
            <div className="admin-section">
              <h3>👥 รายชื่อผู้จอง</h3>
              <div className="admin-list">
                <button
                  onClick={() => setSelectedPatient('')}
                  className={`admin-list-item ${selectedPatient === '' ? 'active' : ''}`}
                >
                  ทั้งหมด ({filteredHistory.length})
                </button>
                {[...new Set(filteredHistory.map((a) => a.patient))].map((patient) => {
                  const count = filteredHistory.filter((a) => a.patient === patient).length;
                  return (
                    <button
                      key={patient}
                      onClick={() => setSelectedPatient(patient)}
                      className={`admin-list-item ${selectedPatient === patient ? 'active' : ''}`}
                      style={{ padding: '0.75rem 1rem', textAlign: 'left' }}
                    >
                      <span><strong>{patient}</strong></span>
                      <span className="admin-status-badge admin-status-confirmed">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details Section */}
            <div className="admin-section">
              <h3>📅 รายละเอียด</h3>
              {selectedPatient ? (
                <div className="admin-list">
                  {filteredHistory
                    .filter((a) => a.patient === selectedPatient)
                    .map((appt) => (
                      <div key={appt.id} className="admin-card" style={{ marginBottom: '1rem' }}>
                        <div><strong>🏥 บริการ:</strong> <span style={{ float: 'right' }}>{appt.service}</span></div>
                        <div style={{ marginTop: '0.5rem' }}><strong>📅 วันเวลา:</strong> <span style={{ float: 'right' }}>{appt.date} @ {appt.time}</span></div>
                        <div style={{ marginTop: '0.5rem' }}><strong>🐾 สัตว์:</strong> <span style={{ float: 'right' }}>{appt.petName} ({appt.petType})</span></div>
                        <div style={{ marginTop: '0.5rem' }}><strong>📞 เบอร์:</strong> <span style={{ float: 'right' }}>{appt.phone}</span></div>
                        {appt.notes && <div style={{ marginTop: '0.5rem' }}><strong>📝 หมายเหตุ:</strong> <span style={{ float: 'right' }}>{appt.notes}</span></div>}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="history-appointments-grid">
                  {filteredHistory.map((appt) => (
                    <div
                      key={appt.id}
                      className="history-appointment-card"
                    >
                      <div><strong>👤 ชื่อ:</strong> {appt.patient}</div>
                      <div><strong>🏥 บริการ:</strong> {appt.service}</div>
                      <div><strong>📅 เวลา:</strong> {appt.time}</div>
                      <div><strong>🐾 สัตว์:</strong> {appt.petName} ({appt.petType})</div>
                      <div><strong>📞 เบอร์:</strong> {appt.phone}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
