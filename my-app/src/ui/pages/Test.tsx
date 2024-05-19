import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const exportTableToPDF = (tables: { data: any[], columns: { title: string; render: (data: any) => any; }[], title: string }[]) => {
  const doc = new jsPDF();

  // Cover Page
  doc.setFontSize(28);
  doc.setTextColor("#007bff"); // Your company's primary color
  doc.text('CITYSPIRIT: A Comprehensive Guide', 105, 50, { align: 'center' });
  doc.setFontSize(14);
  doc.setTextColor("#666");
  doc.text('An Admin Report', 105, 65, { align: 'center' });
  doc.setTextColor("#333");
  doc.setFontSize(12);
  doc.text('Prepared by: John Doe', 105, 75, { align: 'center' });
  const currentDate = new Date().toLocaleDateString();
  doc.text(`Date: ${currentDate}`, 105, 85, { align: 'center' });

  // Table of Contents
  doc.addPage();
  doc.setTextColor("#007bff");
  doc.setFontSize(20);
  doc.text('Table of Contents', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  const tocStartY = 40;
  let tocY = tocStartY;
  tables.forEach((table, index) => {
    doc.text(`${index + 1}. ${table.title}`, 40, tocY);
    tocY += 10;
  });

  // Report Content
  tables.forEach((table, index) => {
    doc.addPage(); // Ensure each table starts on a new page

    // Title
    doc.setTextColor("#007bff");
    doc.setFontSize(20);
    doc.text(table.title, 105, 20, { align: 'center' });

    // Table
    doc.setFontSize(11);
    doc.setTextColor(100);

    autoTable(doc, {
      startY: 40,
      head: [table.columns.map(column => column.title)],
      body: table.data.map(item => table.columns.map(column => column.render(item))),
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 1, overflow: 'linebreak' },
      columnStyles: table.columns.reduce<{ [key: string]: { cellWidth: 'auto' | 'wrap' | number } }>((styles, column, index) => {
        styles[index.toString()] = { cellWidth: column.title === 'Description' ? 50 : 25 };
        return styles;
      }, {}),
    });
  });

  // Add a page with a bar chart
  doc.addPage();
  doc.setTextColor("#007bff");
  doc.setFontSize(20);
  doc.text('Statistics', 105, 20, { align: 'center' });

  // Mock data for the bar chart
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const data = [10, 15, 7, 12, 9];

  // Draw the bar chart
  const chartTopLeftX = 20;
  const chartTopLeftY = 40;
  const chartWidth = 160;
  const chartHeight = 80;
  const barWidth = chartWidth / data.length;

  // Draw the bars
  data.forEach((value, index) => {
    const barHeight = (value / Math.max(...data)) * chartHeight;
    const barX = chartTopLeftX + index * barWidth;
    const barY = chartTopLeftY + chartHeight - barHeight;
    doc.rect(barX, barY, barWidth, barHeight, 'F');
  });

  // Draw the labels
  doc.setFontSize(10);
  doc.setTextColor(100);
  labels.forEach((label, index) => {
    const labelX = chartTopLeftX + index * barWidth + barWidth / 2;
    const labelY = chartTopLeftY + chartHeight + 10;
    doc.text(label, labelX, labelY, { align: 'center' });
  });

  doc.save(`CITYSPIRIT_Report_${new Date().getTime()}.pdf`);
};

export default exportTableToPDF;