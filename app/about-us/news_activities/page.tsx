// app/about_us/news_activities/page.js

'use client'; // จำเป็นต้องใช้ Client Component เพื่อจัดการ state

import { useState } from 'react';
import Image from 'next/image';
import NewsCard from '@/components/NewsCard';
import Modal from '@/components/NewsModal';

export default function NewsActivitiesPage() {

    const [openModal, setOpenModal] = useState<null | 'modal-1' | 'modal-2' | 'modal-3' | 'modal-4' | 'modal-5' | 'modal-6'>(null);

    return (
        <>
            <section className="content-section news-page page-animate">
                <div className="container">
                    <h2 className="page-title">🔔 ข่าวสารและกิจกรรม</h2>
                    <div className="divider"></div>
                    <div className="section-deco">
                        <span className="decorative-bar" aria-hidden="true" />
                    </div>
                    <div className="news-container">
                        <div className="news-grid page-content">

                            {/* ข่าวที่ 1 */}
                            <NewsCard
                                imgSrc="/assets/ข่าวสารและกิจกรรม_1.png"
                                imgAlt="รูปภาพประกอบข่าวที่ 1"
                                title='Pawplan คลินิก เปิดตัว "Smart Pet Care" นวัตกรรมใหม่'
                                description="โรงพยาบาลสัตว์ Pawplan ยกระดับมาตรฐานการรักษาสัตว์เลี้ยง สู่ 'The Best Outcome' ด้วยการผสมผสานความเชี่ยวชาญของทีมสัตวแพทย์กับสุดยอดเทคโนโลยี..."
                                onOpen={() => setOpenModal('modal-1')}
                            />

                            {/* ข่าวที่ 2 */}
                            <NewsCard
                                imgSrc="/assets/ข่าวสารและกิจกรรม_2.png"
                                imgAlt="รูปภาพประกอบข่าวที่ 2"
                                title='ขอเชิญร่วมงาน "Pawplan Groomer" เฟ้นหาสุดยอดช่างตัดขน'
                                description="เปิดรับสมัครแล้ววันนี้! การประกวดตัดขนสุนัข ชิงถ้วยรางวัลเกียรติยศและเงินรางวัลมากมาย..."
                                onOpen={() => setOpenModal('modal-2')}
                            />

                            {/* ข่าวที่ 3 */}
                            <NewsCard
                                imgSrc="/assets/ข่าวสารและกิจกรรม_3.png"
                                imgAlt="รูปภาพประกอบข่าวที่ 3"
                                title="ทีมสัตวแพทย์ Pawplan รับมอบเกียรติบัตร 'คลินิกมาตรฐาน'"
                                description="ตอกย้ำความมุ่งมั่นในการให้บริการที่เป็นเลิศและมีคุณภาพ ปลอดภัยสำหรับสัตว์เลี้ยงทุกตัว..."
                                onOpen={() => setOpenModal('modal-3')}
                            />

                            {/* ข่าวที่ 4 */}
                            <NewsCard
                                imgSrc="/assets/ข่าวสารและกิจกรรม_4.png"
                                imgAlt="กิจกรรมบริจาคโลหิตสัตว์เลี้ยง"
                                title='Pawplan ชวนบริจาคโลหิต "ต่อชีวิตให้เพื่อน"'
                                description="โครงการธนาคารเลือดสำหรับสัตว์เลี้ยง เชิญชวนเจ้าของพาสัตว์เลี้ยงสุขภาพดี น้ำหนักเกิน 20 กก. มาร่วมบริจาค..."
                                onOpen={() => setOpenModal('modal-4')}
                            />

                            {/* ข่าวที่ 5 */}
                            <NewsCard
                                imgSrc="/assets/ข่าวสารและกิจกรรม_5.png"
                                imgAlt="โปรแกรมตรวจสุขภาพสัตว์เลี้ยงประจำปี"
                                title="เริ่มแล้ว! โปรแกรมตรวจสุขภาพประจำปี 2568"
                                description="เพราะการป้องกันดีกว่ารักษา เริ่มต้นปีใหม่ด้วยสุขภาพที่ดีของน้องๆ กับแพ็กเกจตรวจสุขภาพในราคาพิเศษ..."
                                onOpen={() => setOpenModal('modal-5')}
                            />

                            {/* ข่าวที่ 6 */}
                            <NewsCard
                                imgSrc="/assets/ข่าวสารและกิจกรรม_6.png"
                                imgAlt="ศูนย์กายภาพบำบัดสัตว์เลี้ยง Pawplan"
                                title="เปิดแล้ว! ศูนย์กายภาพบำบัดและธาราบำบัด"
                                description="ดูแลสัตว์เลี้ยงหลังผ่าตัด หรือมีปัญหาข้อกระดูก ด้วยสระว่ายน้ำระบบเกลือและลู่วิ่งใต้น้ำ โดยผู้เชี่ยวชาญ..."
                                onOpen={() => setOpenModal('modal-6')}
                            />

                        </div>
                    </div>
                </div>
            </section>

            {/* ส่วนของ Modals
        จะแสดงผลแบบมีเงื่อนไข (Conditional Rendering)
        เฉพาะ Modal ที่ตรงกับ state 'openModal' เท่านั้น
      */}

            {openModal === 'modal-1' && (
                <Modal onClose={() => setOpenModal(null)}>

                    <Image src="/assets/ข่าวสารและกิจกรรม_1.png" alt="รูปภาพประกอบข่าวที่ 1" width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                    <h2>Pawplan คลินิก เปิดตัว "Smart Pet Care" นวัตกรรมใหม่</h2>
                    <p>โรงพยาบาลสัตว์ Pawplan มุ่งมั่นยกระดับมาตรฐานการรักษาสัตว์เลี้ยง สู่ "The Best Outcome" ด้วยการผสมผสานความเชี่ยวชาญของทีมสัตวแพทย์กับสุดยอดเทคโนโลยี</p>
                    <p><strong>เทคโนโลยี AI ช่วยวิเคราะห์โรค:</strong> เพิ่มความแม่นยำในการวินิจฉัยตั้งแต่เริ่มต้น ทำให้การรักษาเป็นไปอย่างรวดเร็วและตรงจุด เพื่อผลลัพธ์ที่ดีที่สุดต่อสัตว์เลี้ยงที่คุณรัก</p>
                    <p><strong>ระบบจัดการคิวอัจฉริยะ (Smart Queue System):</strong> ออกแบบมาเพื่อลดเวลารอคอยอย่างมีประสิทธิภาพ คุณจึงมั่นใจได้ว่าสัตว์เลี้ยงจะได้รับการดูแลอย่างทันท่วงที ไม่ต้องรอนานให้เกิดความเครียด</p>
                    <p>Pawplan เราให้ความสำคัญกับการดูแลแบบองค์รวม ทั้งการรักษาที่ทันสมัย และการมอบประสบการณ์ที่สะดวกสบาย ไร้กังวล สำหรับทั้งสัตว์เลี้ยงและเจ้าของ</p>
                </Modal>
            )}

            {openModal === 'modal-2' && (
                <Modal onClose={() => setOpenModal(null)}>
                    <Image src="/assets/ข่าวสารและกิจกรรม_2.png" alt="รูปภาพประกอบข่าวที่ 2" width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                    <h2>ขอเชิญร่วมงาน "Pawplan Groomer" เฟ้นหาสุดยอดช่างตัดขน</h2>
                    <div className="modal-body-content">
                        <ul>
                            <li><span className="highlight-bold">ชิงถ้วยรางวัลเกียรติยศ</span> และเงินรางวัลรวมมูลค่า <span className="prize-money highlight-extra-bold">กว่า 100,000 บาท</span> พร้อมของรางวัลสุดพิเศษจากสปอนเซอร์</li>
                            <li><span className="highlight-bold">โอกาสครั้งสำคัญ!</span> ยกระดับฝีมือสู่มาตรฐานสากล โดยมีคณะกรรมการผู้ทรงคุณวุฒิจาก [ระบุประเทศ/สถาบัน ถ้ามี] มาเป็นผู้ตัดสิน</li>
                            <li><span className="highlight-bold">เปิดรับสมัครหลากหลายประเภท:</span> ไม่ว่าคุณจะเป็นมือใหม่ (Novice) หรือมืออาชีพ (Open Class) ก็มีเวทีให้คุณได้แสดงศักยภาพอย่างเต็มที่</li>
                            <li><span className="highlight-bold">สุดยอดกิจกรรม Workshop:</span> พบกับกรูมเมอร์ชื่อดัง ที่จะมาถ่ายทอดเทคนิคการตัดแต่งขนแบบเจาะลึก พร้อมเคล็ดลับการดูแลสุนัขแต่ละสายพันธุ์</li>
                        </ul>
                        <p className="call-to-action"><span className="highlight-bold">มาร่วมสร้างสรรค์ศิลปะบนเรือนร่างสุนัข และก้าวสู่การเป็นแชมป์แห่งปีไปด้วยกัน!</span></p>
                    </div>
                </Modal>
            )}

            {openModal === 'modal-3' && (
                <Modal onClose={() => setOpenModal(null)}>
                    <Image src="/assets/ข่าวสารและกิจกรรม_3.png" alt="รูปภาพประกอบข่าวที่ 3" width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                    <h2>ทีมสัตวแพทย์ Pawplan รับมอบเกียรติบัตร "คลินิกมาตรฐาน"</h2>
                    <div className="modal-body-content">
                        <p>ตอกย้ำความมุ่งมั่นในการให้บริการที่เป็นเลิศและมีคุณภาพ ปลอดภัยสำหรับสัตว์เลี้ยงทุกตัว</p>
                        <ul>
                            <li>
                                <span>การันตีคุณภาพและความปลอดภัย:</span> เกียรติบัตรนี้เป็นเครื่องยืนยันว่า Pawplan
                                ผ่านการประเมินตามมาตรฐานสูงสุดของวิชาชีพสัตวแพทย์ ทั้งด้านสถานที่ เครื่องมือ อุปกรณ์
                                และกระบวนการรักษาที่ได้มาตรฐาน
                            </li>
                            <li>
                                <span>ความเชี่ยวชาญที่วางใจได้:</span> เราภาคภูมิใจในทีมสัตวแพทย์ผู้เชี่ยวชาญ
                                ที่ไม่หยุดนิ่งในการพัฒนาองค์ความรู้ เพื่อให้การวินิจฉัยและการรักษาแม่นยำและมีประสิทธิภาพสูงสุด
                            </li>
                            <li>
                                <span>ยกระดับการดูแล:</span> เรามุ่งมั่นที่จะมอบ **"The Best Outcome"**
                                ให้แก่สัตว์เลี้ยงของคุณทุกตัว ด้วยการผสานความรัก ความใส่ใจ
                                และมาตรฐานทางการแพทย์ที่ได้รับการรับรอง
                            </li>
                        </ul>
                        <p>
                            เมื่อคุณพาสัตว์เลี้ยงมารักษาที่ Pawplan คุณจึงมั่นใจได้ว่า
                            สมาชิกคนสำคัญของครอบครัวจะได้รับการดูแลในสภาพแวดล้อมที่สะอาด ปลอดภัย
                            และถูกต้องตามหลักการสัตวแพทย์ทุกประการ
                        </p>
                        <p>
                            Pawplan พร้อมดูแลด้วยมาตรฐานที่คุณวางใจได้เสมอ
                        </p>
                    </div>
                </Modal>
            )}

            {openModal === 'modal-4' && (
                <Modal onClose={() => setOpenModal(null)}>
                    <Image src="/assets/ข่าวสารและกิจกรรม_4.png" alt="กิจกรรมบริจาคโลหิตสัตว์เลี้ยง" width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                    <h2>Pawplan ชวนบริจาคโลหิต "ต่อชีวิตให้เพื่อน"</h2>
                    <div className="modal-body-blood">
                        <p>
                            โครงการธนาคารเลือดสำหรับสัตว์เลี้ยง: ในภาวะวิกฤต เช่น การเกิดอุบัติเหตุ การผ่าตัดใหญ่
                            หรือภาวะโลหิตจางจากโรคร้าย เลือดเพียงหยดเดียวจากฮีโร่สี่ขา
                            สามารถช่วยชีวิตเพื่อนสัตว์เลี้ยงได้ทันท่วงที
                        </p>
                        <h3 style={{ color: '#d84315' }}>คุณสมบัติ "ฮีโร่ผู้ให้"</h3>
                        <ul>
                            <li><span className="hero-feature">สุขภาพดีเยี่ยม:</span>สุนัข/แมว มีสุขภาพสมบูรณ์แข็งแรง
                                ไม่มีโรคประจำตัว</li>
                            <li>
                                <span className="hero-feature">ช่วงอายุทอง:</span> อายุระหว่าง 1-7 ปี
                            </li>
                            <li>
                                <span className="hero-feature">น้ำหนัก:</span> สุนัข น้ำหนักเกิน 20 กิโลกรัม ขึ้นไป (สำหรับแมว
                                สอบถามเกณฑ์เพิ่มเติม)
                            </li>
                            <li>
                                <span className="hero-feature">การป้องกัน:</span> ได้รับวัคซีนครบถ้วน และมีการป้องกันเห็บ หมัด
                                พยาธิหนอนหัวใจอย่างสม่ำเสมอ
                            </li>
                            <li>
                                <span className="hero-feature">นิสัยเป็นมิตร:</span> สามารถควบคุมและอยู่ในความดูแลของเจ้าหน้าที่ได้
                            </li>
                        </ul>
                        <h3 style={{ color: '#028090' }}>สิทธิพิเศษสำหรับฮีโร่และเจ้าของ</h3>
                        <ul>
                            <li><span className="special-benefit">ตรวจสุขภาพฟรี!</span>ก่อนการบริจาค
                                (รวมถึงการตรวจคัดกรองโรคติดต่อทางเลือด)</li>
                        </ul>
                        <p className="motto">
                            นัดหมายเพื่อตรวจคัดกรองและบริจาคได้แล้ววันนี้! เลือดของสัตว์เลี้ยงคุณ
                            คือความหวังสุดท้ายของสัตว์เลี้ยงตัวอื่น
                        </p>
                        <p className="action-contact">
                            สอบถามรายละเอียดและนัดหมาย: โทร: 02-XXX-XXXX
                        </p>
                    </div>
                </Modal>
            )}

            {openModal === 'modal-5' && (
                <Modal onClose={() => setOpenModal(null)}>
                    <Image src="/assets/ข่าวสารและกิจกรรม_5.png" alt="โปรแกรมตรวจสุขภาพสัตว์เลี้ยงประจำปี" width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                    <h2>เริ่มแล้ว! โปรแกรมตรวจสุขภาพประจำปี 2568</h2>
                    <div className="modal-body-checkup">
                        <p className="subtitle">
                            'เพราะการป้องกันดีกว่ารักษา' เริ่มต้นปีใหม่ด้วยสุขภาพที่ดีของน้องๆ!
                        </p>
                        <p>
                            Pawplan ขอเชิญชวนเจ้าของทุกท่านมอบของขวัญที่ดีที่สุด
                            ด้วยการดูแลสุขภาพเชิงรุกให้กับสัตว์เลี้ยงที่คุณรัก
                        </p>
                        <h3>แพ็กเกจตรวจสุขภาพในราคาพิเศษ พร้อมยกระดับการป้องกัน</h3>
                        <ul>
                            <li>
                                <span className="checkup-item">ตรวจเลือด (CBC & Chemistry):</span>
                                ตรวจเช็กความสมบูรณ์ของเม็ดเลือดและประเมินการทำงานของอวัยวะสำคัญ เช่น ตับและไต
                                เพื่อหาความผิดปกติในระยะเริ่มต้น
                            </li>
                            <li>
                                <span className="checkup-item">ตรวจปัสสาวะ (Urinalysis):</span>
                                คัดกรองปัญหาเกี่ยวกับระบบทางเดินปัสสาวะ หรือโรคที่ส่งผลต่อไต ซึ่งมักไม่มีอาการแสดงชัดเจน
                            </li>
                            <li>
                                <span className="checkup-item">เอ็กซเรย์ (Radiography):</span> ตรวจดูโครงสร้างกระดูก หัวใจ
                                และช่องท้อง เพื่อประเมินขนาดอวัยวะ และตรวจหาความผิดปกติภายในที่ซ่อนอยู่
                            </li>
                        </ul>
                        <p style={{ fontWeight: 600, color: '#333' }}>
                            <span className="checkup-item">พิเศษกว่าเดิม!</span> ทุกแพ็กเกจตรวจสุขภาพปีนี้
                            รับคำปรึกษาเจาะลึกจากทีมสัตวแพทย์ผู้เชี่ยวชาญ พร้อมวางแผนการดูแลสุขภาพและโภชนาการที่เหมาะสม
                        </p>

                        <span className="promo-date">
                            ระยะเวลาโปรโมชั่น: [ระบุ วันที่เริ่มต้น] ถึง [ระบุ วันที่สิ้นสุด] เท่านั้น!
                        </span>

                        <p className="call-to-action-footer">
                            จองคิวตรวจสุขภาพวันนี้ เพื่อให้ Pawplan
                            ช่วยดูแลสมาชิกสี่ขาของคุณให้มีชีวิตที่ยืนยาวและมีความสุขที่สุด!
                        </p>
                    </div>
                </Modal>
            )}

            {openModal === 'modal-6' && (
                <Modal onClose={() => setOpenModal(null)}>
                    <Image src="/assets/ข่าวสารและกิจกรรม_6.png" alt="ศูนย์กายภาพบำบัดสัตว์เลี้ยง Pawplan" width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                    <h2>เปิดแล้ว! ศูนย์กายภาพบำบัดและธาราบำบัด Pawplan</h2>
                    <div className="modal-body-rehab">
                        <p style={{ fontSize: '1.1em', fontWeight: 500, color: '#444', marginBottom: '20px' }}>
                            <span className="rehab-highlight">คืนความสุขในการเดิน</span> ให้กับสัตว์เลี้ยงที่คุณรัก
                            ด้วยการดูแลหลังผ่าตัด หรือมีปัญหาข้อกระดูก
                        </p>
                        <h3>ทำไมต้อง Pawplan Rehabilitation Center?</h3>

                        <ul>
                            <li>
                                <span className="rehab-list-item">ธาราบำบัด (Hydrotherapy) ลดแรงกระแทก:</span>
                                สระว่ายน้ำระบบเกลือควบคุมอุณหภูมิ และลู่วิ่งใต้น้ำ ช่วยลดแรงกดต่อข้อต่อได้ถึง 70-90%
                                ทำให้ลดความเจ็บปวดและฟื้นตัวเร็ว
                            </li>
                            <li>
                                <span className="rehab-list-item">ผู้เชี่ยวชาญเฉพาะทาง:</span>
                                โปรแกรมฟื้นฟูทั้งหมดถูกควบคุมและออกแบบโดย <span
                                    className="rehab-highlight">ผู้เชี่ยวชาญด้านกายภาพบำบัดสัตว์เลี้ยงโดยเฉพาะ</span>
                            </li>
                            <li>
                                <span className="rehab-list-item">ครอบคลุมทุกปัญหา:</span>
                                เหมาะสำหรับสัตว์เลี้ยงหลังผ่าตัด, ภาวะข้อเสื่อมเรื้อรัง, อัมพาตจากหมอนรองกระดูก
                                หรือการลดน้ำหนักอย่างปลอดภัย
                            </li>
                        </ul>
                        <p style={{ fontStyle: 'italic', marginTop: '20px', color: '#777' }}>
                            หยุดมองน้องซึมเศร้า!
                            มาร่วมฟื้นฟูร่างกายและจิตใจให้น้องกลับมาเดินและวิ่งเล่นได้อย่างมีความสุขอีกครั้ง
                        </p>

                        <p className="call-to-action-rehab">
                            ปรึกษาและนัดหมายเพื่อประเมินอาการกับผู้เชี่ยวชาญ (ฟรี!):
                        </p>
                        <p className="contact-rehab">
                            โทร:  02-XXX-XXXX | Line ID: @pawplan
                        </p>
                    </div>
                </Modal>
            )}

        </>
    );
}