'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { galleryImages } from '../lib/images'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const GalleryCard = ({ img, idx, onClick }) => (
  <div
    onClick={() => onClick(idx)}
    data-aos="fade-up"
    data-aos-delay={idx * 60}
    style={{
      position: 'relative',
      aspectRatio: '4/3',
      cursor: 'pointer',
      overflow: 'hidden',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
    }}
    onMouseEnter={e => {
      e.currentTarget.querySelector('.g-img').style.transform = 'scale(1.06)'
      e.currentTarget.querySelector('.g-overlay').style.background = 'rgba(0,0,0,0.22)'
    }}
    onMouseLeave={e => {
      e.currentTarget.querySelector('.g-img').style.transform = 'scale(1)'
      e.currentTarget.querySelector('.g-overlay').style.background = 'rgba(0,0,0,0)'
    }}
  >
    <Image
      src={img.src} alt={img.alt} fill
      className="g-img object-cover"
      style={{ transition: 'transform 0.5s ease' }}
      sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 25vw"
    />
    <div
      className="g-overlay"
      style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0)',
        transition: 'background 0.3s',
      }}
    />
    <span style={{
      position: 'absolute', bottom: '10px', left: '12px',
      color: '#fff', fontSize: '11px', fontFamily: F_SANS,
      textShadow: '0 1px 4px rgba(0,0,0,0.8)', letterSpacing: '0.02em',
    }}>
      Artistic Impression
    </span>
  </div>
)

const Gallery = ({ setIsOpen }) => {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" style={{ padding: '72px 0', background: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h3 style={{
            fontFamily: F_JOST, color: '#BC9161', fontSize: '22px',
            margin: '0 0 12px', textTransform: 'uppercase',
            fontWeight: '300', letterSpacing: '0.28em', lineHeight: '34px',
          }}>
            GALLERY
          </h3>
          <h5 style={{
            fontFamily: F_JOST, color: '#BC9161', fontSize: '19px',
            margin: 0, padding: '6px 0 0', fontWeight: '300',
            letterSpacing: '0.08em', lineHeight: '28px',
          }}>
            Experience a Truly Palatial Sense of Space
          </h5>
        </div>

        {/* Row 1 — 4 images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {galleryImages.slice(0, 4).map((img, idx) => (
            <GalleryCard key={idx} img={img} idx={idx} onClick={setLightbox} />
          ))}
        </div>

        {/* Row 2 — 2 images centered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="hidden md:block" />
          {galleryImages.slice(4).map((img, idx) => (
            <GalleryCard key={idx + 4} img={img} idx={idx + 4} onClick={setLightbox} />
          ))}
          <div className="hidden md:block" />
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
            background: 'var(--color-gold)', border: 'none', color: '#fff',
            fontSize: '20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>

          <div
            style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '80vh' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt}
              fill className="object-contain" sizes="100vw"
            />
            <div style={{
              position: 'absolute', bottom: '-36px', left: 0, right: 0,
              textAlign: 'center', color: 'rgba(255,255,255,0.45)',
              fontFamily: F_JOST, fontSize: '12px', letterSpacing: '0.1em',
            }}>
              {lightbox + 1} / {galleryImages.length}
            </div>
          </div>

          <button
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length) }}
            style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '24px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >‹</button>

          <button
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length) }}
            style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '24px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >›</button>
        </div>
      )}
    </section>
  )
}

export default Gallery
