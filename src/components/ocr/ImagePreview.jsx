// src/components/ocr/ImagePreview.jsx
import React, { useState } from 'react';

export default function ImagePreview({ imageUrl }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

const handleWheel = e => {
  e.preventDefault();
  setZoom(z => Math.max(
    0.5,
    Math.min(3, z + (e.deltaY > 0 ? -0.1 : 0.1))
  ));
};


  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative border rounded-lg overflow-hidden bg-gray-100 h-[300px]"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={imageUrl}
          alt="OCR Preview"
          className="max-w-full max-h-full object-contain"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        />
      </div>
      
      <div className="absolute bottom-3 right-3 flex space-x-2">
        <button
          onClick={() => setZoom(z => Math.min(3, z + 0.2))}
          className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
        >
          +
        </button>
        <button
          onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}
          className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
        >
          -
        </button>
        <button
          onClick={resetView}
          className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
        >
          ↺
        </button>
      </div>
      
      <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
        Zoom: {(zoom * 100).toFixed(0)}%
      </div>
    </div>
  );
}