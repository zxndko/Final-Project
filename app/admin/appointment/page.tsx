'use client';

import { useState } from 'react';
import Link from 'next/link';
import HideHeader from '@/components/HideHeader';

interface Appointment {
  id: string;
  patient: string;
  time: string;
}

interface CompletedAppointment extends Appointment {
  status: 'ได้นัดหมาย' | 'ไม่ได้นัดหมาย';
  completedAt: Date;
}

export default function AppointmentPage() {

  // 1️⃣ ข้อมูลตัวอย่าง (อยู่บนสุดใน component)
  const sampleAppointments: Appointment[] = [
    { id: 'A001', patient: 'สมชาย ใจดี', time: '1 พ.ย. 2568, 09:00 น.' },
    { id: 'A002', patient: 'สมหญิง สบาย', time: '1 พ.ย. 2568, 10:00 น.' },
  ];

  // 2️⃣ ✅ STATE ต้องอยู่ตรงนี้ (ถัดจาก sampleAppointments)
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  const [history, setHistory] = useState<CompletedAppointment[]>([]);
  const [selected, setSelected] = useState<Appointment | null>(null);

  // 3️⃣ ฟังก์ชันต่าง ๆ (เช่น เคลียร์นัด)
  const handleClear = (item: Appointment) => {
    setAppointments(prev => prev.filter(a => a.id !== item.id));
    setHistory(prev => [...prev, { ...item, status: 'ไม่ได้นัดหมาย', completedAt: new Date() }]);
    setSelected(null);
  };

  // 4️⃣ JSX ต้องอยู่ใน return เท่านั้น
  return (
    <section className="page-section admin-appointments">
      <HideHeader />

      {/* Header Section */}
      <div className="appointments-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>
                📅 รายการนัดหมายที่จอง
              </h1>
              <p>
                มีทั้งหมด <strong>{appointments.length}</strong> รายการ
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/admin">
                <button className="btn-back">
                  ← กลับ
                </button>
              </Link>
              <Link href="/admin/history">
                <button className="btn-history">
                  📋 ดูประวัติ
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>ไม่มีนัดหมายในขณะนี้</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="appointment-card"
                onClick={() => setSelected(a)}
              >
                <div className="appointment-card-icon">👤</div>
                <h2>
                  {a.patient}
                </h2>
                <p>
                  📅 {a.time}
                </p>
                <p className="code">
                  รหัส: <code>{a.id}</code>
                </p>
                <button>
                  ✓ ดูรายละเอียด
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5️⃣ MODAL (อยู่นอก map) */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                ⚠️ ยืนยันการเคลียร์นัดหมาย
              </h2>
              <button 
                className="modal-close-btn"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="confirmation-message">
                <p>คุณแน่ใจหรือว่าต้องการเคลียร์นัดหมายนี้?</p>
              </div>

              <div className="appointment-details">
                <div className="detail-item">
                  <span className="detail-label">ชื่อผู้รับบริการ:</span>
                  <span className="detail-value">{selected.patient}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">📅 วันและเวลานัด:</span>
                  <span className="detail-value">{selected.time}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">🆔 รหัสนัดหมาย:</span>
                  <span className="detail-value code">{selected.id}</span>
                </div>

                <div className="detail-item warning">
                  <span className="detail-label">⚠️ สถานะ:</span>
                  <span className="detail-value status-cancel">ไม่ได้นัดหมาย</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-modal-cancel"
                onClick={() => setSelected(null)}
              >
                ❌ ยกเลิก
              </button>

              <button
                className="btn-modal-confirm"
                onClick={() => handleClear(selected)}
              >
                ✔️ เคลียร์นัด
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
