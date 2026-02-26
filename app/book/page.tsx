// app/book/page.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BookPage() {
    const router = useRouter();
    // สร้าง state สำหรับฟอร์ม
    const [formData, setFormData] = useState({
        service: '',
        otherService: '',
        date: '',
        time: '',
        owner: '',
        phone: '',
        petName: '',
        notes: '',
        petType: '',         
        otherPetType: ''     
    });
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [summary, setSummary] = useState('');

    // จัดการการเปลี่ยนแปลงของ input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const service = formData.service === 'อื่นๆ' ? 
            (formData.otherService || 'อื่นๆ (ไม่ได้ระบุ)') : 
            formData.service;

        const petType = formData.petType === 'อื่นๆ' ?
            (formData.otherPetType || 'อื่นๆ (ไม่ได้ระบุ)') :
            formData.petType;

        const summaryHTML = `
            **บริการ:** ${service}
            **วันที่/เวลา:** ${formData.date} เวลา ${formData.time}
            **ชื่อเจ้าของ:** ${formData.owner} (เบอร์: ${formData.phone})
            **ชื่อสัตว์เลี้ยง:** ${formData.petName}
            **ประเภทสัตว์เลี้ยง:** ${petType}
            **รายละเอียดเพิ่มเติม:** ${formData.notes || 'ไม่มี'}
        `;
        
        setSummary(summaryHTML.trim());
        setIsConfirmed(true);
    };

const handleConfirm = async () => {
    const service = formData.service === 'อื่นๆ' ? formData.otherService : formData.service;
    const petType = formData.petType === 'อื่นๆ' ? formData.otherPetType : formData.petType;

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient: formData.owner,
          service,
          date: formData.date,
          time: formData.time,
          owner: formData.owner,
          phone: formData.phone,
          petName: formData.petName,
          petType,
          notes: formData.notes || '',
          status: 'pending',
        }),
      });

      if (res.ok) {
        alert('บันทึกนัดหมายสำเร็จ!');
        router.push('/');
      } else {
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      console.error('Confirm error:', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
};

    return (
        <main className="content-section booking-page page-animate">
            <div className="container">
                <h2 className="form-title page-title">📅 กรอกรายละเอียดจองนัดหมาย</h2>

                <div className="booking-form-wrapper page-content">
                    <form id="bookingForm" 
                          onSubmit={handleSubmit} 
                          className={isConfirmed ? 'booking-form-hidden' : 'booking-form-visible'}>
                        <fieldset className="form-group">
                            <legend>ข้อมูลการนัดหมาย</legend>
                            <div className="form-row-2">
                                <label>
                                    ประเภทบริการ *
                                    <select 
                                        id="service" 
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">กรุณาเลือกบริการ</option>
                                        <option value="ตรวจสุขภาพทั่วไป">ตรวจสุขภาพทั่วไป</option>
                                        <option value="ฉีดวัคซีน">ฉีดวัคซีน</option>
                                        <option value="ทำหมัน">ทำหมัน</option>
                                        <option value="อื่นๆ">อื่นๆ</option>
                                    </select>
                                </label>
                                {formData.service === 'อื่นๆ' && (
                                    <div>
                                        <label>
                                            โปรดระบุบริการ *
                                            <input 
                                                type="text"
                                                id="otherService"
                                                value={formData.otherService}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="form-row-2">
                                <label>
                                    วันที่ *
                                    <input 
                                        type="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    เวลา *
                                    <input 
                                        type="time"
                                        id="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>

                            <div className="form-row-2">
                                <label>
                                    ชื่อเจ้าของ *
                                    <input 
                                        type="text"
                                        id="owner"
                                        value={formData.owner}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    เบอร์โทรศัพท์ *
                                    <input 
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>

                            <label>
                                ชื่อสัตว์เลี้ยง *
                                <input 
                                    type="text"
                                    id="petName"
                                    value={formData.petName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <div className="form-row-2">
                                <label>
                                    ประเภทสัตว์เลี้ยง *
                                    <select 
                                        id="petType" 
                                        value={formData.petType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">กรุณาเลือกประเภท</option>
                                        <option value="สุนัข">สุนัข</option>
                                        <option value="แมว">แมว</option>
                                        <option value="กระต่าย">กระต่าย</option>
                                        <option value="อื่นๆ">อื่นๆ</option>
                                    </select>
                                </label>
                                {formData.petType === 'อื่นๆ' && (
                                    <label>
                                        โปรดระบุประเภทสัตว์เลี้ยง *
                                        <input 
                                            type="text"
                                            id="otherPetType"
                                            value={formData.otherPetType}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                )}
                            </div>

                            <label>
                                รายละเอียดเพิ่มเติม *
                                <input 
                                    type="text"
                                    id="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </fieldset>
                        
                        <div className="form-actions">
                            <button type="submit" className="cta-button big-cta main-action">
                                ยืนยันจอง
                            </button>
                            <Link href="/appointment" className="cta-button big-cta secondary-action">
                                ยกเลิก
                            </Link>
                        </div>
                    </form>
                </div>

                <div 
                    className={isConfirmed ? 'confirmation-box-visible' : 'confirmation-box-hidden'}
                >
                    <h3>✅ ยืนยันการจองเรียบร้อย!</h3>
                    <p>ทีมงานจะติดต่อกลับเพื่อยืนยันรายละเอียดนัดหมายอีกครั้ง</p>
                    <pre dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br>') }}></pre>
                    <div className="form-actions">
                        <button 
                            onClick={handleConfirm}
                            className="cta-button big-cta"
                        >
                            ยืนยันและบันทึก
                        </button>
                        <button 
                            onClick={() => setIsConfirmed(false)}
                            className="btn-back"
                        >
                            ← แก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}