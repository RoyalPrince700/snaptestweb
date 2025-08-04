// src/services/mockApiService.js
// Simulates server-side OCR processing for Vite environment
export const mockExtractText = async (file) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // This would be replaced with actual server call in production
      console.log('Mock OCR processing for file:', file.name);
      
      // Return mock text based on file type
      if (file.type.startsWith('image/')) {
        resolve("This is mock text extracted from an image. In a real application, this would be actual OCR results from your backend service. For now, we're simulating the extraction process.");
      } else if (file.name.endsWith('.pdf')) {
        resolve("This is mock text extracted from a PDF document. PDF processing would normally happen on the server using libraries like pdf.js. This is placeholder text for development purposes.");
      }
      
      resolve("Text extracted from your document would appear here. This is a simulation for development.");
    }, 1500); // Simulate network delay
  });
};

// Real implementation would look like this:
/*
export const serverExtractText = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('https://your-api.com/ocr', {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) throw new Error('OCR failed');
  return await response.text();
};
*/