import { jsPDF } from 'jspdf';
import React, { useState, useRef } from 'react';
import { ticketOptions } from '../data/TicketOptions';
import QRCode from 'qrcode.react';

export const downloadPDF = async (selectedTicket: any, transactionId: string, qrCodeRef: React.RefObject<HTMLDivElement>, setQrValuePDF: React.Dispatch<React.SetStateAction<string>>) => {
    const pdf = new jsPDF();

    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

    // Add outer border
    pdf.setDrawColor(0, 0, 0); // Set color to black
    pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20);

    // Add inner border
    pdf.rect(15, 15, pdf.internal.pageSize.getWidth() - 30, pdf.internal.pageSize.getHeight() - 30);
    const img = 'https://img.pikbest.com/png-images/20211011/passengers-waiting-for-bus-in-city_6141026.png!bw700'; // Replace with your image path
    pdf.addImage(img, 'PNG', pdf.internal.pageSize.getWidth() / 2 - 75, 20, 150, 100); // Adjust position and size as needed

    pdf.setFontSize(24);
    pdf.setTextColor(51, 51, 51);
    pdf.text("CITYSPIRIT", pdf.internal.pageSize.getWidth() / 2, 130, { align: 'center' });
    pdf.setFontSize(18);
    pdf.text(`Ticket Type: ${selectedTicket.label}`, pdf.internal.pageSize.getWidth() / 2, 150, { align: 'center' });

    // Add transaction ID
    pdf.setFontSize(18);
    pdf.text(`Transaction: ${transactionId}`, pdf.internal.pageSize.getWidth() / 2, 170, { align: 'center' });

    const paymentTime = new Date().toLocaleString();
    pdf.setFontSize(18);
    pdf.text(`Payment Time: ${paymentTime}`, pdf.internal.pageSize.getWidth() / 2, 190, { align: 'center' });

    // Generate QR code
    const qrValue = `Ticket Type: ${selectedTicket.label}, Transaction ID: ${transactionId}, Purchase Time: ${new Date().toLocaleString()}`;
    setQrValuePDF(qrValue);

    let qrCodeDataURL = '';
    if (qrCodeRef.current) {
        const qrCodeCanvas = qrCodeRef.current.querySelector('canvas');
        if (qrCodeCanvas) {
            qrCodeDataURL = qrCodeCanvas.toDataURL();
        }
    }

    // Calculate the position and dimensions of the image
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pdfWidth * 0.2; // Set the width to 20% of the PDF's width
    const imgHeight = imgWidth; // The QR code is a square

    const x = (pdfWidth - imgWidth) / 2; // Center the image horizontally
    const y = 210; // Position the image below the transaction ID
    pdf.setDrawColor(0, 255, 0); // Set color to green
    pdf.rect(x - 5, y - 5, imgWidth + 10, imgHeight + 10);
    pdf.addImage(qrCodeDataURL, 'PNG', x, y, imgWidth, imgHeight);
    pdf.save("ticket.pdf");
};