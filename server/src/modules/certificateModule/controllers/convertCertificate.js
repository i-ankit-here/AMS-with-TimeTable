const puppeteer = require('puppeteer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');


async function convertCertificate(req, res) {
    const { type, url } = req.body || {};
    console.log(type, url)
    const svgUrl = url;
    console.log("browser")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let data;
    try {
        // Original viewport size
        const originalWidth = 841;
        const originalHeight = 595;

        await page.goto(svgUrl, { waitUntil: 'networkidle0', timeout: 30000 });
        await page.waitForSelector('.chakra-image');
        await page.setViewport({ width: originalWidth, height: originalHeight, deviceScaleFactor: 4 }); //enhance quality of image
        


        data = await page.screenshot({ type: 'png', });
        if (type === 'image') {
            await browser.close();
            console.log(data)

            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', 'attachment; filename=certificate.png');
            res.send(data);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error generating certificate.');
    }


    try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        // Embed the PNG image into the PDF
        const pngImage = await pdfDoc.embedPng(data);
        console.log(pngImage)
        const { width, height } = pngImage.scale(1);
        
        // Add a page with the dimensions of the PNG image
        const Page = pdfDoc.addPage([width, height]);
        Page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width,
            height,
        });
        
        // Serialize the PDF document to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();
        // Send the PDF buffer as a response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=image.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error generating PDF.');
    }
}


module.exports = { convertCertificate }