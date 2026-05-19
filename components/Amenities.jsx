'use client'
import React, { useState } from 'react'

const F_SERIF = 'var(--font-serif), Cormorant Garamond, serif'
const F_SANS  = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST  = 'var(--font-jost), Montserrat, sans-serif'

const amenities = [
  {
    label: 'Clubhouse',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 26L26 12l16 14" />
        <rect x="14" y="26" width="24" height="16" />
        <path d="M22 42v-10h8v10" />
        <line x1="8" y1="26" x2="44" y2="26" />
        <rect x="16" y="28" width="6" height="6" />
        <rect x="30" y="28" width="6" height="6" />
      </svg>
    ),
  },
  {
    label: 'Golf Simulation',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="28" y1="10" x2="28" y2="40" />
        <path d="M28 10l14 6-14 6z" />
        <circle cx="22" cy="38" r="3" />
        <path d="M14 44c3-4 8-5 14-3s10 1 14-3" />
      </svg>
    ),
  },
  {
    label: 'Squash Court',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="20" cy="20" rx="11" ry="13" />
        <line x1="14" y1="14" x2="26" y2="26" />
        <line x1="14" y1="20" x2="20" y2="26" />
        <line x1="20" y1="14" x2="26" y2="20" />
        <rect x="14" y="32" width="12" height="5" rx="2.5" />
        <line x1="20" y1="37" x2="20" y2="44" />
        <circle cx="36" cy="14" r="4" />
      </svg>
    ),
  },
  {
    label: 'Gaming Room',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="18" width="36" height="22" rx="3" />
        <line x1="16" y1="40" x2="14" y2="46" />
        <line x1="36" y1="40" x2="38" y2="46" />
        <line x1="12" y1="46" x2="40" y2="46" />
        <line x1="22" y1="25" x2="22" y2="33" />
        <line x1="18" y1="29" x2="26" y2="29" />
        <circle cx="34" cy="27" r="2" />
        <circle cx="34" cy="33" r="2" />
      </svg>
    ),
  },
  {
    label: 'Table Tennis',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="22" cy="22" rx="14" ry="14" r="14" />
        <line x1="22" y1="8" x2="22" y2="36" />
        <line x1="34" y1="34" x2="44" y2="44" strokeWidth="3" />
        <circle cx="40" cy="14" r="4" />
      </svg>
    ),
  },
  {
    label: 'Swimming Pool',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="10" width="5" height="18" rx="2.5" />
        <rect x="29" y="10" width="5" height="18" rx="2.5" />
        <line x1="18" y1="20" x2="34" y2="20" />
        <path d="M6 34c3 0 5-2 8-2s5 2 8 2 5-2 8-2 5 2 8 2" />
        <path d="M6 40c3 0 5-2 8-2s5 2 8 2 5-2 8-2 5 2 8 2" />
      </svg>
    ),
  },
  {
    label: 'Dance Studio',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="26" cy="10" r="4" />
        <path d="M26 14l-8 10 8 4 8-4-8-10z" />
        <path d="M18 24l-6 10" />
        <path d="M34 24l6 10" />
        <path d="M18 34l-2 10" />
        <path d="M34 34l2 10" />
      </svg>
    ),
  },
  {
    label: 'Party Lounge',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 10h20l-4 16H20L16 10z" />
        <line x1="20" y1="26" x2="18" y2="36" />
        <line x1="32" y1="26" x2="34" y2="36" />
        <line x1="14" y1="36" x2="38" y2="36" />
        <circle cx="36" cy="14" r="3" />
        <path d="M36 17v6" />
        <path d="M33 22h6" />
      </svg>
    ),
  },
  {
    label: 'Kids Play Area',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="10" x2="12" y2="44" />
        <line x1="40" y1="10" x2="40" y2="44" />
        <line x1="12" y1="10" x2="40" y2="10" />
        <path d="M12 22l14 8" />
        <circle cx="30" cy="27" r="3" />
        <path d="M26 30l-8 14" />
        <path d="M18 44h20" />
      </svg>
    ),
  },
  {
    label: 'Gym',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="10" y1="26" x2="42" y2="26" />
        <rect x="6"  y="22" width="8"  height="8" rx="2" />
        <rect x="38" y="22" width="8"  height="8" rx="2" />
        <rect x="15" y="18" width="6"  height="16" rx="3" />
        <rect x="31" y="18" width="6"  height="16" rx="3" />
      </svg>
    ),
  },
  {
    label: 'Yoga & Meditation Zone',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="26" cy="10" r="4" />
        <path d="M26 14v8" />
        <path d="M10 34c0 0 6-8 16-8s16 8 16 8" />
        <path d="M18 34l-6 6" />
        <path d="M34 34l6 6" />
        <line x1="8" y1="44" x2="44" y2="44" />
      </svg>
    ),
  },
  {
    label: '24x7 Security',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 6l18 7v14c0 9-7 16-18 19C15 43 8 36 8 27V13l18-7z" />
        <rect x="20" y="26" width="12" height="10" rx="2" />
        <path d="M22 26v-4a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    label: 'Forest Garden',
    icon: (c) => (
      <svg width="46" height="46" viewBox="0 0 52 52" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 8L38 26H14L26 8z" />
        <path d="M20 22l12 18H8L20 22z" />
        <path d="M32 22l12 18H20L32 22z" />
        <line x1="26" y1="40" x2="26" y2="46" />
      </svg>
    ),
  },
]

const AmenityCard = ({ item, className = '' }) => {
  const [hovered, setHovered] = useState(false)
  const active = hovered || item.defaultActive
  const iconColor = active ? '#ffffff' : '#333333'

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: active ? 'var(--color-gold)' : '#ffffff',
        border: active ? '1px solid var(--color-gold)' : '1px solid #e0dbd4',
        borderRadius: '4px',
        padding: '28px 12px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
        boxShadow: active ? '0 6px 20px rgba(213,92,44,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
        {item.icon(iconColor)}
      </div>
      <p style={{
        fontFamily: F_SANS, fontSize: '13px', fontWeight: '400',
        color: active ? '#ffffff' : '#333333',
        margin: 0, lineHeight: '1.4', letterSpacing: '0.01em',
        transition: 'color 0.25s',
      }}>
        {item.label}
      </p>
    </div>
  )
}

const Amenities = ({ setIsOpen }) => (
  <section id="amenities" style={{ padding: '72px 0', background: 'var(--color-bg)' }}>
    <div className="container mx-auto px-4 md:px-8">

      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h3 style={{
          fontFamily: F_JOST, color: '#BC9161', fontSize: '22px',
          margin: '0 0 12px', textTransform: 'uppercase',
          fontWeight: '300', letterSpacing: '0.28em', lineHeight: '34px',
        }}>
          AMENITIES
        </h3>
        <h5 style={{
          fontFamily: F_JOST, color: '#BC9161', fontSize: '19px',
          margin: 0, padding: '6px 0 0', fontWeight: '300',
          letterSpacing: '0.08em', lineHeight: '28px',
        }}>
          Iconic Design with Expansive Views
        </h5>
      </div>

      {/* All 13 amenities — 2 cols mobile / 3 cols tablet / 5 cols desktop */}
      <div
        data-aos="fade-up"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10"
      >
        {amenities.map((item, i) => (
          <AmenityCard
            key={i}
            item={item}
            className={i === 10 ? 'lg:col-start-2' : ''}
          />
        ))}
      </div>

      {/* Button */}
      <div style={{ textAlign: 'center' }} data-aos="fade-up">
        <button
          onClick={() => setIsOpen(true)}
          className="btn-gold"
          style={{ padding: '14px 44px', fontSize: '13px', letterSpacing: '0.12em', fontFamily: F_JOST }}
        >
          VIEW ALL AMENITIES
        </button>
      </div>

    </div>
  </section>
)

export default Amenities
