import { jsPDF } from 'jspdf';
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import * as bwipjs from 'bwip-js';

export const downloadActivityPDF = async (selectedActivity: any, transactionId: string, quantity: number, qrCodeRef: React.RefObject<HTMLDivElement>, setQrValuePDF: React.Dispatch<React.SetStateAction<string>>) => {
    const pdf = new jsPDF();

    const generateQRCodeDataURL = async (qrValue: string): Promise<string> => {
        setQrValuePDF(qrValue);

        return new Promise((resolve) => {
            setTimeout(() => {
                if (qrCodeRef.current) {
                    const qrCodeCanvas = qrCodeRef.current.querySelector('canvas');
                    if (qrCodeCanvas) {
                        resolve(qrCodeCanvas.toDataURL());
                    } else {
                        resolve('');
                    }
                } else {
                    resolve('');
                }
            }, 500); // Ensure the QR code has enough time to render
        });
    };

    for (let i = 0; i < quantity; i++) {
        if (i > 0) {
            pdf.addPage();
        }

        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

        // Add outer border
        pdf.setDrawColor(0, 0, 0); // Set color to black
        pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20);

        // Add inner border
        pdf.rect(15, 15, pdf.internal.pageSize.getWidth() - 30, pdf.internal.pageSize.getHeight() - 30);
        const img = 'https://static.vecteezy.com/system/resources/thumbnails/022/388/052/small_2x/smart-city-green-environmental-background-png.png'; // Replace with your image path
        pdf.addImage(img, 'PNG', pdf.internal.pageSize.getWidth() / 2 - 75, 20, 150, 60); // Adjust position and size as needed

        pdf.setFontSize(20);
        pdf.setTextColor(51, 51, 51);
        pdf.text("CITYSPIRIT", pdf.internal.pageSize.getWidth() / 2, 100, { align: 'center' });
        pdf.setFontSize(16);
        pdf.text(`${selectedActivity.title}`, pdf.internal.pageSize.getWidth() / 2, 110, { align: 'center' })
        pdf.setFontSize(14);
        pdf.text(`Ticket Number: #${i}`, pdf.internal.pageSize.getWidth() / 2, 120, { align: 'center' });
        pdf.setFontSize(14);
        pdf.text(`Location: ${selectedActivity.location}`, pdf.internal.pageSize.getWidth() / 2, 130, { align: 'center' });
        // Add transaction ID
        pdf.setFontSize(14);
        pdf.text(`Transaction: ${transactionId}`, pdf.internal.pageSize.getWidth() / 2, 140, { align: 'center' });

        const paymentTime = new Date().toLocaleString();
        pdf.setFontSize(14);
        pdf.text(`Payment Time: ${paymentTime}`, pdf.internal.pageSize.getWidth() / 2, 150, { align: 'center' });
        pdf.setFontSize(14);
        pdf.text(`More info here. Just scan qr code:`, pdf.internal.pageSize.getWidth() / 2, 170, { align: 'center' });

        // Generate QR code
        const qrValue = `${selectedActivity.url}`;
        const qrCodeDataURL = await generateQRCodeDataURL(qrValue);

        // Calculate the position and dimensions of the image
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const imgWidth = pdfWidth * 0.2; // Set the width to 20% of the PDF's width
        const imgHeight = imgWidth; // The QR code is a square

        const x = (pdfWidth - imgWidth) / 2; // Center the image horizontally
        const y = 180; // Position the image below the transaction ID
        const randomNumber = Math.floor(Math.random() * 1000000); // Adjust as needed
        // Generate a barcode
        const canvas = document.createElement('canvas');
        (bwipjs as any).toCanvas(canvas, {
            bcid: 'code128', // Barcode type
            text: randomNumber.toString(),
            scale: 3, // Adjust as needed
            height: 8, // Adjust as needed
            includetext: true,
            textxalign: 'center',
        });

        // Convert the canvas to a data URL
        const barcodePng = canvas.toDataURL('image/png');

        // Add the barcode to the PDF
        pdf.addImage(barcodePng, 'PNG', x, y + imgHeight + 10, imgWidth, imgHeight / 2); 
        const pageNumber = i + 1;
        const pageNumberText = `Page ${pageNumber} of ${quantity}`;
        const pageNumberY = pdf.internal.pageSize.getHeight() - 4; 
        pdf.setFontSize(10);
        pdf.text(pageNumberText, pdf.internal.pageSize.getWidth() / 2, pageNumberY, { align: 'center' });

        pdf.setFontSize(18);
        pdf.setDrawColor(0, 255, 0);
        pdf.rect(x - 5, y - 5, imgWidth + 10, imgHeight + 10);
        pdf.addImage(qrCodeDataURL, 'PNG', x, y, imgWidth, imgHeight);
    }

    pdf.save("activity_tickets.pdf");
};
