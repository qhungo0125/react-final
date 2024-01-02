import React from 'react';
import { utils, write } from 'xlsx';

const ExcelDownloadButton = (props) => {
  const { data, name } = props;
  const downloadExcel = () => {
    // Create a new Excel workbook
    const workbook = utils.book_new();

    // Add a worksheet to the workbook
    const worksheet = utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    // Convert the workbook to base64
    const base64Data = write(workbook, { bookType: 'xlsx', type: 'base64' });

    // Create a data URL
    const dataURL = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`;

    // Create a download link
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${name}-data.xlsx`;

    // Append the link to the document and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  return <button onClick={downloadExcel}>Download Excel</button>;
};

export default ExcelDownloadButton;
