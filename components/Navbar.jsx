'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { logoImages } from '../lib/images'

const PHONE = '9718344024'
const PHONE_DISPLAY = '9718 344 024'

const navLinks = [
  { name: 'OVERVIEW',    href: '#overview' },
  { name: 'HIGHLIGHTS',  href: '#highlights' },
  { name: 'GALLERY',     href: '#gallery' },
  { name: 'PRICE LIST',  href: '#pricing' },
  { name: 'AMENITIES',   href: '#amenities' },
  { name: 'LOCATION',    href: '#location' },
  { name: 'FLOOR PLANS', href: '#masterplan' },
]

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const Navbar = ({ setIsOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'var(--color-gold)',
        borderBottom: '1px solid var(--color-gold-dark)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[64px] md:h-[80px]">

          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <img
              src={logoImages.main}
              alt="Eldeco"
              style={{ height: 'clamp(38px,6vw,58px)', width: 'auto', objectFit: 'contain', maxWidth: '180px' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontFamily: F_JOST,
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#ffffff',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.target.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.target.style.color = '#ffffff')}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Phone — Desktop */}
          <a
            href={`tel:${PHONE}`}
            className="hidden lg:block"
            style={{
              fontFamily: F_JOST,
              fontSize: '16px',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              border: '2px solid #ffffff',
              padding: '7px 16px',
              borderRadius: '4px',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = '#ffffff'; e.target.style.color = 'var(--color-gold)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#ffffff' }}
          >
            {PHONE_DISPLAY}
          </a>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: '#ffffff', padding: '4px', background: 'none', border: 'none' }}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'var(--color-gold-dark)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}>
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '13px 24px',
                fontFamily: F_JOST,
                fontSize: '12px',
                fontWeight: '600',
                color: '#ffffff',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ padding: '14px 24px' }}>
            <button
              onClick={() => { setIsOpen(true); setMobileOpen(false) }}
              className="btn-gold w-full"
              style={{ padding: '12px', fontSize: '12px', letterSpacing: '0.08em' }}
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
