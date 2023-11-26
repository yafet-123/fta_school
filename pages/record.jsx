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
      // Convert Excel buffer to a Blob
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Use FileSaver.js to save Blob as a file
      const url = window.URL.createObjectURL(blob);

      // Create Handsontable instance
      const hot = new Handsontable(container, {
        data: Handsontable.helper.excel.readData(url, 'array', blob),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        licenseKey: 'non-commercial-and-evaluation', // Add your commercial license key if applicable
      });

      // Release the URL object when done
      window.URL.revokeObjectURL(url);
    });

  }, []); 

  return (
    <div className="">
      <MainHeader title="Test" />
      <div id="excel-container" className="min-h-screen"></div>
    </div>
  );
}
