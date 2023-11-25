import { MainHeader } from "../components/common/MainHeader";
import React, { useEffect } from 'react';
import ExcelJS from 'exceljs';
import Handsontable from 'handsontable';

async function generateExcel() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet 1');

  sheet.addRow(['Name', 'Age']);
  sheet.addRow(['John Doe', 30]);
  sheet.addRow(['Jane Smith', 25]);

  return workbook.xlsx.writeBuffer();
}

export default function Record() {
  useEffect(() => {
    const container = document.getElementById('excel-container');

    generateExcel().then(buffer => {
      // Convert Excel buffer to Handsontable data
      const data = Handsontable.utils.json.parse(buffer.toString());

      // Create Handsontable instance
      const hot = new Handsontable(container, {
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