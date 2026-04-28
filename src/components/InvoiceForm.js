'use client';

import React from 'react';
import styles from './InvoiceForm.module.css';

export default function InvoiceForm({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [...data.items, { product: '', price: 0, qty: 1 }],
    });
  };

  const removeItem = (index) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: newItems });
  };

  const generateInvoiceNumber = () => {
    const prefix = 'INV-';
    const num = Math.floor(100000 + Math.random() * 900000);
    onChange({ ...data, invoiceNumber: `${prefix}${num}` });
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Invoice Configuration</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Branding & Meta</h3>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Upload Logo</label>
            <input type="file" accept="image/*" className={styles.fileInput} onChange={(e) => handleFileUpload(e, 'logo')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Brand Color</label>
            <input
              type="color"
              name="primaryColor"
              className={styles.input}
              style={{height: '42px', padding: '4px'}}
              value={data.primaryColor || '#fdbcb4'}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Currency Symbol</label>
            <select name="currency" className={styles.input} value={data.currency} onChange={handleChange}>
              <option value="$">$ (USD)</option>
              <option value="€">€ (EUR)</option>
              <option value="£">£ (GBP)</option>
              <option value="₹">₹ (INR)</option>
              <option value="¥">¥ (JPY)</option>
            </select>
          </div>
        </div>
        <div className={styles.fieldRow}>
           <div className={styles.field}>
            <label className={styles.label}>Watermark Image</label>
            <input type="file" accept="image/*" className={styles.fileInput} onChange={(e) => handleFileUpload(e, 'watermarkImage')} />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Watermark Opacity — {data.watermarkOpacity ?? 8}%</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: '#a3a3a3' }}>0%</span>
              <input
                type="range"
                name="watermarkOpacity"
                min="0"
                max="40"
                step="1"
                value={data.watermarkOpacity ?? 8}
                onChange={handleChange}
                className={styles.rangeInput}
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: '11px', color: '#a3a3a3' }}>40%</span>
            </div>
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>
              <input
                type="checkbox"
                name="enablePattern"
                checked={data.enablePattern}
                onChange={handleChange}
                style={{ marginRight: '8px' }}
              />
              Enable Center Pattern
            </label>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              <input
                type="checkbox"
                name="enableBranding"
                checked={data.enableBranding}
                onChange={handleChange}
                style={{ marginRight: '8px' }}
              />
              Enable Platform Watermark
            </label>
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Invoice Number</label>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="invoiceNumber"
                className={styles.input}
                value={data.invoiceNumber || ''}
                onChange={handleChange}
                placeholder="INV-001"
              />
              <button type="button" onClick={generateInvoiceNumber} className={styles.btnSecondary}>
                Auto
              </button>
            </div>
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Invoice Date</label>
            <input
              type="text"
              name="date"
              className={styles.input}
              value={data.date || ''}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Due Date</label>
            <input
              type="text"
              name="dueDate"
              className={styles.input}
              value={data.dueDate || ''}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Your Details (Sender)</h3>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Your Name / Company</label>
            <input
              type="text"
              name="senderName"
              className={styles.input}
              value={data.senderName || ''}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Your Email</label>
            <input
              type="email"
              name="senderEmail"
              className={styles.input}
              value={data.senderEmail || ''}
              onChange={handleChange}
              placeholder="hello@acme.com"
            />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Your Address</label>
            <input
              type="text"
              name="senderAddress"
              className={styles.input}
              value={data.senderAddress || ''}
              onChange={handleChange}
              placeholder="123 Startup Blvd, Tech City"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Client Details (Recipient)</h3>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Client Name / Company</label>
            <input
              type="text"
              name="clientName"
              className={styles.input}
              value={data.clientName || ''}
              onChange={handleChange}
              placeholder="e.g. Dream Rich Ltd"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Client Email</label>
            <input
              type="email"
              name="clientEmail"
              className={styles.input}
              value={data.clientEmail || ''}
              onChange={handleChange}
              placeholder="client@dreamrich.com"
            />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
             <label className={styles.label}>Client Address</label>
             <input
              type="text"
              name="clientAddress"
              className={styles.input}
              value={data.clientAddress || ''}
              onChange={handleChange}
              placeholder="456 Investor Ave, Wealth City"
             />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Subject</label>
            <input
              type="text"
              name="subject"
              className={styles.input}
              value={data.subject || ''}
              onChange={handleChange}
              placeholder="Invoice for Services Rendered"
            />
          </div>
        </div>
        <div className={styles.fieldRow}>
           <div className={styles.field}>
            <label className={styles.label}>Subheading</label>
            <input
              type="text"
              name="subheading"
              className={styles.input}
              value={data.subheading || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Line Items</h3>
        {data.items.map((item, index) => (
          <div key={index} className={styles.itemRow}>
            <div className={styles.field} style={{flex: 2}}>
              <label className={styles.label}>Product/Service</label>
              <input
                type="text"
                className={styles.input}
                value={item.product}
                placeholder="Web Design"
                onChange={(e) => handleItemChange(index, 'product', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Price ({data.currency})</label>
              <input
                type="number"
                className={styles.input}
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Qty</label>
              <input
                type="number"
                className={styles.input}
                value={item.qty}
                onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
              />
            </div>
            <button
              type="button"
              className={styles.btnRemove}
              onClick={() => removeItem(index)}
              title="Remove Item"
            >
              &times;
            </button>
          </div>
        ))}
        <button type="button" className={styles.btnAdd} onClick={addItem}>
          + Add Item
        </button>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Finances & Summary</h3>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Discount Amount ({data.currency})</label>
            <input
              type="number"
              name="discount"
              className={styles.input}
              value={data.discount}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tax Rate (%)</label>
            <input
              type="number"
              name="taxRate"
              className={styles.input}
              value={data.taxRate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Footer Information</h3>
        <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>Terms & Conditions</label>
              <textarea
                name="terms"
                className={styles.textarea}
                value={data.terms || ''}
                onChange={handleChange}
                placeholder="Payment terms, bank details, etc."
              />
            </div>
        </div>
        <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>Footer Note</label>
              <textarea
                name="footerNote"
                className={styles.textarea}
                value={data.footerNote || ''}
                onChange={handleChange}
                placeholder="Thank you message"
              />
            </div>
        </div>
      </div>
    </div>
  );
}
