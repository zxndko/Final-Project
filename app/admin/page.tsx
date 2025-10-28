// app/admin/page.tsx
import Link from 'next/link';

export default function AdminPanelPage() {
    return (
        <section className="admin-dashboard">
            <div className="container">
                <h1>ยินดีต้อนรับสู่ Admin Panel</h1>
                <p>เข้าสู่ระบบด้วยสิทธิ์ผู้ดูแลระบบเรียบร้อยแล้ว</p>

                <div className="admin-actions">
                    <Link href="/admin/appointment" className="action-card">
                        <h3>จัดการนัดหมาย</h3>
                        <p>ดูและอนุมัติการจองนัดหมาย</p>
                    </Link>
                    <div className="action-card">
                        <h3>จัดการบัญชีผู้ใช้</h3>
                        <p>เพิ่ม แก้ไข หรือลบข้อมูลหมอ</p>
                    </div>
                    <div className="action-card">
                        <h3>จัดการหน้าเว็บไซต์</h3>
                        <p>เพิ่ม แก้ไข ลบ หรืออัพเดทข้อมูล</p>
                    </div>
                </div>
                
                <div style={{ marginTop: '50px' }}>
                    <Link href="/" className="cta-button big-cta">ออกจากระบบ</Link>
                </div>
            </div>
        </section>
    );
}