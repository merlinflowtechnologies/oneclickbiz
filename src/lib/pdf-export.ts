'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import { BookingSlot, LeadItem, ProductItem, DigitalProfile } from '@/lib/types';
import { downloadBlob, serverDownload } from '@/lib/download-utils';

// Helper to format date
function getFormattedDateTime(): string {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Saves the PDF directly to the user's computer/Downloads folder.
 * Uses client-side binary octet-stream to guarantee immediate saving to disk.
 */
export function savePDF(doc: jsPDF, filename: string) {
  if (typeof window === 'undefined') return { doc, blobUrl: '', filename };

  let blobUrl = '';
  try {
    // 1. Standard application/pdf blob for UI modal previewing
    const previewBlob = doc.output('blob');
    blobUrl = URL.createObjectURL(previewBlob);
  } catch (e) {
    console.warn('savePDF blob creation warning:', e);
  }

  // 2. Direct binary octet-stream download (forces Chrome/Safari to save to disk, bypassing tab viewer)
  try {
    const rawBuffer = doc.output('arraybuffer');
    const downloadBlobObj = new Blob([rawBuffer], { type: 'application/octet-stream' });
    downloadBlob(downloadBlobObj, filename);
  } catch (err) {
    console.warn('savePDF arraybuffer export failed, using blob fallback:', err);
    try {
      const fallbackBlob = doc.output('blob');
      downloadBlob(fallbackBlob, filename);
    } catch (fallbackErr) {
      console.error('savePDF download failed:', fallbackErr);
    }
  }

  return { doc, blobUrl, filename };
}

/**
 * Generates & downloads a formatted PDF report for Bookings & Appointments
 */
export function exportBookingsPDF(bookings: BookingSlot[], businessName: string = 'Kishore Patel - Himastech Digital Reality') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  // 1. Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ', 40, 35);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text('Appointments & Consultation Bookings Report', 40, 52);

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(8);
  doc.text(`Generated: ${getFormattedDateTime()}`, doc.internal.pageSize.getWidth() - 40, 35, { align: 'right' });
  doc.text(`Business: ${businessName}`, doc.internal.pageSize.getWidth() - 40, 50, { align: 'right' });

  // 2. Metrics Summary Box
  const total = bookings.length;
  const confirmed = bookings.filter(b => b.status === 'CONFIRMED').length;
  const pending = bookings.filter(b => b.status === 'PENDING').length;
  const cancelled = bookings.filter(b => b.status === 'CANCELLED').length;

  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(40, 95, doc.internal.pageSize.getWidth() - 80, 50, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);

  doc.text(`Total Bookings: ${total}`, 60, 123);
  doc.setTextColor(16, 185, 129); // emerald-600
  doc.text(`Confirmed: ${confirmed}`, 180, 123);
  doc.setTextColor(245, 158, 11); // amber-500
  doc.text(`Pending: ${pending}`, 290, 123);
  doc.setTextColor(239, 68, 68); // rose-500
  doc.text(`Cancelled: ${cancelled}`, 400, 123);

  // 3. Table
  const tableData = bookings.map(b => [
    b.customerName,
    b.serviceTitle,
    `${b.date} (${b.time})`,
    `${b.customerPhone}\n${b.customerEmail}`,
    b.status
  ]);

  autoTable(doc, {
    startY: 160,
    head: [['Client Name', 'Service Booked', 'Scheduled Slot', 'Contact Details', 'Status']],
    body: tableData,
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
      cellPadding: 6
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 4) {
        const val = data.cell.raw as string;
        if (val === 'CONFIRMED') {
          data.cell.styles.textColor = [16, 185, 129];
          data.cell.styles.fontStyle = 'bold';
        } else if (val === 'PENDING') {
          data.cell.styles.textColor = [217, 119, 6];
          data.cell.styles.fontStyle = 'bold';
        } else if (val === 'CANCELLED') {
          data.cell.styles.textColor = [225, 29, 72];
        }
      }
    }
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Page ${i} of ${pageCount} | Generated by OneClickBiz Business Intelligence Suite`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 20,
      { align: 'center' }
    );
  }

  return savePDF(doc, `oneclickbiz-bookings-report-${Date.now()}.pdf`);
}

/**
 * Generates & downloads a formatted PDF report for Inquiries & Leads Pipeline
 */
export function exportLeadsPDF(leads: LeadItem[], businessName: string = 'Kishore Patel - Himastech Digital Reality') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  // 1. Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ', 40, 35);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(236, 72, 153); // pink-400
  doc.text('Captured Leads & Customer Inquiries Pipeline', 40, 52);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text(`Generated: ${getFormattedDateTime()}`, doc.internal.pageSize.getWidth() - 40, 35, { align: 'right' });
  doc.text(`Business: ${businessName}`, doc.internal.pageSize.getWidth() - 40, 50, { align: 'right' });

  // 2. Metrics Summary Box
  const total = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const contacted = leads.filter(l => l.status === 'CONTACTED').length;
  const converted = leads.filter(l => l.status === 'CONVERTED').length;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(40, 95, doc.internal.pageSize.getWidth() - 80, 50, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);

  doc.text(`Total Leads: ${total}`, 60, 123);
  doc.setTextColor(99, 102, 241); // indigo-500
  doc.text(`New: ${newLeads}`, 180, 123);
  doc.setTextColor(245, 158, 11); // amber-500
  doc.text(`Contacted: ${contacted}`, 290, 123);
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text(`Converted: ${converted}`, 400, 123);

  // 3. Table
  const tableData = leads.map(l => [
    l.name,
    new Date(l.createdAt).toLocaleDateString(),
    `${l.phone || 'N/A'}\n${l.email}`,
    l.status,
    l.message
  ]);

  autoTable(doc, {
    startY: 160,
    head: [['Lead Name', 'Received Date', 'Contact Info', 'Pipeline Status', 'Inquiry Message']],
    body: tableData,
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
      cellPadding: 6
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      4: { cellWidth: 180 }
    }
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Page ${i} of ${pageCount} | Generated by OneClickBiz Business Intelligence Suite`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 20,
      { align: 'center' }
    );
  }

  return savePDF(doc, `oneclickbiz-leads-report-${Date.now()}.pdf`);
}

/**
 * Generates & downloads a formatted PDF report for WhatsApp Store Catalog
 */
export function exportStoreCatalogPDF(products: ProductItem[], businessName: string = 'Kishore Patel - Himastech Digital Reality') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  // 1. Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ', 40, 35);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(52, 211, 153);
  doc.text('WhatsApp E-Commerce Store & Product Catalog', 40, 52);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text(`Generated: ${getFormattedDateTime()}`, doc.internal.pageSize.getWidth() - 40, 35, { align: 'right' });
  doc.text(`Business: ${businessName}`, doc.internal.pageSize.getWidth() - 40, 50, { align: 'right' });

  // 2. Metrics Box
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  const totalValue = products.reduce((acc, p) => acc + (p.price || 0), 0);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(40, 95, doc.internal.pageSize.getWidth() - 80, 50, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);

  doc.text(`Total Catalog Items: ${products.length}`, 60, 123);
  doc.setTextColor(16, 185, 129);
  doc.text(`Categories: ${categories.length}`, 220, 123);
  doc.setTextColor(99, 102, 241);
  doc.text(`Combined Value: Rs. ${totalValue.toLocaleString()}`, 360, 123);

  // 3. Table
  const tableData = products.map((p, idx) => [
    `#${idx + 1}`,
    p.name,
    p.category || 'General',
    `Rs. ${p.price.toLocaleString()}`,
    p.description
  ]);

  autoTable(doc, {
    startY: 160,
    head: [['Item #', 'Product / Package Title', 'Category', 'Price', 'Description & Features']],
    body: tableData,
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
      cellPadding: 6
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 130 },
      2: { cellWidth: 90 },
      3: { cellWidth: 70 },
      4: { cellWidth: 180 }
    }
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Page ${i} of ${pageCount} | Generated by OneClickBiz Business Intelligence Suite`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 20,
      { align: 'center' }
    );
  }

  return savePDF(doc, `oneclickbiz-store-catalog-${Date.now()}.pdf`);
}

/**
 * Generates & downloads a comprehensive Executive Business Summary PDF
 */
export function exportExecutiveSummaryPDF({
  profile,
  bookings,
  leads
}: {
  profile: DigitalProfile;
  bookings: BookingSlot[];
  leads: LeadItem[];
}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  // 1. Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 85, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ', 40, 35);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(129, 140, 248); // indigo-400
  doc.text('Executive Digital Business Performance & Intelligence Report', 40, 52);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text(`Generated: ${getFormattedDateTime()}`, doc.internal.pageSize.getWidth() - 40, 35, { align: 'right' });
  doc.text(`Owner: ${profile.name} (${profile.company || 'Direct'})`, doc.internal.pageSize.getWidth() - 40, 50, { align: 'right' });

  // 2. Business Profile Summary Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(40, 100, doc.internal.pageSize.getWidth() - 80, 75, 6, 6, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${profile.name} - ${profile.designation}`, 55, 120);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${profile.email} | Phone: ${profile.phone} | WhatsApp: +${profile.whatsapp}`, 55, 136);
  doc.text(`Live vCard: https://oneclickbiz.com/v/${profile.slug} | Theme: ${profile.theme}`, 55, 150);
  doc.text(`Total Views: ${profile.stats.views.toLocaleString()} | QR Scans: ${profile.stats.qrScans} | Direct Visits: ${profile.stats.nfcTaps} | VCF Saved: ${profile.stats.vcfDownloads}`, 55, 164);

  // 3. Section: Recent Bookings Table
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Consultation Bookings & Appointments', 40, 195);

  const bookingsData = bookings.slice(0, 10).map(b => [
    b.customerName,
    b.serviceTitle,
    `${b.date} ${b.time}`,
    b.customerPhone,
    b.status
  ]);

  autoTable(doc, {
    startY: 205,
    head: [['Client Name', 'Service', 'Date & Time', 'Phone', 'Status']],
    body: bookingsData.length > 0 ? bookingsData : [['No appointments recorded yet.', '-', '-', '-', '-']],
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8, cellPadding: 4.5 }
  });

  // 4. Section: Recent Captured Leads
  const finalY = (doc as any).lastAutoTable.finalY + 25;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Customer Inquiries & Captured Leads', 40, finalY);

  const leadsData = leads.slice(0, 10).map(l => [
    l.name,
    new Date(l.createdAt).toLocaleDateString(),
    l.email,
    l.status,
    l.message.slice(0, 70) + (l.message.length > 70 ? '...' : '')
  ]);

  autoTable(doc, {
    startY: finalY + 10,
    head: [['Lead Name', 'Date', 'Email', 'Pipeline Status', 'Inquiry Message']],
    body: leadsData.length > 0 ? leadsData : [['No leads recorded yet.', '-', '-', '-', '-']],
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: { fillColor: [219, 39, 119], textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8, cellPadding: 4.5 }
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Page ${i} of ${pageCount} | Generated by OneClickBiz Business Intelligence Suite`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 20,
      { align: 'center' }
    );
  }

  return savePDF(doc, `oneclickbiz-business-summary-${Date.now()}.pdf`);
}

/**
 * Generates & downloads a formatted Tax Invoice PDF receipt
 */
export function exportInvoicePDF({
  invoiceNumber = 'INV-2026-8942',
  date = 'August 15, 2026',
  planName = 'Pro Professional Plan (Annual Subscription)',
  amount = 'Rs. 1,599.00',
  customerName = 'Kishore Patel',
  companyName = 'Himastech Digital Reality',
  gstNumber = '29ABCDE1234F1Z5'
}: {
  invoiceNumber?: string;
  date?: string;
  planName?: string;
  amount?: string;
  customerName?: string;
  companyName?: string;
  gstNumber?: string;
}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  // 1. Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 90, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ', 40, 40);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Smart Digital Business Profiles & Brochure Suite', 40, 56);
  doc.text('GSTIN: 29AAHCO1234M1Z8 | support@oneclickbiz.in', 40, 68);

  doc.setTextColor(52, 211, 153);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TAX INVOICE', doc.internal.pageSize.getWidth() - 40, 42, { align: 'right' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #: ${invoiceNumber}`, doc.internal.pageSize.getWidth() - 40, 58, { align: 'right' });
  doc.text(`Date: ${date}`, doc.internal.pageSize.getWidth() - 40, 70, { align: 'right' });

  // 2. Billed To Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(40, 110, doc.internal.pageSize.getWidth() - 80, 70, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Billed To:', 55, 128);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`${customerName} | ${companyName}`, 55, 142);
  doc.text(`GSTIN / PAN: ${gstNumber} | Place of Supply: Karnataka (29)`, 55, 155);
  doc.text(`Payment Status: PAID (Via Cashfree Gateway / Auto-Renew)`, 55, 168);

  // 3. Line Items Table
  autoTable(doc, {
    startY: 200,
    head: [['Description', 'HSN/SAC', 'Qty', 'Unit Price', 'Tax (18% GST)', 'Total Amount']],
    body: [
      [
        planName,
        '998314',
        '1 Year',
        'Rs. 1,355.08',
        'Rs. 243.92',
        amount
      ]
    ],
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontSize: 8.5, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8.5, textColor: [30, 41, 59], cellPadding: 8 }
  });

  // 4. Totals summary
  const tableBottom = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`Total Amount Paid: ${amount}`, doc.internal.pageSize.getWidth() - 40, tableBottom, { align: 'right' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('This is a computer-generated tax invoice and requires no physical signature.', 40, tableBottom + 40);

  return savePDF(doc, `oneclickbiz-invoice-${invoiceNumber}.pdf`);
}

/**
 * Generates & downloads a 300 DPI Print-Ready Visiting Card PDF (Front & Back)
 */
export async function exportVisitingCardPDF(
  card: {
    fullName?: string;
    designation?: string;
    companyName?: string;
    tagline?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    slug?: string;
    accentColor?: string;
    orientation?: 'horizontal' | 'vertical';
    finish?: string;
  },
  options: { shouldDownload?: boolean } = { shouldDownload: true }
) {
  // ISO Business Card dimensions in pt (3.5 in x 2.0 in = 252 x 144 pt)
  const isHorizontal = card.orientation !== 'vertical';
  const width = isHorizontal ? 252 : 144;
  const height = isHorizontal ? 144 : 252;

  const doc = new jsPDF({
    orientation: isHorizontal ? 'landscape' : 'portrait',
    unit: 'pt',
    format: [width, height]
  });

  const primaryColor = [15, 23, 42]; // slate-900
  const accentHex = card.accentColor || '#6366f1';

  // --- PAGE 1: FRONT OF CARD ---
  // Background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, width, height, 'F');

  // Decorative Accent Bar
  doc.setFillColor(99, 102, 241); // indigo
  doc.rect(0, 0, 4, height, 'F');

  // Top NFC Smart Indicator Badge
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(width - 52, 8, 44, 13, 3, 3, 'F');
  doc.setTextColor(52, 211, 153);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.text('NFC TAP ENABLED', width - 30, 17, { align: 'center' });

  // Company Name & Tagline
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  const compLines = doc.splitTextToSize((card.companyName || 'Himastech Digital Reality').toUpperCase(), width - 70);
  doc.text(compLines, 16, 20);

  if (card.tagline) {
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(card.tagline, 16, 32);
  }

  // Cardholder Name & Designation
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(card.fullName || 'Kishore Patel', 16, 56);

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(129, 140, 248); // indigo-300
  doc.text(card.designation || 'Founder & Managing Director', 16, 67);

  // Contact Details Grid
  doc.setFontSize(5.5);
  doc.setTextColor(203, 213, 225); // slate-300

  let contactY = 84;
  if (card.phone) {
    doc.text(`Tel: ${card.phone}`, 16, contactY);
    contactY += 8.5;
  }
  if (card.email) {
    doc.text(`Email: ${card.email}`, 16, contactY);
    contactY += 8.5;
  }
  if (card.website) {
    doc.text(`Web: ${card.website}`, 16, contactY);
    contactY += 8.5;
  }
  if (card.address && contactY < height - 6) {
    doc.setFontSize(4.8);
    doc.text(`Location: ${card.address}`, 16, contactY);
  }

  // --- PAGE 2: BACK OF CARD (QR & Socials) ---
  doc.addPage([width, height], isHorizontal ? 'landscape' : 'portrait');

  // Background
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, width, height, 'F');

  // Inner Border
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.75);
  doc.roundedRect(6, 6, width - 12, height - 12, 4, 4, 'D');

  // Generate crisp QR code
  try {
    const qrUrl = `https://oneclickbiz.in/v/${card.slug || 'alex'}`;
    const qrDataUrl = await QRCode.toDataURL(qrUrl, {
      margin: 1,
      width: 160,
      color: { dark: '#ffffff', light: '#0f172a' }
    });
    doc.addImage(qrDataUrl, 'PNG', 16, (height - 64) / 2, 64, 64);
  } catch (err) {
    console.error('QR code generation error:', err);
  }

  // Back text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('SCAN OR TAP TO CONNECT', 90, 48);

  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Save contact, view catalog & book appointments', 90, 60);

  doc.setFontSize(7);
  doc.setTextColor(99, 102, 241);
  doc.setFont('helvetica', 'bold');
  doc.text(`oneclickbiz.in/v/${card.slug || 'alex'}`, 90, 78);

  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Powered by OneClickBiz | Smart NFC Cloud Profile', 90, 96);

  // Save the PDF and open on screen
  const filename = `oneclickbiz-visiting-card-${(card.slug || 'card').toLowerCase()}.pdf`;
  if (options.shouldDownload === false) {
    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    return { doc, blobUrl, filename };
  }
  return savePDF(doc, filename);
}

/**
 * Generates & downloads a formatted Multi-Page Print Brochure PDF
 */
export async function exportBrochurePDF(
  brochure: {
    companyName?: string;
    tagline?: string;
    headline?: string;
    subheadline?: string;
    aboutText?: string;
    missionText?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    slug?: string;
    format?: string;
    stats?: {
      stat1Number?: string;
      stat1Label?: string;
      stat2Number?: string;
      stat2Label?: string;
      stat3Number?: string;
      stat3Label?: string;
    };
    services?: Array<{ title: string; description: string; price: string }>;
    whyChooseUs?: string[];
    testimonial?: { quote: string; author: string; role: string };
  },
  options: { shouldDownload?: boolean } = { shouldDownload: true }
) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --- PAGE 1: COVER & OVERVIEW ---
  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 130, 'F');

  // Accent Line
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 126, pageWidth, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text((brochure.companyName || 'Himastech Digital Reality').toUpperCase(), 40, 52);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(brochure.tagline || 'Immersive 3D Tours | Real Estate Marketing', 40, 72);

  doc.setTextColor(52, 211, 153);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL BUSINESS BROCHURE & CATALOG (2026)', 40, 95);

  // QR Code on Cover
  try {
    const qrUrl = `https://oneclickbiz.in/v/${brochure.slug || 'alex'}`;
    const qrDataUrl = await QRCode.toDataURL(qrUrl, {
      margin: 1,
      width: 180,
      color: { dark: '#ffffff', light: '#0f172a' }
    });
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 110, 25, 70, 70);
    doc.setTextColor(203, 213, 225);
    doc.setFontSize(6.5);
    doc.text('Scan for vCard Profile', pageWidth - 75, 106, { align: 'center' });
  } catch (e) {
    console.error(e);
  }

  // Hero Headline & Subheadline
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const headlineLines = doc.splitTextToSize(brochure.headline || 'Transforming Brands Into Industry Leaders', pageWidth - 80);
  doc.text(headlineLines, 40, 165);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const subheadLines = doc.splitTextToSize(brochure.subheadline || 'Bespoke UI/UX Design, Web Platforms & High-Conversion Growth Systems', pageWidth - 80);
  doc.text(subheadLines, 40, 195);

  // Key Metrics Bar
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(40, 225, pageWidth - 80, 50, 8, 8, 'FD');

  const s = brochure.stats || {};
  const colWidth = (pageWidth - 80) / 3;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(99, 102, 241);
  doc.text(s.stat1Number || '80+', 40 + colWidth * 0.5, 248, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(s.stat1Label || 'Projects Delivered', 40 + colWidth * 0.5, 262, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text(s.stat2Number || '99.4%', 40 + colWidth * 1.5, 248, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(s.stat2Label || 'Client Satisfaction', 40 + colWidth * 1.5, 262, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(244, 63, 94);
  doc.text(s.stat3Number || 'Rs. 12Cr+', 40 + colWidth * 2.5, 248, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(s.stat3Label || 'Revenue Generated', 40 + colWidth * 2.5, 262, { align: 'center' });

  // Company Overview & Mission
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Company Overview', 40, 305);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const aboutLines = doc.splitTextToSize(brochure.aboutText || 'We partner with visionary founders and ambitious enterprises to craft world-class digital experiences that generate measurable revenue.', pageWidth - 80);
  doc.text(aboutLines, 40, 322);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Our Mission', 40, 370);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const missionLines = doc.splitTextToSize(brochure.missionText || 'Our mission is to eliminate digital friction and elevate modern businesses through cutting-edge technology and unmistakable design excellence.', pageWidth - 80);
  doc.text(missionLines, 40, 387);

  // Why Choose Us Bullet Points
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Why Partner With Us', 40, 440);

  const whyList = brochure.whyChooseUs || [
    'Bespoke, hand-crafted digital solutions with 99.9% uptime SLA guarantee',
    'Integrated WhatsApp Commerce & 1-click booking automated funnels',
    'Comprehensive analytics tracking and lead capture optimization',
    'Dedicated account manager with priority 24/7 client concierge support'
  ];

  let whyY = 460;
  whyList.forEach((item) => {
    doc.setFillColor(99, 102, 241);
    doc.circle(46, whyY - 3, 2.5, 'F');
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const itemLines = doc.splitTextToSize(item, pageWidth - 100);
    doc.text(itemLines, 56, whyY);
    whyY += (itemLines.length * 12) + 6;
  });

  // Testimonial Quote Box
  if (brochure.testimonial) {
    doc.setFillColor(238, 242, 255); // indigo-50
    doc.setDrawColor(199, 210, 254);
    doc.roundedRect(40, whyY + 10, pageWidth - 80, 65, 6, 6, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(67, 56, 202);
    const quoteLines = doc.splitTextToSize(`"${brochure.testimonial.quote}"`, pageWidth - 110);
    doc.text(quoteLines, 55, whyY + 30);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`- ${brochure.testimonial.author}, ${brochure.testimonial.role}`, 55, whyY + 62);
  }

  // --- PAGE 2: SERVICES & CONTACT CATALOG ---
  doc.addPage('a4', 'portrait');

  // Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 60, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Services & Solutions Catalog', 40, 36);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(52, 211, 153);
  doc.text(`${brochure.companyName || 'Himastech Digital Reality'} | Page 2 of 2`, pageWidth - 40, 36, { align: 'right' });

  // Services Table
  const servicesData = (brochure.services || [
    { title: 'Brand Identity & Design System', description: 'Complete typography, logo suites, and design tokens for luxury digital brands.', price: 'Starting Rs. 49,999' },
    { title: 'High-Conversion Web Application', description: 'Next.js 16 full-stack web platforms with instant page transitions and SEO.', price: 'Starting Rs. 29,999' },
    { title: 'WhatsApp Store & Growth Funnels', description: 'Automated catalog checkout and CRM lead pipelines for direct sales.', price: 'Starting Rs. 19,999' }
  ]).map(s => [s.title, s.description, s.price]);

  autoTable(doc, {
    startY: 85,
    head: [['Service / Solution', 'Scope & Deliverables', 'Pricing / Retainer']],
    body: servicesData,
    margin: { left: 40, right: 40 },
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontSize: 9, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8.5, textColor: [30, 41, 59], cellPadding: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 150 },
      2: { fontStyle: 'bold', textColor: [99, 102, 241], halign: 'right', cellWidth: 110 }
    }
  });

  const servTableBottom = (doc as any).lastAutoTable.finalY + 30;

  // Contact & Inquiries Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(40, servTableBottom, pageWidth - 80, 110, 8, 8, 'FD');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Get in Touch & Book Consultations', 55, servTableBottom + 25);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Phone: ${brochure.phone || '+91 98765 43210'}`, 55, servTableBottom + 45);
  doc.text(`Email: ${brochure.email || 'alex@apexstudio.design'}`, 55, servTableBottom + 62);
  doc.text(`Website: ${brochure.website || 'apexstudio.design'}`, 55, servTableBottom + 79);
  doc.text(`Address: ${brochure.address || '100 Feet Rd, Indiranagar, Bangalore, 560038'}`, 55, servTableBottom + 96);

  // Footer Note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Created & Published with OneClickBiz Digital Card & Brochure Suite | https://oneclickbiz.in', pageWidth / 2, pageHeight - 30, { align: 'center' });

  const formatPrefix = brochure.format ? `${brochure.format}-` : '';
  const filename = `oneclickbiz-brochure-${formatPrefix}${(brochure.slug || 'brochure').toLowerCase()}.pdf`;
  if (options.shouldDownload === false) {
    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    return { doc, blobUrl, filename };
  }
  return savePDF(doc, filename);
}

/**
 * Super Admin: Exports Full Platform Audit & Financial Report PDF
 */
export function exportAdminPlatformAuditPDF(metrics: any, totalMembers: number) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 90, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ PLATFORM AUDIT', 40, 40);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(244, 63, 94); // rose-500
  doc.text('SUPER ADMIN EXECUTIVE & FINANCIAL TELEMETRY REPORT', 40, 58);

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(8.5);
  doc.text(`Generated: ${getFormattedDateTime()}`, pageWidth - 40, 40, { align: 'right' });
  doc.text('Classification: STRICTLY CONFIDENTIAL', pageWidth - 40, 56, { align: 'right' });

  // Summary Metrics Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(40, 105, pageWidth - 80, 60, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`Total Accounts: ${metrics.totalUsers || totalMembers}`, 55, 132);
  doc.text(`Active Profiles: ${metrics.totalProfiles || 2190}`, 190, 132);
  doc.text(`ARR: Rs. ${((metrics.totalRevenue || 2245000) / 100000).toFixed(2)} Lakhs`, 320, 132);
  doc.text(`MRR: Rs. ${((metrics.mrr || 187083) / 1000).toFixed(1)}k`, 450, 132);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8);
  doc.text(`Total Taps & Scans: ${((metrics.totalTaps + metrics.totalScans) / 1000).toFixed(1)}k`, 55, 150);
  doc.text(`WhatsApp Orders: ${metrics.totalWhatsAppOrders || 8420}`, 190, 150);
  doc.text(`Consultation Bookings: ${metrics.totalBookings || 5190}`, 320, 150);
  doc.text('System Uptime: 99.98%', 450, 150);

  // Section 1: Subscription Tier Breakdown Table
  const tierRows = [
    ['Basic Tier (Rs. 999/yr)', `${metrics.planBreakdown?.basic?.count || 820} Accounts`, '55.3%', `Rs. ${metrics.planBreakdown?.basic?.revenue?.toLocaleString() || '8,19,180'}`],
    ['Pro Tier (Rs. 1,599/yr)', `${metrics.planBreakdown?.pro?.count || 480} Accounts`, '32.4%', `Rs. ${metrics.planBreakdown?.pro?.revenue?.toLocaleString() || '7,67,520'}`],
    ['Advanced Tier (Rs. 2,199/yr)', `${metrics.planBreakdown?.advanced?.count || 182} Accounts`, '12.3%', `Rs. ${metrics.planBreakdown?.advanced?.revenue?.toLocaleString() || '4,00,218'}`],
    ['Consolidated Platform Total', `${metrics.totalUsers || totalMembers} Accounts`, '100.0%', `Rs. ${(metrics.totalRevenue || 2245000).toLocaleString()}`]
  ];

  autoTable(doc, {
    startY: 180,
    head: [['Subscription Tier', 'Active Subscribers', '% Share', 'Gross Annual Revenue (INR)']],
    body: tierRows,
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontSize: 9, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8.5, textColor: [30, 41, 59] },
    footStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold' }
  });

  const auditTableY = (doc as any).lastAutoTable.finalY + 25;

  // Infrastructure & System Compliance Box
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(40, auditTableY, pageWidth - 80, 100, 6, 6, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Infrastructure Health & Compliance Standards', 55, auditTableY + 24);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('- Database Engine: PostgreSQL Prisma Cluster (BLR1 Bengaluru Region)', 55, auditTableY + 44);
  doc.text('- Authentication & Role-Based Access: Super Admin Master Key Verified', 55, auditTableY + 60);
  doc.text('- Payment Gateway: Cashfree PG v3 (Automated UPI, Cards & NetBanking)', 55, auditTableY + 76);
  doc.text('- Engineering & Architecture: Merlinflow Technologies Pvt Ltd (24/7 SLA)', 55, auditTableY + 92);
  doc.text('- Data Privacy: ISO 27001 / Indian DPDP Act 2023 Compliant Storage', 55, auditTableY + 108);

  // Footer Note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('OneClickBiz Platform Authority | Engineered by Merlinflow Technologies Pvt Ltd', pageWidth / 2, pageHeight - 30, { align: 'center' });

  return savePDF(doc, `oneclickbiz-platform-audit-${new Date().toISOString().split('T')[0]}.pdf`);
}

/**
 * Super Admin: Exports Members Directory & Subscription Ledger PDF
 */
export function exportAdminMembersPDF(users: any[], filterLabel: string = 'All Members') {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 75, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ MEMBER DIRECTORY & SUBSCRIPTION LEDGER', 40, 36);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(99, 102, 241); // indigo-400
  doc.text(`Scope: ${filterLabel} (${users.length} Records Exported)`, 40, 54);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text(`Generated: ${getFormattedDateTime()}`, pageWidth - 40, 36, { align: 'right' });
  doc.text('OneClickBiz Super Admin Master Ledger', pageWidth - 40, 52, { align: 'right' });

  // Map users to table rows
  const tableData = users.map((u, index) => [
    `#${index + 1}`,
    u.name || 'Member',
    u.businessName || 'Business',
    u.email || 'N/A',
    `oneclickbiz.in/v/${u.slug}`,
    `${u.planTier} (Rs. ${u.planCost})`,
    u.subscriptionStatus || 'ACTIVE',
    `${(u.totalTaps || 0) + (u.totalScans || 0)}`,
    u.joinedDate || '2026-08-01'
  ]);

  autoTable(doc, {
    startY: 90,
    head: [['#', 'Member Name', 'Company / Business', 'Email Address', 'Card URL', 'Plan & Fee', 'Status', 'Taps/Scans', 'Join Date']],
    body: tableData,
    margin: { left: 40, right: 40 },
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontSize: 8.5, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8, textColor: [30, 41, 59], cellPadding: 6 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { fontStyle: 'bold', cellWidth: 90 },
      2: { cellWidth: 100 },
      3: { cellWidth: 130 },
      4: { fontStyle: 'italic', textColor: [79, 70, 229], cellWidth: 130 },
      5: { fontStyle: 'bold', cellWidth: 90 },
      6: { fontStyle: 'bold', cellWidth: 60 }
    }
  });

  // Footer Note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`OneClickBiz Platform Authority | Confidential Super Admin Record | Total Members: ${users.length}`, pageWidth / 2, pageHeight - 20, { align: 'center' });

  return savePDF(doc, `oneclickbiz-members-ledger-${new Date().toISOString().split('T')[0]}.pdf`);
}

/**
 * Super Admin: Exports Revenue & Tax Ledger PDF
 */
export function exportAdminRevenueLedgerPDF(invoices: any[], totalRevenue: number, mrr: number) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 75, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ REVENUE & TAX INVOICE LEDGER', 40, 36);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(245, 158, 11); // amber-400
  doc.text(`Financial Run-Rate: Rs. ${(totalRevenue / 100000).toFixed(2)} Lakhs ARR | Rs. ${(mrr / 1000).toFixed(1)}k MRR`, 40, 54);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.text(`Generated: ${getFormattedDateTime()}`, pageWidth - 40, 36, { align: 'right' });
  doc.text('GST & Financial Accounting Record', pageWidth - 40, 52, { align: 'right' });

  const tableData = invoices.map(inv => {
    const baseAmount = Math.round(inv.amount / 1.18);
    const gstAmount = inv.amount - baseAmount;
    return [
      inv.invoiceId,
      inv.userName,
      inv.businessName,
      inv.planTier,
      `Rs. ${baseAmount}`,
      `Rs. ${gstAmount} (18%)`,
      `Rs. ${inv.amount}`,
      inv.gateway || 'Cashfree Gateway',
      inv.date,
      inv.status || 'PAID'
    ];
  });

  autoTable(doc, {
    startY: 90,
    head: [['Invoice #', 'Subscriber', 'Business Name', 'Plan Tier', 'Base Amount', 'GST (18%)', 'Total Paid', 'Payment Gateway', 'Date', 'Status']],
    body: tableData,
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontSize: 8.5, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8, textColor: [30, 41, 59], cellPadding: 6 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 70 },
      6: { fontStyle: 'bold', textColor: [16, 185, 129], cellWidth: 70 },
      9: { fontStyle: 'bold', textColor: [16, 185, 129], cellWidth: 50 }
    }
  });

  // Footer Note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('OneClickBiz Platform Authority | Official Revenue & Tax Invoice Extraction', pageWidth / 2, pageHeight - 20, { align: 'center' });

  return savePDF(doc, `oneclickbiz-revenue-ledger-${new Date().toISOString().split('T')[0]}.pdf`);
}

/**
 * Super Admin: Single Tax Invoice PDF Generator
 */
export function exportAdminSingleInvoicePDF(invoice: any) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Dark Top Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 90, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('ONECLICKBIZ', 40, 42);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(52, 211, 153);
  doc.text('TAX INVOICE & PAYMENT RECEIPT', 40, 62);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.text(`Invoice: ${invoice.invoiceId}`, pageWidth - 40, 40, { align: 'right' });
  doc.text(`Date: ${invoice.date}`, pageWidth - 40, 56, { align: 'right' });
  doc.text('Status: PAID', pageWidth - 40, 72, { align: 'right' });

  // Bill To & Vendor Info
  const startY = 120;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('ISSUED TO (SUBSCRIBER):', 40, startY);
  doc.text('ISSUED BY (PLATFORM):', pageWidth / 2 + 20, startY);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  doc.text(`Name: ${invoice.userName}`, 40, startY + 18);
  doc.text(`Company: ${invoice.businessName}`, 40, startY + 34);
  doc.text(`Email: ${invoice.email || 'subscriber@oneclickbiz.in'}`, 40, startY + 50);

  doc.text('OneClickBiz Technologies Private Limited', pageWidth / 2 + 20, startY + 18);
  doc.text('GSTIN: 29AAAAA0000A1Z5', pageWidth / 2 + 20, startY + 34);
  doc.text('Indiranagar, Bengaluru, KA - 560038', pageWidth / 2 + 20, startY + 50);

  // Line Item Table
  const basePrice = Math.round(invoice.amount / 1.18);
  const gstPrice = invoice.amount - basePrice;

  const itemRows = [
    [`OneClickBiz ${invoice.planTier} Plan - Annual Subscription`, '1 Year', `Rs. ${basePrice}`, `Rs. ${gstPrice} (18%)`, `Rs. ${invoice.amount}`]
  ];

  autoTable(doc, {
    startY: startY + 80,
    head: [['Description', 'Duration', 'Taxable Value', 'Integrated GST (18%)', 'Total Amount (INR)']],
    body: itemRows,
    margin: { left: 40, right: 40 },
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontSize: 9, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8.5, textColor: [30, 41, 59] }
  });

  const summaryY = (doc as any).lastAutoTable.finalY + 25;

  // Paid Summary Callout
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(pageWidth - 240, summaryY, 200, 65, 6, 6, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(22, 101, 52);
  doc.text(`Subtotal: Rs. ${basePrice}`, pageWidth - 225, summaryY + 20);
  doc.text(`GST (18%): Rs. ${gstPrice}`, pageWidth - 225, summaryY + 36);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Grand Total Paid: Rs. ${invoice.amount}`, pageWidth - 225, summaryY + 54);

  // Footer Note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('This is a computer-generated invoice and requires no physical signature | support@oneclickbiz.in', pageWidth / 2, pageHeight - 30, { align: 'center' });

  return savePDF(doc, `Invoice-${invoice.invoiceId}.pdf`);
}


