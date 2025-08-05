import React, { useRef, useState, useEffect } from 'react';
import { extractTextFromImage } from '../../services/ocrService';
import { calculateWordCount, getMaxQuestionsForWordCount } from '../../config/api';
import { fireworksAIService } from '../../services/fireworksService';
import { useNavigate } from 'react-router-dom';

export const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImageURL, setCapturedImageURL] = useState(null);
  const [capturedBlob, setCapturedBlob] = useState(null);

  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');
  const [loadingOCR, setLoadingOCR] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [questionType, setQuestionType] = useState('objective');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [maxAllowedQuestions, setMaxAllowedQuestions] = useState(50);
  const [availableCounts, setAvailableCounts] = useState([10, 20, 30, 40, 50]);

  const navigate = useNavigate();

 const initCamera = async () => {
  if (videoRef.current && videoRef.current.srcObject) {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  }

  try {
    console.log('[CameraPage] Requesting camera access...');
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    console.log('[CameraPage] Back camera access granted', videoStream);
    videoRef.current.srcObject = videoStream;
    await videoRef.current.play();
    setStream(videoStream);
    setError('');
  } catch (err) {
    console.error('[CameraPage] Camera access error:', err);
    if (err.name === 'NotReadableError') {
      setError('Camera is already in use by another tab or application. Please close other camera sessions and try again.');
    } else {
      setError('Camera access denied or unavailable.');
    }
  }
};


  useEffect(() => {
    initCamera();
    return () => {
      console.log('[CameraPage] Cleaning up stream...');
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const wordCount = calculateWordCount(extractedText);
    const maxAllowed = getMaxQuestionsForWordCount(wordCount);
    setMaxAllowedQuestions(maxAllowed);

    const counts = [10, 20, 30, 40, 50].filter(n => n <= maxAllowed);
    setAvailableCounts(counts);

    if (count > maxAllowed) {
      setCount(maxAllowed > 0 ? Math.max(...counts) : 10);
    }
  }, [extractedText, count]);

  const captureImage = () => {
    console.log('[CameraPage] captureImage called');
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      console.error('[CameraPage] Missing video or canvas reference');
      return;
    }

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        setCapturedBlob(blob);
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImageURL(imageUrl);
        setExtractedText('');
        setError('');
        console.log('[CameraPage] Image captured and set.');
      } else {
        console.error('[CameraPage] toBlob returned null');
      }
    }, 'image/jpeg');
  };

  const handleExtractText = async () => {
    if (!capturedBlob) {
      setError('No photo captured.');
      return;
    }

    setLoadingOCR(true);
    setError('');
    try {
      const text = await extractTextFromImage(capturedBlob);
      setExtractedText(text);
      console.log('[CameraPage] Extracted text:', text);
    } catch (err) {
      console.error('[CameraPage] OCR Error:', err);
      setError('Failed to extract text from image.');
    } finally {
      setLoadingOCR(false);
    }
  };

  const handleGenerateQuestions = async (e) => {
    e.preventDefault();
    if (!extractedText.trim()) {
      setError('No text extracted from photo.');
      return;
    }

    const wordCount = calculateWordCount(extractedText);
    if (wordCount < 20) {
      setError('Extracted text is too short. Minimum 20 words required.');
      return;
    }

    setLoadingQuestions(true);
    setError('');
    try {
      const result = await fireworksAIService.generateQuestions({
        text: extractedText,
        questionType,
        count,
        difficulty,
      });

      if (!result.success) {
        setError(result.error);
      } else {
        if (result.questions.length < count) {
          setError(`Generated ${result.questions.length} questions instead of ${count}. Proceeding anyway.`);
        }

        navigate('/questions', {
          state: {
            questions: result.questions,
            originalText: extractedText,
            questionType,
            count: result.requestedCount,
            generatedCount: result.questions.length,
            difficulty,
          },
        });
      }
    } catch (err) {
      console.error('[CameraPage] Questions Error:', err);
      setError(err.message || 'Unexpected error occurred.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="max-w-2xl w-full bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Camera Capture & Generate Questions</h2>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="rounded-lg w-full aspect-video border"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={captureImage}
            className="flex-1 py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold"
          >
            Capture Photo
          </button>

          {capturedImageURL && (
            <button
              onClick={handleExtractText}
              disabled={loadingOCR}
              className={`flex-1 py-2 px-4 text-white font-semibold rounded-lg transition ${
                loadingOCR ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loadingOCR ? 'Extracting Text…' : 'Extract Text'}
            </button>
          )}
        </div>

        {capturedImageURL && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Captured Image</label>
            <img src={capturedImageURL} alt="Captured" className="rounded-lg border w-full max-h-80 object-contain" />
          </div>
        )}

        {extractedText && (
          <form onSubmit={handleGenerateQuestions} className="space-y-6">
            {/* form elements unchanged */}
          </form>
        )}
      </div>
    </section>
  );
};

export default CameraPage;
