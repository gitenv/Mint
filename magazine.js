// Function to open the magazine PDF
function openMagazine(pdfFile, title) {
    const pdfContainer = document.getElementById('pdf-container');
    const pdfIframe = document.getElementById('pdf-iframe');
    
    // Set the PDF source and display it
    pdfIframe.src = pdfFile + "#toolbar=0&navpanes=0"; // Disable PDF toolbar
    pdfContainer.style.display = 'flex'; // Show the container

    // Prevent keyboard shortcuts (like Ctrl+S)
    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && (event.key === 's' || event.key === 'p')) {
            event.preventDefault();
        }
    });

    // Optionally set a title for the PDF
    document.title = title; // Update page title if needed
}

// Function to close the PDF
function closePdf() {
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfContainer = document.getElementById('pdf-container');

    // Hide the PDF and reset the source
    pdfIframe.src = ''; // Reset the src to stop loading the PDF
    pdfContainer.style.display = 'none'; // Hide the container

    // Reset page title if needed
    document.title = 'Magazine';
}
