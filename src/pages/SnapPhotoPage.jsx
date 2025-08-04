import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { supabase } from '../../supabase/supabaseClient';

export const SnapPhotoPage = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);
    const fileName = `photo_${Date.now()}.jpg`;
    const file = dataURLtoFile(image, fileName);
    const { data, error } = await supabase.storage.from('photos').upload(fileName, file);
    setUploading(false);
    if (error) {
      console.error('Upload error:', error);
    } else {
      console.log('Uploaded:', data);
      // TODO: Integrate with backend to process the uploaded photo
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Snap Photo</h2>
        <div className="space-y-4">
          {!image ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
            />
          ) : (
            <img src={image} alt="Captured" className="w-full rounded-lg" />
          )}
          <div className="flex gap-4">
            {!image ? (
              <button
                onClick={capture}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Capture Photo
              </button>
            ) : (
              <>
                <button
                  onClick={() => setImage(null)}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition"
                >
                  Retake
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-indigo-400"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};