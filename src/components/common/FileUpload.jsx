// src/components/common/FileUpload.jsx
import React, { forwardRef } from 'react';

const FileUpload = forwardRef(({ 
  accept, 
  onChange, 
  label = "Select a file", 
  description = "Drag & drop or click to upload" 
}, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      onChange({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isDragging 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 hover:border-indigo-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => ref.current?.click()}
    >
      <input
        type="file"
        ref={ref}
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
          />
        </svg>
        
        <div className="space-y-1">
          <p className="text-lg font-medium text-gray-900">
            {label}
          </p>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
        
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
});

export default FileUpload;