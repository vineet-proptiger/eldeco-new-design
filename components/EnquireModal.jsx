'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { buildTrackingFields } from '../lib/formMeta'

const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const fieldStyle = {
  width: '100%',
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '3px',
  padding: '11px 14px',
  color: '#fff',
  fontSize: '14px',
  fontFamily: F_SANS,
  outline: 'none',
  caretColor: '#C4952A',
}

const EnquireModal = ({ isOpen, setIsOpen }) => {
  const autoTriggered = useRef(false)
  const intervalRef = useRef(null)

  const [form, setForm] = useState({ fullname: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  /* ── Auto-trigger (same as before) ── */
  useEffect(() => {
    if (autoTriggered.current) return
    const initial = setTimeout(() => {
      autoTriggered.current = true
      setIsOpen(true)
      intervalRef.current = setInterval(() => setIsOpen(true), 30000)
    }, 30000)
    return () => {
      clearTimeout(initial)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [setIsOpen])

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])


  const handle = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'phone' ? value.replace(/\D/g, '') : value }))
  }

  /* ── Submit — identical API call as LeadForm ── */
  const submit = async (e) => {
    e.preventDefault()
    if (!/^\d{10}$/.test(form.phone)) { setError('Please enter a valid 10-digit mobile number.'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields()
    const payload = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('email', form.email)
    payload.append('phone', form.phone)
    payload.append('website', '')          // honeypot — keep empty
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Popup Modal')
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
            event: 'lead_submit_success', form_name: 'Popup Modal',
            user_data: {
              email: form.email.trim() || undefined, phone: `+91${form.phone}`,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || ''
            },
          })
        }
      } else {
        setError(data.msg || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)' }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          background: '#111111',
          width: '100%',
          maxWidth: '480px',
          borderRadius: '4px',
          border: '2px solid rgba(255,255,255,0.55)',
          position: 'relative',
          padding: '36px 28px 28px',
          maxHeight: '95vh',
          overflowY: 'auto',
          animation: 'slideInRight 0.38s cubic-bezier(0.22,1,0.36,1) forwards',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Close button ── */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute', top: '14px', right: '14px',
            background: '#fff', border: 'none', cursor: 'pointer',
            width: '26px', height: '26px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '17px', fontWeight: '700', color: '#111',
            lineHeight: 1, borderRadius: '2px',
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* ── Heading ── */}
        <h2 style={{
          color: '#fff', fontFamily: F_JOST, fontWeight: '700',
          fontSize: '22px', margin: '0 0 24px', letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          ENQUIRE NOW
        </h2>

        {/* ── Success state ── */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '28px 0' }}>
            <div style={{
              width: '54px', height: '54px', borderRadius: '50%',
              background: 'rgba(196,149,42,0.15)', border: '2px solid #C4952A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <svg width="24" height="24" fill="none" stroke="#C4952A" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p style={{ color: '#fff', fontFamily: F_JOST, fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>
              Thank You!
            </p>
            <p style={{ color: '#999', fontFamily: F_SANS, fontSize: '13px' }}>
              Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>

            {/* Name */}
            <div style={{ marginBottom: '20px' }}>
              <input
                name="fullname" required value={form.fullname} onChange={handle}
                placeholder="Enter your name"
                style={fieldStyle}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <input
                name="email" type="email" value={form.email} onChange={handle}
                placeholder="Enter your email (Optional)"
                style={fieldStyle}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '20px' }}>
              <input
                name="phone" required value={form.phone} onChange={handle}
                placeholder="Enter your phone number" maxLength={10}
                style={fieldStyle}
              />
            </div>

            {error && (
              <p style={{
                color: '#f87171', fontSize: '12px', fontFamily: F_SANS,
                marginBottom: '14px',
              }}>
                {error}
              </p>
            )}

            {/* Consent */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '20px' }}>
              <input
                type="checkbox" id="popup-privacy" required defaultChecked
                style={{ accentColor: '#C4952A', marginTop: '2px', flexShrink: 0 }}
              />
              <label htmlFor="popup-privacy" style={{ fontSize: '11px', color: '#888', fontFamily: F_SANS, lineHeight: 1.6, cursor: 'pointer' }}>
                I agree to receive updates as per the{' '}
                <Link href="/privacy-policy" style={{ color: '#C4952A', textDecoration: 'underline' }}>Privacy Policy</Link>.
              </label>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* Submit */}
              <button
                type="submit" disabled={loading}
                style={{
                  background: '#C4952A', color: '#fff', border: 'none',
                  padding: '13px 48px', fontFamily: F_JOST, fontWeight: '700',
                  fontSize: '13px', letterSpacing: '0.1em', cursor: loading ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase', borderRadius: '3px',
                  opacity: loading ? 0.75 : 1, width: '100%',
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? 'SENDING...' : 'SUBMIT'}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}

export default EnquireModal
