'use client';

import React from 'react';
import styles from './InvoicePreview.module.css';

export default function InvoicePreview({ data }) {
  const subtotal = data.items.reduce((acc, item) => acc + (parseFloat(item.price || 0) * parseInt(item.qty || 0)), 0);
  const discount = parseFloat(data.discount || 0);
  const taxRate = parseFloat(data.taxRate || 0);
  
  const taxableAmount = subtotal - discount;
  const taxAmount = taxableAmount * (taxRate / 100);
  const total = taxableAmount + taxAmount;
  
  const currency = data.currency || '₹';
  const primaryColor = data.primaryColor || '#000000';
  const wmOpacity = (data.watermarkOpacity ?? 8) / 100;

  const formatMoney = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const needsSecondPage = data.items.length > 4;

  /* ── Shared summary + footer block ── */
  const SummaryAndFooter = () => (
    <>
      {/* Totals */}
      <div className={styles.totalsRow}>
        <div /> {/* Empty left cell */}
        <div className={styles.totalsBlock}>
          <div className={styles.totalLine}>
            <span>Subtotal</span>
            <span className={styles.mono}>{currency}{formatMoney(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className={`${styles.totalLine} ${styles.discountLine}`}>
              <span>Discount</span>
              <span className={styles.mono}>−{currency}{formatMoney(discount)}</span>
            </div>
          )}
          {taxRate > 0 && (
            <div className={styles.totalLine}>
              <span>Tax ({taxRate}%)</span>
              <span className={styles.mono}>+{currency}{formatMoney(taxAmount)}</span>
            </div>
          )}
          <div className={styles.grandTotal}>
            <span>Total Due</span>
            <span className={styles.grandTotalValue}>{currency}{formatMoney(total)}</span>
          </div>
        </div>
      </div>

      {/* Footer — terms + signature */}
      <div className={styles.footerRow}>
        {data.terms && (
          <div className={styles.termsCol}>
            <div className={styles.footerLabel}>Terms & Conditions</div>
            <p className={styles.termsText}>{data.terms}</p>
          </div>
        )}
        <div className={styles.signCol}>
          {data.footerNote && <p className={styles.footerNote}>{data.footerNote}</p>}
          <div className={styles.sigBlock}>
            <div className={styles.sigLine} />
            <div className={styles.sigName}>{data.senderName || 'Authorized Signature'}</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div id="invoice-preview" style={{ '--accent': primaryColor }}>

      {/* ═══════════════════ PAGE 1 ═══════════════════ */}
      <div className={styles.page}>
        {/* Watermarks */}
        {data.watermarkImage && (
          <div className={styles.imageWatermark} style={{ opacity: wmOpacity }}>
            <img src={data.watermarkImage} alt="Watermark" />
          </div>
        )}
        {data.enablePattern && !data.watermarkImage && (
          <div className={styles.patternWatermark} style={{ opacity: wmOpacity * 3 }}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              <path d="M 30 50 L 70 50 M 50 30 L 50 70" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2"/>
            </svg>
          </div>
        )}

        {/* Top Band */}
        <div className={styles.topBand} />

        {/* Body */}
        <div className={styles.body}>

          {/* Row 1: Logo + INVOICE heading */}
          <div className={styles.row1}>
            <div className={styles.logoCell}>
              {data.logo ? (
                <img src={data.logo} alt="Logo" className={styles.logoImg} />
              ) : (
                <div className={styles.logoPlaceholder}>LOGO</div>
              )}
            </div>
            <div className={styles.titleCell}>
              <h1 className={styles.invoiceTitle}>INVOICE</h1>
              {data.invoiceNumber && (
                <div className={styles.invoiceNo}>{data.invoiceNumber}</div>
              )}
            </div>
          </div>

          {/* Row 2: Address cards + date strip */}
          <div className={styles.addressRow}>
            <div className={styles.addressCard}>
              <div className={styles.addressAccent} />
              <div className={styles.addressContent}>
                <div className={styles.addressLabel}>Billed To</div>
                <div className={styles.addressName}>{data.clientName || 'Client Name'}</div>
                {data.clientAddress && <div className={styles.addressDetail}>{data.clientAddress}</div>}
                {data.clientEmail && <div className={styles.addressEmail}>{data.clientEmail}</div>}
              </div>
            </div>
            <div className={styles.addressCard}>
              <div className={styles.addressAccent} />
              <div className={styles.addressContent}>
                <div className={styles.addressLabel}>Pay To</div>
                <div className={styles.addressName}>{data.senderName || 'Sender Name'}</div>
                {data.senderAddress && <div className={styles.addressDetail}>{data.senderAddress}</div>}
                {data.senderEmail && <div className={styles.addressEmail}>{data.senderEmail}</div>}
              </div>
            </div>
          </div>

          <div className={styles.dateStrip}>
            <div className={styles.dateItem}>
              <span className={styles.dateKey}>Invoice Date</span>
              <span className={styles.dateVal}>{data.date || '—'}</span>
            </div>
            <div className={styles.dateDivider} />
            <div className={styles.dateItem}>
              <span className={styles.dateKey}>Due Date</span>
              <span className={styles.dateVal}>{data.dueDate || '—'}</span>
            </div>
            <div className={styles.dateDivider} />
            <div className={styles.dateItem}>
              <span className={styles.dateKey}>Amount Due</span>
              <span className={styles.dateValHighlight}>{currency}{formatMoney(total)}</span>
            </div>
          </div>

          {/* Row 3: Subject */}
          {(data.subject || data.subheading) && (
            <div className={styles.row3}>
              {data.subject && (
                <div className={styles.subjectLine}>
                  <span className={styles.subjectKey}>Subject</span>
                  <span className={styles.subjectVal}>{data.subject}</span>
                </div>
              )}
              {data.subheading && (
                <div className={styles.subheadingLine}>{data.subheading}</div>
              )}
            </div>
          )}

          {/* Row 4: Items table */}
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th className={styles.thIdx}>#</th>
                <th className={styles.thDesc}>Description</th>
                <th className={styles.thPrice}>Unit Price</th>
                <th className={styles.thQty}>Qty</th>
                <th className={styles.thAmount}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, i) => (
                <tr key={i}>
                  <td className={styles.tdIdx}>{String(i + 1).padStart(2, '0')}</td>
                  <td className={styles.tdDesc}>{item.product || '—'}</td>
                  <td className={styles.tdPrice}>
                    <span className={styles.currencySymbol}>{currency}</span>
                    {formatMoney(parseFloat(item.price || 0))}
                  </td>
                  <td className={styles.tdQty}>{item.qty}</td>
                  <td className={styles.tdAmount}>
                    <span className={styles.currencySymbol}>{currency}</span>
                    {formatMoney(parseFloat(item.price || 0) * parseInt(item.qty || 0))}
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan="5" className={styles.emptyRow}>No items added yet</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* If ≤4 items, summary + footer stay on page 1 */}
          {!needsSecondPage && <SummaryAndFooter />}

        </div>
      </div>

      {/* ═══════════════════ PAGE 2 (only when >4 items) ═══════════════════ */}
      {needsSecondPage && (
        <div className={`${styles.page} ${styles.page2}`}>
          {/* Page 2 accent band */}
          <div className={styles.topBand} />

          <div className={styles.body}>
            {/* Continuation header */}
            <div className={styles.page2Header}>
              <div className={styles.page2Title}>
                INVOICE
                {data.invoiceNumber && (
                  <span className={styles.page2No}> — {data.invoiceNumber}</span>
                )}
              </div>
              <div className={styles.page2Cont}>Continued</div>
            </div>

            <SummaryAndFooter />
          </div>
        </div>
      )}

    </div>
  );
}
