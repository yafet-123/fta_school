import { MainHeader } from "../components/common/MainHeader";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ExcelJS from 'exceljs';

async function generateExcel() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet 1');
  
  sheet.addRow(['Name', 'Age']);
  sheet.addRow(['John Doe', 30]);
  sheet.addRow(['Jane Smith', 25]);

  // Save the workbook to a buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Create a Blob from the buffer
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Create a link element
  const link = document.createElement('a');

  // Set the link's href attribute to a data URL representing the blob
  link.href = URL.createObjectURL(blob);

  // Set the link's download attribute to the desired file name
  link.download = 'example.xlsx';

  // Append the link to the document body
  document.body.appendChild(link);

  // Trigger a click event on the link
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);
}

export default function Record() {
  useEffect(() => {
    generateExcel();
  }, []); 

  return (
    <div className="">
      <MainHeader title="Test" />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1>Excel Page</h1>
        <p>An Excel file has been generated.</p>
      </div>
    </div>
  );
}
