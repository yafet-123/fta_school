import { MainHeader } from "../components/common/MainHeader";
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import Handsontable dynamically to ensure it's only loaded on the client side
const DynamicHandsontable = dynamic(() => import('handsontable'), { ssr: false });

async function generateExcel() {
  const buffer = await /* Your generateExcel logic here */;
  return Handsontable.utils.json.parse(buffer.toString());
}

export default function Record() {
  useEffect(() => {
    generateExcel().then(data => {
      // Create Handsontable instance only on the client side
      const container = document.getElementById('excel-container');
      const hot = new DynamicHandsontable(container, {
        data,
        rowHeaders: true,
        colHeaders: ['Name', 'Age'],
        contextMenu: true,
        licenseKey: 'non-commercial-and-evaluation', // Add your commercial license key if applicable
      });
    });
  }, []); 

  return (
    <div className="">
      <MainHeader title="Test" />
      <div id="excel-container" className="min-h-screen"></div>
    </div>
  );
}
