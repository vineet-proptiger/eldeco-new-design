'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { buildTrackingFields } from '../lib/formMeta'
import { overviewImage } from '../lib/images'
import Link from 'next/link'

const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const stats = [
  { value: '55 of 2023#', label: 'RERA No.' },
  { value: '10 Acres*', label: 'Total Land Area' },
  { value: '500 Homes*', label: 'No. of Units' },
  { value: '05 Towers*', label: 'No. of Towers' },
  { value: 'G + 30 Floors*', label: 'No. of Floors' },
  { value: '3 & 4 BHK', label: 'Unit Variants' },
]

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  border: '1.5px solid #e5e7eb',
  borderRadius: '6px',
  outline: 'none',
  fontSize: '14px',
  color: '#374151',
  background: '#ffffff',
  fontFamily: F_SANS,
  transition: 'border-color 0.25s, box-shadow 0.25s',
}

const EarlyForm = () => {
  const [form, setForm] = useState({ fullname: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')


  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    if (form.phone.replace(/\D/g, '').length < 10) { setError('Enter valid 10-digit number'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields()
    const payload = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('email', form.email)
    payload.append('phone', form.phone)
    payload.append('website', '')
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Overview Form')
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
      if (data.status) {
        setSuccess(true)
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          const nameParts = form.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: 'Overview Form',
            user_data: {
              email: form.email.trim() || undefined, phone: `+91${form.phone}`,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || ''
            }
          })
        }
      } else setError(data.msg || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div style={{ textAlign: 'center', padding: '28px 0' }}>
      <div style={{
        width: '52px', height: '52px', borderRadius: '50%',
        background: 'rgba(196,149,42,0.12)', border: '2px solid #C4952A',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
      }}>
        <svg width="24" height="24" fill="none" stroke="#C4952A" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p style={{ fontWeight: '700', fontSize: '17px', color: '#1a1a1a', fontFamily: F_JOST }}>Thank You!</p>
      <p style={{ color: '#666', fontSize: '13px', marginTop: '6px', fontFamily: F_SANS }}>Our team will contact you shortly.</p>
    </div>
  )

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <input
        name="fullname" required value={form.fullname} onChange={handle}
        placeholder="Full Name *"
        onFocus={() => setFocused('fullname')} onBlur={() => setFocused('')}
        style={{ ...inputStyle, borderColor: focused === 'fullname' ? '#C4952A' : '#e5e7eb' }}
      />
      <input
        name="email" value={form.email} onChange={handle}
        placeholder="Email Address (optional)"
        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
        style={{ ...inputStyle, borderColor: focused === 'email' ? '#C4952A' : '#e5e7eb' }}
      />
      <input
        name="phone" required value={form.phone} onChange={handle}
        placeholder="Mobile Number *" maxLength={10}
        onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
        style={{ ...inputStyle, borderColor: focused === 'phone' ? '#C4952A' : '#e5e7eb' }}
      />
      {error && <p style={{ color: '#ef4444', fontSize: '12px', fontFamily: F_SANS }}>{error}</p>}
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
        <input type="checkbox" required defaultChecked style={{ accentColor: '#C4952A', marginTop: '3px', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: F_SANS, lineHeight: 1.6 }}>
          I agree to the <Link href="/privacy-policy" style={{ color: '#C4952A', textDecoration: 'underline' }}>Privacy Policy</Link>.
        </span>
      </label>
      <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', padding: '13px' }}>
        {loading ? 'SUBMITTING...' : 'BOOK FREE SITE VISIT'}
      </button>
    </form>
  )
}

const Overview = () => (
  <section id="overview" style={{ padding: '72px 0', background: 'var(--color-bg)' }}>

    <div className="container mx-auto px-4 md:px-8">

      {/* Header Section */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h3 className="title-head" style={{
          fontFamily: 'var(--font-jost), Montserrat, sans-serif', color: '#BC9161', fontSize: '22px', margin: '0px 0px 12px',
          textTransform: 'uppercase', fontWeight: '300', letterSpacing: '0.28em', lineHeight: '34px'
        }}>
          PROJECT OVERVIEW
        </h3>
        <h5 className="title-subhead" style={{
          fontFamily: 'var(--font-jost), Montserrat, sans-serif', color: '#BC9161', fontSize: '19px',
          padding: '6px 0px 0px', margin: 0, fontWeight: '300',
          letterSpacing: '0.08em', lineHeight: '28px'
        }}>
          A Landmark of International Luxury Living
        </h5>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-stretch justify-center">

        {/* LEFT — text + button */}
        <div className="w-full lg:w-5/12 relative flex flex-col items-start" data-aos="fade-right">

          <p style={{
            fontFamily: "'Montserrat', var(--font-sans)", fontSize: '14px', color: '#212529',
            margin: '0px 0px 16px', textAlign: 'left', lineHeight: '30px', fontWeight: '400',
            letterSpacing: '0.01em', maxWidth: '430px'
          }}>
            Eldeco Group introduces an iconic luxury residential development in Sector 80, Gurgaon, featuring palatial 3 BR world residences with a unique Japanese-inspired Onigiri architectural design. Spread across 2.7 acres with only two exclusive towers, every home is a corner residence offering expansive layouts, wraparound balconies, and panoramic open views. The project is thoughtfully designed with oversized rooms, spacious utility areas, minimal surface vehicular movement, and dedicated two-car parking for a refined living experience.
          </p>

          <button className="btn-gold" style={{ padding: '14px 34px', fontSize: '13px', fontFamily: "'Montserrat', var(--font-jost)", marginTop: '10px', letterSpacing: '0.1em' }}>
            ENQUIRE NOW
          </button>
        </div>

        {/* RIGHT — image */}
        <div className="w-full lg:w-7/12 flex" data-aos="fade-left">
          <div style={{
            position: 'relative', width: '100%', minHeight: '260px',
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
          }}>
            <Image
              src={overviewImage} alt="Eldeco Sector 80 Gurgaon" fill
              className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority
            />
            <div style={{ position: 'absolute', bottom: '12px', right: '16px', color: '#fff', fontSize: '12px', fontFamily: F_SANS, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              Artistic Impression
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
)

export default Overview
