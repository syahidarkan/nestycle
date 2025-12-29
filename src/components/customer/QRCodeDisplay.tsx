import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface QRCodeDisplayProps {
  qrCode: string;
  userName: string;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode, userName, size = 256 }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    // Create a canvas to convert SVG to image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `loop-rewards-qr-${userName.replace(/\s+/g, '-').toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
      });

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-5 text-center">
      <h3 className="text-base font-semibold text-neutral-900 mb-3">QR Code Anda</h3>

      <div
        ref={qrRef}
        className="inline-block p-3 bg-white rounded-lg border-2 border-primary mb-3"
      >
        <QRCodeSVG
          value={qrCode}
          size={size}
          level="H"
          includeMargin={false}
        />
      </div>

      <p className="text-xs text-neutral-600 mb-4">
        Tunjukkan QR code ini di lokasi mitra untuk kumpulkan kemasan dan dapatkan poin
      </p>

      <button
        onClick={downloadQRCode}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors text-sm"
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
        <span>Unduh QR Code</span>
      </button>

      <div className="mt-4 pt-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-500">
          Customer: <span className="font-semibold text-neutral-700">{userName}</span>
        </p>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
