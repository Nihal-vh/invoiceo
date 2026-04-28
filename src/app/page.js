'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import styles from './page.module.css';

export default function Home() {
  const [invoiceData, setInvoiceData] = useState({
    logo: null,
    watermarkImage: null,
    watermarkOpacity: 8, // 0-100 percent, default 8%
    invoiceNumber: '',
    date: '',
    dueDate: '',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    subject: '',
    subheading: 'We are writing to request a quotation for the following items:',
    items: [],
    discount: 0,
    taxRate: 0,
    currency: '₹',
    primaryColor: '#fdbcb4',
    enablePattern: true,
    enableBranding: true,
    senderName: '',
    senderEmail: '',
    senderAddress: '',
    terms: 'Payment is due within 30 days. Please make checks payable to our company.',
    footerNote: 'Thank you for taking the time to look into this matter. We look forward to your response.',
  });

  const [panelWidth, setPanelWidth] = useState(550);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // Auto-generate today's date on initial mount if not set
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const due = nextMonth.toLocaleDateString('en-GB');

    setInvoiceData((prev) => ({
      ...prev,
      date: today,
      dueDate: due,
    }));
  }, []);

  // Drag-to-resize handlers
  const onMouseDown = useCallback((e) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = panelWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [panelWidth]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isResizing.current) return;
      const delta = e.clientX - startX.current;
      const newWidth = Math.min(Math.max(startWidth.current + delta, 360), 750);
      setPanelWidth(newWidth);
    };

    const onMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.leftPanel} style={{ width: panelWidth, minWidth: panelWidth }}>
          <div className={styles.panelHeader}>
            <h1>Invoice Generator</h1>
            <button onClick={handlePrint} className={styles.printBtn}>
              Export to PDF
            </button>
          </div>
          <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
          <div className={styles.developerCredit}>
            Developed by <span>nihvh</span>
          </div>
        </div>
        {/* Drag handle */}
        <div className={styles.resizeHandle} onMouseDown={onMouseDown}>
          <div className={styles.resizeGrip} />
        </div>
        <div className={styles.rightPanel}>
          <InvoicePreview data={invoiceData} />
        </div>
      </div>
    </main>
  );
}
