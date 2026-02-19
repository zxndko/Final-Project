'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Doctor {
  id?: number;
  name: string;
  role?: string;
  imageSrc?: string;
  specialty?: string;
}

export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/doctors');
      if (!res.ok) {
        console.error('fetchDoctors failed', res.statusText);
        setDoctors([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) setDoctors(data as Doctor[]);
      else if (data && typeof data === 'object') setDoctors([data as Doctor]);
      else setDoctors([]);
    } catch (error) {
      console.error('fetchDoctors error', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (id: number) => {
    if (!confirm('ยืนยันการลบแพทย์คนนี้?')) return;

    await fetch(`/api/doctors/${id}`, {
      method: 'DELETE',
    });

    fetchDoctors();
  };

  const saveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    const body = JSON.stringify({
      name: selected.name,
      specialty: selected.role,
      imageUrl: selected.imageSrc,
    });

    if (selected.id) {
      await fetch(`/api/doctors/${selected.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
    } else {
      await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
    }

    setSelected(null);
    fetchDoctors();
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl">👨‍⚕️</div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-100">
                    Doctor Management
                  </h1>
                </div>
                <p className="text-sky-200 text-lg">จัดการข้อมูลแพทย์ของคลินิก</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected({ name: '' })}
                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-8 py-3 rounded-xl shadow-lg font-semibold flex items-center gap-2 transition-all"
              >
                <span className="text-xl">+</span>
                <span>เพิ่มแพทย์ใหม่</span>
              </motion.button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center"
              >
                <p className="text-sky-200 text-sm font-medium mb-1">ทั้งหมด</p>
                <p className="text-3xl font-bold text-white">{doctors.length}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center"
              >
                <p className="text-sky-200 text-sm font-medium mb-1">ออนไลน์</p>
                <p className="text-3xl font-bold text-emerald-400">{Math.ceil(doctors.length * 0.7)}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center"
              >
                <p className="text-sky-200 text-sm font-medium mb-1">ท่ำที่</p>
                <p className="text-3xl font-bold text-amber-400">{doctors.length > 0 ? '24/7' : 'N/A'}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center"
              >
                <p className="text-sky-200 text-sm font-medium mb-1">ประเมิน</p>
                <p className="text-3xl font-bold text-pink-400">4.8★</p>
              </motion.div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-sky-300 text-xl">🔍</span>
              </div>
              <input
                type="text"
                placeholder="ค้นหาชื่อแพทย์ หรือ ความเชี่ยวชาญ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              />
            </div>
          </motion.div>

          {/* Doctors Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-96 bg-white/10 backdrop-blur-md rounded-2xl"
                ></motion.div>
              ))}
            </div>
          ) : filteredDoctors.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDoctors.map((doc: Doctor) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden transition-all hover:border-white/40"
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="animate-pulse">●</span> Online
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-sky-400 to-purple-400">
                    <img
                      src={
                        doc.imageSrc ||
                        'https://via.placeholder.com/400x300?text=' + encodeURIComponent(doc.name)
                      }
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sky-300 text-sm">🏥</span>
                      <p className="text-sky-200 text-sm font-medium">
                        {doc.specialty || doc.role || 'ไม่ระบุ'}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      <span className="text-sky-200 text-xs ml-2">(98 reviews)</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelected(doc)}
                        className="flex-1 text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400/20 to-amber-500/20 text-amber-300 hover:from-amber-400/30 hover:to-amber-500/30 transition-all font-semibold flex items-center justify-center gap-2 border border-amber-400/30"
                      >
                        <span>✏️</span> แก้ไข
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteDoctor(doc.id!)}
                        className="flex-1 text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-red-400/20 to-red-500/20 text-red-300 hover:from-red-400/30 hover:to-red-500/30 transition-all font-semibold flex items-center justify-center gap-2 border border-red-400/30"
                      >
                        <span>🗑️</span> ลบ
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-sky-300 text-2xl mb-4">ไม่พบแพทย์</p>
              <p className="text-sky-200 mb-6">ลองค้นหาด้วยคำค้นอื่น หรือ เพิ่มแพทย์ใหม่</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected({ name: '' })}
                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-6 py-2 rounded-xl font-semibold"
              >
                + เพิ่มแพทย์
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enhanced Form Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.form
              onSubmit={saveDoctor}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-100 mb-1">
                  {selected.id ? '✏️ แก้ไขข้อมูลแพทย์' : '➕ เพิ่มแพทย์ใหม่'}
                </h2>
                <p className="text-sky-200 text-sm">กรอกข้อมูลแพทย์อย่างละเอียด</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sky-200 text-sm font-medium block mb-2">ชื่อแพทย์ *</label>
                  <input
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-sky-300 focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                    placeholder="เช่น นพ. สมชาย ใจดี"
                    value={selected.name}
                    onChange={(e) =>
                      setSelected({ ...selected, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sky-200 text-sm font-medium block mb-2">ความเชี่ยวชาญ *</label>
                  <input
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-sky-300 focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                    placeholder="เช่น จักษุแพทย์, ศัลยแพทย์ ฯลฯ"
                    value={selected.role || ''}
                    onChange={(e) =>
                      setSelected({ ...selected, role: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sky-200 text-sm font-medium block mb-2">Image URL</label>
                  <input
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-sky-300 focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                    value={selected.imageSrc || ''}
                    onChange={(e) =>
                      setSelected({ ...selected, imageSrc: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setSelected(null)}
                  className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sky-200 font-semibold transition-all border border-white/20"
                >
                  ยกเลิก
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold transition-all shadow-lg"
                >
                  บันทึกข้อมูล
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
