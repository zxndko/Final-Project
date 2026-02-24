'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { UserLock } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  dropdown?: DropdownItem[];
  href?: string;
}

const navItems: NavItem[] = [
  { label: 'หน้าแรก', href: '/' },
  {
    label: ' เกี่ยวกับเรา  ',
    dropdown: [
      { label: 'ประวัติและพันธกิจ', href: '/about-us/history_mission' },
      { label: 'ข่าวสารและกิจกรรม', href: '/about-us/news_activities' },
      { label: 'รางวัลและการรับรอง', href: '/about-us/awards_accreditations' },
      { label: 'ติดต่อเรา', href: '/#contact' },
    ],
  },
  {
    label: ' บริการ  ',
    dropdown: [
      { label: 'จองนัดหมาย', href: '/appointment' },
      { label: 'Pawplan Pet Care', href: '/petcare' },
      { label: 'Pawplan Shop', href: '/shop' },
    ],
  },
  {
    label: ' คลินิกและแพทย์  ',
    dropdown: [
      { label: 'บริการทางการแพทย์', href: '/#services' },
      { label: 'ทีมสัตวแพทย์', href: '/doctors' },
    ],
  },
  {
    label: ' บทความ  ',
    dropdown: [
      { label: 'บทความสุนัข', href: '/articles/dog' },
      { label: 'บทความแมว', href: '/articles/cat' },
      { label: 'เคล็ดลับสุขภาพ', href: '/articles/health-tips' },
    ],
  },
];

function DropdownMenu({ items, visible }: { items: DropdownItem[]; visible: boolean }) {
  return (
    <ul className={`hdr-dropdown${visible ? ' visible' : ''}`}>
      {items.map((item, i) => (
        <li key={i} style={{ '--i': i } as React.CSSProperties}>
          <a href={item.href} className="hdr-dropdown-item">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (i: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(i);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenIndex(null), 120);
  };

  return (
    <header>
      <div className="container">
        <div className="navbar">
          <Link href="/" className="hdr-logo">
            🐾 Pawplan
          </Link>

          <nav>
            <ul className="nav-links">
              {navItems.map((item, i) => (
                <li
                  key={i}
                  className={item.dropdown ? 'hdr-dropdown-wrap' : ''}
                  onMouseEnter={() => item.dropdown && handleMouseEnter(i)}
                  onMouseLeave={() => item.dropdown && handleMouseLeave()}
                >
                  {item.dropdown ? (
                    <>
                      <a
                        href="#"
                        className={`hdr-navlink ${openIndex === i ? 'open' : ''}`}
                        onClick={(e) => e.preventDefault()}
                      >
                        {item.label}
                      </a>
                      <DropdownMenu items={item.dropdown} visible={openIndex === i} />
                      {/* invisible bridge to prevent gap flicker */}
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, height: 8 }} />
                    </>
                  ) : (
                    <Link href={item.href!} className="hdr-navlink">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link href="/login" className="hdr-login" title="เข้าสู่ระบบ">
              <UserLock size={30} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}