'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import './BlobCursor.css';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#d1f23c', // Tennis ball yellow/green
  trailCount = 1,
  sizes = [20],
  innerSizes = [0], // no inner dot needed for a simple tennis ball look
  innerColor = 'transparent',
  opacities = [0.8],
  shadowColor = 'rgba(0,0,0,0.1)',
  shadowBlur = 4,
  shadowOffsetX = 2,
  shadowOffsetY = 2,
  filterId = 'blob',
  filterStdDeviation = 15,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = false, // disable SVG filter to keep it crisp and subtle
  fastDuration = 0.15,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 9999
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
    }
  }, []);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e: any) => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const y = 'clientY' in e ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [handleMove]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="blob-container"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div className="blob-main" style={{ filter: useFilter ? `url(#${filterId})` : undefined }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className={`blob ${i === 0 ? 'tennis-ball' : ''}`}
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
            }}
          >
            <div
              className="inner-dot"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
