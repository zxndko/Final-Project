"use client";
import { useEffect } from 'react';

export default function HideHeader() {
  useEffect(() => {
    const header = document.querySelector('header') as HTMLElement | null;
    if (!header) return;

    const prev = header.style.display;
    header.style.display = 'none';

    return () => {
      header.style.display = prev;
    };
  }, []);

  return null;
}