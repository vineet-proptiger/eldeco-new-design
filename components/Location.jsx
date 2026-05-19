'use client'
import React from 'react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const locations = [
  { name: 'Pari Chowk',                 dist: '2.5 KM' },
  { name: 'Yamuna Expressway',          dist: '3 KM' },
  { name: 'Noida-Gr Noida Expressway',  dist: '2.5 KM' },
  { name: 'Kailash Hospital',           dist: '4.5 KM' },
  { name: 'Knowledge Park II',          dist: '5 KM' },
  { name: 'Jewar Int. Airport',         dist: '30 MINS' },
]

const Location = () => (
  <section id="location" style={{ padding: '72px 0', background: '#1a1a1a' }}>
    <div className="container mx-auto px-4 md:px-8">
      <div className="flex flex-col lg:flex-row gap-10 items-start">

        {/* LEFT — heading + grid */}
        <div className="w-full lg:w-[42%]" data-aos="fade-right">
          <h2 style={{
            fontFamily: F_JOST, fontWeight: '800',
            fontSize: 'clamp(24px,3.5vw,36px)',
            color: '#ffffff', textTransform: 'uppercase',
            letterSpacing: '0.04em', margin: '0 0 32px',
          }}>
            LOCATION<br />ADVANTAGES
          </h2>

          {/* 2-column location boxes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}>
            {locations.map((loc, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 50}
                style={{
                  background: '#242424',
                  border: '1px solid #2e2e2e',
                  borderRadius: '4px',
                  padding: '14px 16px',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#C4952A'
                  e.currentTarget.style.background  = '#2a2318'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#2e2e2e'
                  e.currentTarget.style.background  = '#242424'
                }}
              >
                <p style={{
                  fontFamily: F_JOST, fontWeight: '700', fontSize: '13px',
                  color: '#ffffff', margin: '0 0 4px', letterSpacing: '0.02em',
                }}>
                  {loc.name}
                </p>
                <p style={{
                  fontFamily: F_SANS, fontSize: '12px',
                  color: '#C4952A', margin: 0, fontWeight: '600',
                }}>
                  {loc.dist}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — map */}
        <div className="w-full lg:flex-1" data-aos="fade-left" style={{ minHeight: '420px' }}>
          <div style={{
            borderRadius: '4px', overflow: 'hidden',
            border: '1px solid #C4952A',
            height: '100%', minHeight: '420px',
            position: 'relative',
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.758528891412!2d77.53095467450333!3d28.471383891382175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb6973560ebd%3A0x4c079cd6b0fc8edb!2sGodrej%20Golf%20Links%2C%20Greater%20Noida!5e1!3m2!1sen!2sin!4v1778135446334!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border: 0, minHeight: '420px', display: 'block', filter: 'grayscale(20%)' }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
)

export default Location
