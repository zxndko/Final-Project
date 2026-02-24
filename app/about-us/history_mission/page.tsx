import Image from 'next/image';

export default function HistoryMissionPage() {
    return (
        <section className="content-section history-page page-animate">
            <div className="container">
                <h2 className="page-title">📄 ประวัติและพันธกิจ</h2>
                <div className="divider"></div>
                <p className="intro-text page-subtitle">รู้จัก Pawplan คลินิกสัตว์เลี้ยง</p>

                <div className="image-history-box">
                    <div className="history-image">
                        <Image
                            src="/assets/5.png"
                            alt="ภาพภายใน Pawplan คลินิกสัตว์เลี้ยง ที่ดูสะอาดและอบอุ่น"
                            width={800}
                            height={600}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>

                    <div className="text-content">
                        <p><strong>Pawplan คลินิกสัตว์เลี้ยง</strong> ก่อตั้งขึ้นด้วยความรักและความเข้าใจอย่างลึกซึ้งในความผูกพันระหว่างคนกับสัตว์เลี้ยง สพ.ญ. ปาริฉัตร วงศ์วาน (ผู้บริหาร) และทีมงาน ได้ร่วมกันสร้างสรรค์พื้นที่ที่ไม่ได้เป็นเพียงแค่คลินิก แต่เป็นเหมือน "บ้านหลังที่สอง" ที่อบอุ่นและปลอดภัยสำหรับสัตว์เลี้ยงที่คุณรัก</p>
                        <p>เราเชื่อว่าสุขภาพที่ดีของสัตว์เลี้ยงต้องเริ่มต้นจากการดูแลที่ใส่ใจและได้มาตรฐาน Pawplan จึงมุ่งมั่นที่จะเป็นส่วนหนึ่งในการวางแผนและดูแลสุขภาพที่ดีที่สุดให้สัตว์เลี้ยงของคุณ ด้วยการให้บริการตรวจวินิจฉัยและรักษาพยาบาลที่ครอบคลุม โดยมีสัตวแพทย์ผู้เชี่ยวชาญและบุคลากรที่เปี่ยมด้วยประสบการณ์ พร้อมด้วยเครื่องมือและอุปกรณ์ทางการแพทย์ที่ทันสมัย เพื่อให้การรักษาเป็นไปอย่างมีประสิทธิภาพ</p>
                        <p>ตั้งแต่วันแรกที่เปิดทำการ Pawplan ได้ยึดมั่นในพันธกิจ ที่จะมอบการดูแลสุขภาพสัตว์เลี้ยงด้วยมาตรฐานระดับสูง ควบคู่ไปกับการสร้างความสัมพันธ์ที่อบอุ่นและเป็นกันเองกับเจ้าของ เพื่อให้คุณมั่นใจว่าสัตว์เลี้ยงของคุณจะได้รับสิ่งที่ดีที่สุดเสมอ</p>
                    </div>
                </div>

                <div className="image-mission-box">
                    <div className="mission-image">
                        <Image
                            src="/assets/6.png"
                            alt="ภาพภายในห้องตรวจ"
                            width={800}
                            height={600}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <ul className="mission-list">
                        <li><div className="mission-card"><i className="fa-solid fa-paw icon-bullet"></i>
                            <div>
                                <strong>มอบการดูแลที่ได้มาตรฐาน:</strong>
                                <span>ให้บริการตรวจวินิจฉัยและรักษาพยาบาลด้วยมาตรฐานวิชาชีพชั้นสูง พร้อมเทคโนโลยีทางการแพทย์ที่ทันสมัย</span>
                            </div>
                        </div></li>
                        <li><div className="mission-card"><i className="fa-solid fa-paw icon-bullet"></i>
                            <div>
                                <strong>เน้นการป้องกันและวางแผนสุขภาพ:</strong>
                                <span>มุ่งเน้นการให้ความรู้และคำปรึกษาแก่เจ้าของ เพื่อป้องกันโรค และวางแผนการดูแลสุขภาพสัตว์เลี้ยงในระยะยาวอย่างเหมาะสมกับช่วงวัย</span>
                            </div>
                        </div></li>
                        <li><div className="mission-card"><i className="fa-solid fa-paw icon-bullet"></i>
                            <div>
                                <strong>สร้างสภาพแวดล้อมที่อบอุ่นและเป็นกันเอง:</strong>
                                <span>ให้สัตว์เลี้ยงและเจ้าของรู้สึกสบายใจ ปลอดภัย และได้รับการต้อนรับอย่างอบอุ่นจากทีมงานของเรา</span>
                            </div>
                        </div></li>
                        <li><div className="mission-card"><i className="fa-solid fa-paw icon-bullet"></i>
                            <div>
                                <strong>รักและใส่ใจเหมือนสมาชิกในครอบครัว:</strong>
                                <span>ปฏิบัติต่อสัตว์เลี้ยงทุกตัวด้วยความรัก ความเมตตา และความเข้าใจ ในฐานะสมาชิกคนสำคัญในครอบครัวของคุณ</span>
                            </div>
                        </div></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}