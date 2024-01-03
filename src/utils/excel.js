import { utils, write, read } from 'xlsx';

export const downloadExcel = (data) => {
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
  link.download = `data.xlsx`;

  // Append the link to the document and trigger a click event
  document.body.appendChild(link);
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};

export const getDatafromUploadExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      try {
        const workbook = read(e.target.result, { type: 'buffer' });
        const workbookName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[workbookName];
        const data = utils.sheet_to_json(worksheet);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
