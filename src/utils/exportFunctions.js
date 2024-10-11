// Function to export data as CSV
export const exportCSV = (dataKey = 'bookings') => {
    // Retrieve the data stored in localStorage (replace 'bookings' with the appropriate key if needed)
    const data = JSON.parse(localStorage.getItem(dataKey)) || []; 

    // If no data is available, alert the user
    if (data.length === 0) {
      alert(`No ${dataKey} data available to export.`);
      return;
    }

    const csvRows = [];

    // Extract the headers (column names) from the first data object
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(',')); // Join the headers as comma-separated values

    // Loop through the data and extract each row's values
    data.forEach(row => {
      // Map each header to the corresponding value in the row and escape any commas
      const values = headers.map(header => JSON.stringify(row[header])).join(',');
      csvRows.push(values); // Push the row's values to the CSV rows array
    });

    // Create a Blob object with the CSV content and set the type to 'text/csv'
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
    const a = document.createElement('a'); // Create a hidden anchor element
    a.setAttribute('hidden', '');
    a.setAttribute('href', url); // Set the URL as the anchor's href
    a.setAttribute('download', `${dataKey}.csv`); // Set the download filename based on the data key
    document.body.appendChild(a); // Append the anchor to the document body
    a.click(); // Trigger the download
    document.body.removeChild(a); // Remove the anchor after the download is triggered
};

// Function to export data as PDF
export const exportPDF = (dataKey = 'bookings') => {
    // Retrieve the data stored in localStorage (replace 'bookings' with the appropriate key if needed)
    const data = JSON.parse(localStorage.getItem(dataKey)) || [];

    // If no data is available, alert the user
    if (data.length === 0) {
      alert(`No ${dataKey} data available to export.`);
      return;
    }

    // Create a new jsPDF instance
    const doc = new jsPDF();
    let yPosition = 10; // Initial y position for the first line in the PDF

    // Loop through the data and add each row to the PDF
    data.forEach((row, index) => {
      const rowData = JSON.stringify(row); // Convert each row to a JSON string
      doc.text(10, yPosition, `${index + 1}. ${rowData}`); // Add text to the PDF at (x, y)
      yPosition += 10; // Move down by 10 units for the next line
    });

    doc.save(`${dataKey}.pdf`); // Save the PDF file as '<dataKey>.pdf'
};
