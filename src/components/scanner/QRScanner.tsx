import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (error: string) => void;
  isActive: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError, isActive }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isActive && !isScanning) {
      startScanner();
    } else if (!isActive && isScanning) {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isActive]);

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 15,
          qrbox: { width: 300, height: 300 },
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
          ],
        },
        (decodedText) => {
          console.log('✅ QR Code detected:', decodedText);
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Silent error handling - QR not found is normal
        }
      );

      setIsScanning(true);
      setError('');
    } catch (err: any) {
      const errorMsg = 'Failed to start camera. Please check permissions.';
      setError(errorMsg);
      if (onError) onError(errorMsg);
      console.error('QR Scanner error:', err);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="relative bg-black rounded-xl overflow-hidden">
        <div id="qr-reader" className="w-full" />

        {!isScanning && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-8">
            <CameraIcon className="w-20 h-20 text-gray-400 mb-4" />
            <p className="text-center text-gray-300">
              Initializing camera...
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 mb-2">
          <strong>💡 Tips Scan QR Code Customer:</strong>
        </p>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Posisikan QR code di <strong>tengah kotak</strong></li>
          <li>• Jarak ideal: 10-20 cm dari kamera</li>
          <li>• Pastikan QR code tidak terpotong</li>
          <li>• Scanner akan otomatis detect & lanjut</li>
        </ul>
      </div>
    </div>
  );
};

export default QRScanner;
