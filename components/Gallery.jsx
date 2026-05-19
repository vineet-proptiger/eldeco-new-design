'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { galleryImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const Gallery = ({ setIsOpen }) => {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" style={{ padding: '72px 0', background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <h2
          data-aos="fade-up"
          style={{
            fontFamily: F_JOST, fontWeight: '800',
            fontSize: 'clamp(28px,4vw,40px)',
            color: '#1a1a1a', textAlign: 'center',
            textTransform: 'uppercase', letterSpacing: '0.04em',
            margin: '0 0 48px',
          }}
        >
          GALLERY
        </h2>

        {/* Responsive grid: 2 columns on mobile, 3 on desktop */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
          data-aos="fade-up"
        >
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightbox(idx)}
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '4px',
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('img').style.transform = 'scale(1)'
              }}
            >
              <Image
                src={img.src} alt={img.alt} fill
                className="object-cover"
                style={{ transition: 'transform 0.5s ease' }}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
              {/* hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0)',
                transition: 'background 0.3s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.28)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ opacity: 0, transition: 'opacity 0.3s' }}
                  className="gallery-zoom-icon">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '44px' }} data-aos="fade-up">
          <button onClick={() => setIsOpen(true)} className="btn-gold"
            style={{ padding: '13px 44px' }}>
            SCHEDULE A SITE VISIT
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
          }}
          onClick={() => setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: '20px', right: '20px',
            width: '36px', height: '36px', borderRadius: '2px',
            background: '#C4952A', border: 'none', color: '#fff',
            fontSize: '20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>

          <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '80vh' }}
            onClick={e => e.stopPropagation()}>
            <Image src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt}
              fill className="object-contain" sizes="100vw" />
            <div style={{
              position: 'absolute', bottom: '-36px', left: 0, right: 0,
              textAlign: 'center', color: 'rgba(255,255,255,0.45)',
              fontFamily: F_JOST, fontSize: '12px', letterSpacing: '0.1em',
            }}>
              {lightbox + 1} / {galleryImages.length}
            </div>
          </div>

          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length) }}
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '24px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>‹</button>

          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length) }}
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '24px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>›</button>
        </div>
      )}
    </section>
  )
}

export default Gallery
