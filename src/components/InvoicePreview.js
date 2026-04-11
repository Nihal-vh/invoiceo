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
  
  const currency = data.currency || '$';
  const primaryColor = data.primaryColor || '#fdbcb4';

  return (
    <div 
      className={styles.previewContainer} 
      id="invoice-preview"
      style={{ '--primary-color': primaryColor }}
    >
      {/* Background Watermark Pattern */}
      <div className={styles.watermark}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
          <path d="M 30 50 L 70 50 M 50 30 L 50 70" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
          <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2"/>
        </svg>
      </div>

      {/* Background Waves - Premium Styling */}
      <div className={styles.topWave}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
           <path fill="#2b2b2b" fillOpacity="1" d="M0,0L1440,0L1440,64C1200,200 900,200 500,40C300,-40 100,50 0,160Z"></path>
           <path fill={primaryColor} fillOpacity="0.85" d="M0,0L1440,0L1440,32C1100,100 800,200 400,0C200,-100 50,50 0,100Z"></path>
        </svg>
      </div>
      
      <div className={styles.bottomWave}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill={primaryColor} fillOpacity="1" d="M0,320L1440,320L1440,160C1200,280 900,320 500,160C300,50 100,50 0,160Z"></path>
          <path fill="#2b2b2b" fillOpacity="1" d="M0,320L1440,320L1440,240C1100,350 800,350 400,240C200,150 50,250 0,300Z"></path>
        </svg>
      </div>

      {/* Invoice Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logoArea}>
            {data.logo ? (
              <img src={data.logo} alt="Logo" className={styles.logoImage} />
            ) : (
              <div className={styles.placeholderLogo}>LOGO</div>
            )}
            {data.invoiceNumber && <div className={styles.invoiceNumber}>{data.invoiceNumber}</div>}
          </div>
          <div className={styles.metaTopRight}>
            <div className={styles.dateArea}>
              <strong>Date:</strong> {data.date || '—'}
            </div>
            <div className={styles.dueDateArea}>
              <strong>Due Date:</strong> {data.dueDate || '—'}
            </div>
          </div>
        </div>

        <div className={styles.metaData}>
          <div className={styles.addressBlockRow}>
            <div className={styles.toBlock}>
              <strong>Billed To:</strong><br />
              <span className={styles.highlightText}>{data.clientName || 'Client Name'}</span>
              {data.clientAddress && <><br />{data.clientAddress}</>}
              {data.clientEmail && <><br />{data.clientEmail}</>}
            </div>
            
            <div className={styles.fromBlock}>
              <strong>From:</strong><br />
              <span className={styles.highlightText}>{data.senderName || 'Sender Name'}</span>
              {data.senderAddress && <><br />{data.senderAddress}</>}
              {data.senderEmail && <><br />{data.senderEmail}</>}
            </div>
          </div>
          
          <div className={styles.subjectBlock}>
            <strong>Subject: {data.subject || 'Invoice'}</strong>
          </div>
          
          <div className={styles.subheadingBlock}>
            {data.subheading}
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.colProduct}>PRODUCT / SERVICE</th>
              <th className={styles.colPrice}>PRICE</th>
              <th className={styles.colQty}>QTY</th>
              <th className={styles.colTotal}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className={index % 2 !== 0 ? styles.rowAlt : ''}>
                <td className={styles.colProduct}>{item.product || '—'}</td>
                <td className={styles.colPrice}>{currency}{item.price}</td>
                <td className={styles.colQty}>{item.qty}</td>
                <td className={styles.colTotal}>
                  {currency}{(parseFloat(item.price || 0) * parseInt(item.qty || 0)).toFixed(2)}
                </td>
              </tr>
            ))}
            {data.items.length === 0 && (
              <tr>
                 <td colSpan="4" className={styles.emptyTable}>No items added</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.summaryContainer}>
          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span className={styles.summaryValue}>{currency}{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className={`${styles.summaryRow} ${styles.summaryDiscount}`}>
                <span className={styles.summaryLabel}>Discount</span>
                <span className={styles.summaryValue}>-{currency}{discount.toFixed(2)}</span>
              </div>
            )}
            {taxRate > 0 && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tax ({taxRate}%)</span>
                <span className={styles.summaryValue}>+{currency}{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span className={styles.summaryLabel}>Total</span>
              <span className={styles.summaryValue}>{currency}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          {data.terms && (
            <div className={styles.termsBox}>
              <strong>Terms & Conditions</strong>
              <p>{data.terms}</p>
            </div>
          )}
          <div className={styles.footer}>
            <p className={styles.footerNote}>{data.footerNote}</p>
            <div className={styles.signature}>
              Sincerely,<br />
              <strong>{data.senderName || 'Sender Name'}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
