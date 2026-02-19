'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch appointments from localStorage
  useEffect(() => {
    const loadAppointments = () => {
      try {
        const data = JSON.parse(localStorage.getItem('appointments') || '[]');
        setAppointments(data.filter((a: Appointment) => a.status !== 'confirmed'));
      } catch (error) {
        console.error('Failed to load appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const handleClear = (item: Appointment) => {
    if (!confirm('ยืนยันนัดหมายนี้หรือไม่?')) return;
    
    try {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const updated = appointments.map((a: Appointment) =>
        a.id === item.id ? { ...a, status: 'confirmed' } : a
      );
      localStorage.setItem('appointments', JSON.stringify(updated));
      
      setAppointments((prev) => prev.filter((a) => a.id !== item.id));
      setSelected(null);
      alert('บันทึกเรียบร้อย');
    } catch (error) {
      console.error('Update error:', error);
      alert('เกิดข้อผิดพลาด');
    }
  };

  const handleDelete = (item: Appointment) => {
    if (!confirm('ลบนัดหมายนี้หรือไม่?')) return;
    
    try {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const updated = appointments.filter((a: Appointment) => a.id !== item.id);
      localStorage.setItem('appointments', JSON.stringify(updated));
      
      setAppointments((prev) => prev.filter((a) => a.id !== item.id));
      setSelected(null);
      alert('ลบแล้ว');
    } catch (error) {
      console.error('Delete error:', error);
      alert('เกิดข้อผิดพลาด');
    }
  };

  const filteredAppointments = appointments.filter(a =>
    a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.phone.includes(searchTerm) ||
    a.service.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // 4️⃣ JSX ต้องอยู่ใน return เท่านั้น
  return (
    <section className="admin-page">
      <HideHeader />

      {/* Header Section */}
      <div className="admin-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>📅 รายการนัดหมายที่จอง</h1>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.95 }}>
                มีทั้งหมด <strong>{appointments.length}</strong> รายการรอดำเนิน
              </p>
            </div>
            <div className="admin-header-badge">✨ ระบบจัดการนัดหมาย</div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <div className="admin-card-title">📋 รอดำเนิน</div>
                <div className="admin-card-subtitle">{appointments.length} รายการ</div>
              </div>
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <div className="admin-card-title">✅ รอดำเนิน</div>
                <div className="admin-card-subtitle">พร้อมอนุมัติ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-section">
          <h2>📋 รายการทั้งหมด</h2>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <Link href="/admin">
              <button className="admin-btn admin-btn-secondary">
                ← กลับหน้าหลัก
              </button>
            </Link>
            <Link href="/admin/history">
              <button className="admin-btn admin-btn-primary">
                📊 ดูประวัติ
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="admin-section" style={{ textAlign: 'center' }}>
            <p>⏳ กำลังโหลดข้อมูล...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="admin-section" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>ไม่มีนัดหมายที่รอดำเนิน</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {appointments.map((a) => (
              <div
                key={a.id}
                className="admin-list-item"
                onClick={() => setSelected(a)}
                style={{ cursor: 'pointer', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
              >
                <div className="admin-list-item-info">
                  <div className="admin-list-item-name">👤 {a.patient}</div>
                  <div className="admin-list-item-detail">
                    📅 {a.date} ⏰ {a.time} | 🐾 {a.petName} ({a.petType})
                  </div>
                  <div className="admin-list-item-detail">
                    📞 {a.phone} | 🏥 {a.service}
                  </div>
                </div>
                <span className="admin-status-badge admin-status-pending">รอดำเนิน</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🔍 รายละเอียดนัดหมาย</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="admin-card">
                  <div><strong>👤 ชื่อผู้จอง:</strong> {selected.patient}</div>
                  <div style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>📞 {selected.phone}</div>
                </div>

                <div className="admin-card">
                  <div><strong>📅 วันที่:</strong> {selected.date}</div>
                  <div><strong>⏰ เวลา:</strong> {selected.time}</div>
                </div>

                <div className="admin-card">
                  <div><strong>🏥 บริการ:</strong> {selected.service}</div>
                  <div><strong>🐾 สัตว์เลี้ยง:</strong> {selected.petName} ({selected.petType})</div>
                </div>

                <div className="admin-card">
                  <div><strong>📝 หมายเหตุ:</strong> {selected.notes || 'ไม่มี'}</div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="admin-btn admin-btn-secondary"
                onClick={() => setSelected(null)}
              >
                ❌ ยกเลิก
              </button>

              <button

                className="btn-modal-confirm"
                onClick={() => handleClear(selected)}
              >
                ✔️ ยืนยันนัดหมาย
              </button>

              <button
                className="btn-modal-delete appointment-delete-btn"
                onClick={() => handleDelete(selected)}
              >
                🗑️ ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
