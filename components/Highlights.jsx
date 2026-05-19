'use client'
import React from 'react'
import Image from 'next/image'
import { heroImages } from '../lib/images'

const F_SERIF = 'var(--font-serif), Cormorant Garamond, serif'
const F_SANS  = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST  = 'var(--font-jost), Montserrat, sans-serif'

const highlights = [
  'Only 2 towers in 2.7 acres with 4-to-a-crore units\' placement',
  'Situated on 3 side open plot with 24-meter wide access road',
  'All homes are corner homes with infinite views',
  'Well-designed kitchen connected to largest utility in the category',
  'Angled wraparound balconies for maximum views and sunlight',
  'Balcony decks up to 100+ ft. long, offering larger living spaces',
  'Minimal vehicular movement on surface to create least disturbance',
  'Dedicated 2 car parking for every residence',
]

const CheckIcon = () => (
  <div style={{
    flexShrink: 0,
    width: '20px',
    height: '20px',
    borderRadius: '3px',
    background: 'var(--color-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
  }}>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
)

const Highlights = ({ setIsOpen }) => (
  <section id="highlights" style={{ background: 'var(--color-bg)', padding: '72px 0' }}>
    <div className="container mx-auto px-4 md:px-8">

      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h3 style={{
          fontFamily: F_JOST, color: '#BC9161', fontSize: '22px',
          margin: '0 0 12px', textTransform: 'uppercase',
          fontWeight: '300', letterSpacing: '0.28em', lineHeight: '34px',
        }}>
          HIGHLIGHTS
        </h3>
        <h5 style={{
          fontFamily: F_JOST, color: '#BC9161', fontSize: '19px',
          margin: 0, padding: '6px 0 0', fontWeight: '300',
          letterSpacing: '0.08em', lineHeight: '28px',
        }}>
          Indulgence Reimagined with Panoramic Views
        </h5>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-stretch">

        {/* LEFT — image */}
        <div className="w-full lg:w-[45%] flex" data-aos="fade-right">
          <div style={{
            position: 'relative', width: '100%', minHeight: '300px',
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
          }}>
            <Image
              src={heroImages.banner2}
              alt="Eldeco Sector 80 Gurgaon Highlights"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 45vw"
            />
            <div style={{
              position: 'absolute', bottom: '12px', right: '16px',
              color: '#fff', fontSize: '12px', fontFamily: F_SANS,
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}>
              Artistic Impression
            </div>
          </div>
        </div>

        {/* RIGHT — bullet list */}
        <div className="w-full lg:w-[55%]" data-aos="fade-left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
            {highlights.map((item, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 50}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
              >
                <CheckIcon />
                <p style={{
                  fontFamily: F_SANS, fontSize: '14px', color: '#212529',
                  margin: 0, lineHeight: '1.65', letterSpacing: '0.01em', fontWeight: '400',
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="btn-gold"
            style={{ padding: '13px 36px', fontSize: '13px', letterSpacing: '0.1em', fontFamily: F_JOST }}
          >
            ENQUIRE NOW
          </button>
        </div>

      </div>
    </div>
  </section>
)

export default Highlights
