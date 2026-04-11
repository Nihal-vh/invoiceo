'use client';

import React, { useState, useEffect } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import styles from './page.module.css';

export default function Home() {
  const [invoiceData, setInvoiceData] = useState({
    logo: null,
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
    currency: '$',
    primaryColor: '#fdbcb4', // Default pink/coral
    enablePattern: true, // Optional center pattern
    senderName: '',
    senderEmail: '',
    senderAddress: '',
    terms: 'Payment is due within 30 days. Please make checks payable to our company.',
    footerNote: 'Thank you for taking the time to look into this matter. We look forward to your response.',
  });

  // Auto-generate today's date on initial mount if not set
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB'); // Format like DD/MM/YYYY
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const due = nextMonth.toLocaleDateString('en-GB');

    setInvoiceData((prev) => ({
      ...prev,
      date: today,
      dueDate: due,
    }));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.leftPanel}>
          <div className={styles.panelHeader}>
             <h1>Invoice Generator</h1>
             <button onClick={handlePrint} className={styles.printBtn}>
               Export to PDF
             </button>
          </div>
          <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
        </div>
        <div className={styles.rightPanel}>
          <InvoicePreview data={invoiceData} />
        </div>
      </div>
    </main>
  );
}
