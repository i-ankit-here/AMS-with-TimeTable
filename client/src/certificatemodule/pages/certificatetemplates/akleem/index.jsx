import { useEffect, useRef } from 'react';
import Bottom from './Bottom';
import Content from './Content';
import Top from './Top';
import html2canvas from 'html2canvas';
import downloadCertificatePdf from '../../certipdfdownload';
import QRCode from 'qrcode';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import getEnvironment from '../../../../getenvironment';

function Template01() {
  const svgRef = useRef();
  const apiUrl = getEnvironment();

  useEffect(() => {
    const url = window.location.href; // Replace with your URL
    const svg = svgRef.current;

    QRCode.toDataURL(url, (err, dataUrl) => {
      if (err) throw err;

      const image = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'image'
      );
      image.setAttribute('x', '100');
      image.setAttribute('y', '500');
      image.setAttribute('width', '100');
      image.setAttribute('height', '100');
      image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataUrl);

      svg.appendChild(image);
    });
  }, []);

  // const handleDownloadImage = () => {
  //   // const input = document.getElementById('id-card');
  //   const input = document.getElementById('id-card-class');
  //   console.log(input)
  //   input.style.width = '841.92px';
  //   input.style.height = '595.499987px';
  //   html2canvas(input, {
  //     logging: true,
  //     allowTaint: true,
  //     backgroundColor: '#ffffff',
  //     useCORS: true,
  //     foreignObjectRendering: true,
  //     scrollX: 0,
  //     scrollY: 0,
  //     windowWidth: document.documentElement.offsetWidth,
  //     windowHeight: document.documentElement.offsetHeight,
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const link = document.createElement('a');
  //     link.href = imgData;

  //     link.download = 'certificate-by-XCEED.png';
  //     link.click();
  //   });
  //   input.style.height = 'auto';
  //   input.style.width = 'auto';
  // };
  const handleDownloadImage = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/certificatemodule/certificate/download`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          credentials: 'include',
          body: JSON.stringify({ type: "image", url: window.location.href }),
        }
      );
      const data = await response.blob();
      const blob = new Blob([data], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'certificate.' + 'png';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  // const handleDownloadPDF = () => {
  //   // const input = document.getElementById('id-card');
  //   const input = document.getElementsByClassName('id-card-class');
  //   input.style.width = '1754px';
  //   input.style.height = '1240px';
  //   html2canvas(input, {
  //     logging: true,
  //     allowTaint: true,
  //     backgroundColor: '#ffffff',
  //     useCORS: true,
  //     foreignObjectRendering: true,
  //     scrollX: 0,
  //     scrollY: 0,
  //     windowWidth: document.documentElement.offsetWidth,
  //     windowHeight: document.documentElement.offsetHeight,
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');

  //     const pdf = new jsPDF({
  //       orientation: 'landscape',
  //       unit: 'px',
  //       format: [1754, 1240],
  //     });
  //     pdf.addImage(imgData, 'JPEG', 0, 0, 1754, 1240);
  //     pdf.save('download.pdf');
  //   });
  //   input.style.height = 'auto';
  //   input.style.width = 'auto';
  // };
  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`${apiUrl}/certificatemodule/certificate/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'include',
        body: JSON.stringify({ type: "pdf", url: window.location.href }),
      }, { responseType: 'blob' });
      const data = await response.blob();
      const blob = new Blob([data], { type: 'application/pdf' });
      console.log(blob)
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificate.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  }
  return (
    <>
      <div id="id-card-class" >
        <Content />
      </div>
      <div className='tw-hidden'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1122.52 793.7"
          ref={svgRef}
        >
          <Top />
          <Bottom />
        </svg>
      </div>
      <Button onClick={handleDownloadImage} variant="solid" colorScheme="teal">
        Download Image
      </Button>
      <Button onClick={handleDownloadPDF} variant="outline" colorScheme="teal">
        Download PDF
      </Button>
    </>
  );
}

export default Template01;
