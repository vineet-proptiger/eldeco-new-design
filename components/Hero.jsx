'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { heroImages } from '../lib/images'
import { Check } from 'lucide-react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const slides = [heroImages.banner, heroImages.banner2]

const Hero = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '560px',
        overflow: 'hidden',
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {/* ── Background image carousel ── */}
      {slides.map((src, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute', inset: 0,
            opacity: current === idx ? 1 : 0,
            transition: 'opacity 1s ease',
            zIndex: 0,
          }}
        >
          <Image
            src={src}
            alt={`Godrej Crown Residences ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="100vw"
            quality={100}
          />
        </div>
      ))}

      {/* ── Dark gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)',
      }} />

      {/* ── Center-bottom text ── */}
      <div
        className="absolute left-0 right-0 z-[2] text-left lg:text-center px-6 bottom-[155px] lg:bottom-[110px]"
        style={{ zIndex: 2 }}>
        {/* Project Tagline */}
        <div style={{ marginBottom: '14px' }}>
          <span style={{
            background: 'var(--color-gold)',
            border: '1.5px solid var(--color-gold)',
            padding: '7px 28px',
            borderRadius: '50px',
            color: '#ffffff',
            fontFamily: F_JOST,
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            fontWeight: '700',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            display: 'inline-block',
            boxShadow: '0 4px 20px rgba(213,92,44,0.4)'
          }}>
            Godrej Golf Links
          </span>
        </div>

        <h1 style={{
          fontFamily: F_JOST,
          fontSize: 'clamp(22px, 3.2vw, 46px)',
          fontWeight: '800',
          color: '#ffffff',
          margin: '0 0 16px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          GODREJ CROWN RESIDENCES
        </h1>

        {/* Location + Mobile highlights — shared left-aligned wrapper */}
        <div style={{ display: 'block', textAlign: 'left' }}>
          {/* Location */}
          <div className="location-strip" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="clamp(14px, 1.6vw, 16px)" height="clamp(14px, 1.6vw, 16px)" viewBox="0 0 24 24" fill="none"
              stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{
              fontFamily: F_SANS, fontSize: 'clamp(13px, 1.8vw, 16px)', color: '#ffffff',
              fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              At Golf Course, Greater Noida
            </span>
          </div>

          {/* Mobile-only highlights */}
          <div className="lg:hidden" style={{ marginTop: '10px' }}>
            <style>{`
              @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-24px); }
                to   { opacity: 1; transform: translateX(0); }
              }
            `}</style>
            {[
              'Only 4 residences per floor',
              'Private, secure, composed living',
              'Just 5 minutes from Pari Chowk',
              'Private entry with 60m grand frontage',
            ].map((text, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                gap: '8px', marginBottom: '4px',
                opacity: 0,
                animation: `slideInLeft 0.4s ease forwards`,
                animationDelay: `${0.3 + i * 0.2}s`,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                padding: '7px 14px 7px 10px',
                borderRadius: '4px',
                width: '100%',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '17px', height: '17px', background: 'var(--color-gold)',
                  borderRadius: '50%', flexShrink: 0,
                }}>
                  <Check size={12} color="#000000" strokeWidth={3} />
                </span>
                <span style={{
                  fontFamily: F_SANS, fontSize: 'clamp(13px, 1.8vw, 16px)', color: '#ffffff',
                  fontWeight: '500', letterSpacing: '0.02em',
                  textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      {/* <div style={{
        position: 'absolute', bottom: '110px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', gap: '8px',
      }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: current === idx ? '28px' : '8px',
              height: '4px',
              background: current === idx ? '#C4952A' : 'rgba(255,255,255,0.5)',
              border: 'none', borderRadius: '2px', cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div> */}

      {/* ── Bottom info bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
      }}>
        {/* USP row */}
        <div style={{
          background: 'var(--color-gold)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {[
            '100 Acre Golf Ecosystem',
            '60m Wide Road Access',
            '3.5 Acres | 3 Towers',
          ].map((point, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '8px', padding: '10px 12px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.25)' : 'none',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span style={{
                fontFamily: F_SANS, fontSize: 'clamp(10px, 1.5vw, 13px)',
                fontWeight: '600', color: '#ffffff', letterSpacing: '0.02em',
              }}>
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* Info row */}
        <div style={{
          background: 'var(--color-dark)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          borderTop: '2px solid var(--color-gold)',
          margin: '0 auto',
          maxWidth: '1200px',
        }}>
          {[
            'PRE - LAUNCH',
            '3 & 4 BHK APARTMENTS',
            '₹ 3.60 Cr* ONWARDS',
          ].map((text, i) => (
            <div key={i} style={{
              textAlign: 'center',
              padding: '14px 12px',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <span style={{
                fontFamily: F_JOST,
                fontSize: 'clamp(11px, 1.8vw, 16px)',
                fontWeight: '700',
                color: '#ffffff',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
