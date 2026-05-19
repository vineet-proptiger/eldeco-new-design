'use client'
import React from 'react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const rows = [
  { type: '3 BHK', size: '1800 SQ. FT.*', price: '₹ 3.60 Cr*' },
  { type: '3 BHK + Servant', size: '2400 SQ. FT.*', price: 'Ask For Price' },
  { type: '4 BHK', size: '3200 SQ. FT.*', price: 'Ask For Price' },
]

const Pricing = ({ setIsOpen }) => (
  <section id="pricing" style={{ padding: '72px 0', background: '#1a1a1a' }}>
    <div className="max-w-5xl mx-auto px-4 md:px-8">

      {/* Heading */}
      <h2
        data-aos="fade-up"
        style={{
          fontFamily: F_JOST, fontWeight: '800',
          fontSize: 'clamp(28px,4vw,40px)',
          color: '#ffffff', textAlign: 'center',
          textTransform: 'uppercase', letterSpacing: '0.04em',
          margin: '0 0 48px',
        }}
      >
        PRICE LIST
      </h2>

      {/* ── Mobile: Cards (hidden on md+) ── */}
      <div className="flex flex-col gap-4 md:hidden">
        {rows.map((row, i) => (
          <div
            key={i}
            data-aos="fade-up"
            style={{
              background: '#222222',
              border: '2px solid #888888',
              borderRadius: '4px',
              padding: '20px 18px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span style={{
                fontFamily: F_JOST, fontWeight: '700', fontSize: '15px',
                color: '#ffffff', letterSpacing: '0.02em',
              }}>
                {row.type}
              </span>
              <span style={{
                fontFamily: F_JOST, fontWeight: '700', fontSize: '14px',
                color: '#C4952A', letterSpacing: '0.04em', textAlign: 'right',
              }}>
                {row.price}
              </span>
            </div>
            <p style={{
              fontFamily: F_SANS, fontSize: '12px',
              color: '#aaaaaa', letterSpacing: '0.04em',
              margin: '0 0 16px',
            }}>
              {row.size}
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="btn-gold"
              style={{ width: '100%', padding: '10px', fontSize: '12px', letterSpacing: '0.08em' }}
            >
              ENQUIRE NOW
            </button>
          </div>
        ))}
      </div>

      {/* ── Desktop: Table (hidden below md) ── */}
      <div className="hidden md:block" data-aos="fade-up" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', border: '2px solid #888888' }}>
          <thead>
            <tr style={{ background: '#0d0d0d' }}>
              {['TYPE', 'SIZES', 'PRICE', 'UNLOCK OFFERS'].map((col, i) => (
                <th key={i} style={{
                  fontFamily: F_JOST, fontWeight: '700', fontSize: '13px',
                  color: '#C4952A', letterSpacing: '0.12em',
                  textTransform: 'uppercase', textAlign: 'center',
                  padding: '20px 16px',
                  border: '2px solid #888888',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#1a1a1a' : '#252525' }}>
                <td style={{
                  fontFamily: F_JOST, fontWeight: '600', fontSize: '14px',
                  color: '#ffffff', textAlign: 'center', padding: '18px 16px',
                  border: '2px solid #888888', letterSpacing: '0.02em',
                }}>
                  {row.type}
                </td>
                <td style={{
                  fontFamily: F_SANS, fontSize: '13px',
                  color: '#cccccc', textAlign: 'center', padding: '18px 16px',
                  border: '2px solid #888888', letterSpacing: '0.04em',
                }}>
                  {row.size}
                </td>
                <td style={{
                  fontFamily: F_JOST, fontWeight: '600', fontSize: '14px',
                  color: '#cccccc', textAlign: 'center', padding: '18px 16px',
                  border: '2px solid #888888', letterSpacing: '0.04em',
                }}>
                  {row.price}
                </td>
                <td style={{ textAlign: 'center', padding: '14px 16px', border: '2px solid #888888' }}>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="btn-gold"
                    style={{ padding: '9px 20px', fontSize: '12px', letterSpacing: '0.08em' }}
                  >
                    ENQUIRE NOW
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <p data-aos="fade-up" style={{
        fontFamily: F_SANS, fontSize: '12px',
        color: '#666', textAlign: 'center', marginTop: '20px', letterSpacing: '0.02em',
      }}>
        * Prices are subject to change. Government taxes & charges extra as applicable.
      </p> */}
    </div>
  </section>
)

export default Pricing
