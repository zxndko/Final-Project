'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import HideHeader from '@/components/HideHeader';

interface CompletedAppointment {
  id: string;
  patient: string;
  time: string;
  completedAt: Date;
}

export default function HistoryPage() {
  // ข้อมูลประวัติลูกค้า (ในการใช้งานจริง ควรดึงจากDatabase)
  const historyData: CompletedAppointment[] = [
    {
      id: 'A001',
      patient: 'สมชาย ใจดี',
      time: '1 พ.ย. 2568, 09:00 น.',
      completedAt: new Date('2024-11-01T09:30:00')
    },
    {
      id: 'A002',
      patient: 'สมหญิง สบาย',
      time: '1 พ.ย. 2568, 10:00 น.',
      completedAt: new Date('2024-11-01T10:45:00')
    },
    {
      id: 'A003',
      patient: 'วิจิตร มั่นใจ',
      time: '2 พ.ย. 2568, 14:00 น.',
      completedAt: new Date('2024-11-02T14:20:00')
    },
    {
      id: 'A004',
      patient: 'สุชาดา ขยัน',
      time: '2 พ.ย. 2568, 15:30 น.',
      completedAt: new Date('2024-11-02T15:50:00')
    },
  ];

  // State สำหรับฟิลเตอร์
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<string>('');

  // ได้รับรายชื่อลูกค้าที่ไม่ซ้ำกัน
  const uniquePatients = Array.from(new Set(historyData.map(h => h.patient)));

  // ฟิลเตอร์ข้อมูลตามเงื่อนไข
  const filteredData = useMemo(() => {
    return historyData.filter(item => {
      const itemDate = new Date(item.completedAt).toISOString().split('T')[0];
      const matchDate = !selectedDate || itemDate === selectedDate;
      const matchPatient = !selectedPatient || item.patient === selectedPatient;
      return matchDate && matchPatient;
    });
  }, [selectedDate, selectedPatient]);

  return (
    <section className="page-section admin-history">
      <HideHeader />

      <div className="container">
        {/* Header Section */}
        <div className="history-header">
          <div>
            <h1>
              📊 ประวัติการเคลียร์นัด
            </h1>
            <p>
              ดูรายละเอียดการบริการทั้งหมด
            </p>
          </div>
          <Link href="/admin/appointment">
            <button className="btn-back">
              ← กลับไปการนัดหมาย
            </button>
          </Link>
        </div>

        {/* 🔍 ส่วนฟิลเตอร์ */}
        <div className="filter-section">
          <h3>
            🔎 ค้นหาและฟิลเตอร์
          </h3>
          <div className="filter-grid">
            <div className="filter-group">
              <label>
                📅 วันที่เคลียร์:
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>
                👤 ชื่อลูกค้า:
              </label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
              >
                <option value="">-- ทั้งหมด --</option>
                {uniquePatients.map(patient => (
                  <option key={patient} value={patient}>
                    {patient}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn-reset"
              onClick={() => {
                setSelectedDate('');
                setSelectedPatient('');
              }}
            >
              🔄 รีเซ็ต
            </button>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>ยังไม่มีประวัติการเคลียร์นัด</p>
          </div>
        ) : (
          <div className="history-list">
            <div className="history-results">
              <span className="history-results-icon">✅</span>
              <p>
                พบ <strong>{filteredData.length}</strong> รายการ
              </p>
            </div>
            {filteredData.map((item) => (
              <div key={item.id} className="history-card">
                <div className="history-card-grid">
                  <div className="history-card-info">
                    <h3>
                      <span>👤</span>
                      {item.patient}
                    </h3>
                    <p className="label">
                      📅 เวลานัด:
                    </p>
                    <p>
                      {item.time}
                    </p>
                    <p className="label">
                      🆔 รหัส:
                    </p>
                    <p>
                      <code>{item.id}</code>
                    </p>
                  </div>
                  <div className="history-card-completed">
                    <p className="label">
                      ✓ เคลียร์เมื่อ
                    </p>
                    <p className="date">
                      {new Date(item.completedAt).toLocaleString('th-TH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="time">
                      {new Date(item.completedAt).toLocaleString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
