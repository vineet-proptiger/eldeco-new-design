'use client'
import React from 'react'
import Link from 'next/link'

const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const Footer = () => (
  <footer style={{ background: '#111111', color: '#fff' }}>

    {/* RERA + disclaimer */}
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 28px', textAlign: 'center' }}>
      <p style={{
        fontFamily: F_SANS, fontSize: '13px', color: '#888',
        lineHeight: 1.8, margin: '0 0 16px',
      }}>
        This is not the official website of the developer. The content is for informational
        purposes only and does not constitute an offer or agreement. Prices, specifications and
        availability are subject to change without notice.
      </p>
      <p style={{
        fontFamily: F_JOST, fontSize: '13px',
        color: '#C4952A', fontWeight: '600', letterSpacing: '0.04em',
      }}>
        Project RERA No.: Coming Soon (Subject to official approvals)
      </p>
    </div>

    {/* Bottom bar */}
    <div style={{
      borderTop: '1px solid #222',
      maxWidth: '1200px', margin: '0 auto',
      padding: '20px 24px',
      display: 'flex', flexWrap: 'wrap',
      alignItems: 'center', justifyContent: 'space-between', gap: '12px',
    }}>
      <p style={{ fontFamily: F_SANS, fontSize: '13px', color: '#666', margin: 0 }}>
        &copy; 2026 Godrej Crown Residences. All rights reserved.
      </p>
      <Link
        href="/privacy-policy"
        style={{ fontFamily: F_SANS, fontSize: '13px', color: '#C4952A', textDecoration: 'underline' }}
      >
        Privacy Policy
      </Link>
    </div>
  </footer>
)

export default Footer
