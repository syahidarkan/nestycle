import React, { useState } from 'react';
import type { PackagingType, ScanSession, User } from '../../types';
import { usePoints } from '../../contexts/PointsContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatNumber, formatCurrency } from '../../utils/formatting';
import { COMMISSION_RATES } from '../../utils/constants';
import QRScanner from '../scanner/QRScanner';
import BarcodeScanner from '../scanner/BarcodeScanner';
import {
  QrCodeIcon,
  ViewfinderCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../shared/LoadingSpinner';

interface ScanInterfaceProps {
  packagingTypes: PackagingType[];
}

const ScanInterface: React.FC<ScanInterfaceProps> = ({ packagingTypes }) => {
  const { user } = useAuth();
  const { createTransaction } = usePoints();

  const [step, setStep] = useState<'customer' | 'bottle'>('customer');
  const [scanSession, setScanSession] = useState<ScanSession | null>(null);
  const [scannedPackaging, setScannedPackaging] = useState<PackagingType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const isProcessingQR = React.useRef(false);

  // Reset QR processing flag when step changes to bottle
  React.useEffect(() => {
    if (step === 'bottle') {
      isProcessingQR.current = false;
    }
  }, [step]);

  const handleCustomerQRScan = (decodedText: string) => {
    try {
      setError('');

      // Prevent duplicate processing
      if (isProcessingQR.current) return;

      // Only process QR scans when we're in customer step
      if (step !== 'customer') return;

      // Don't process if we already have an active session
      if (scanSession) return;

      isProcessingQR.current = true;
      const customerData = JSON.parse(atob(decodedText));

      // Get customer from localStorage
      const usersData = localStorage.getItem('users');
      if (!usersData) {
        setError('User data not found');
        return;
      }

      const users: User[] = JSON.parse(usersData);
      const customer = users.find(u => u.id === customerData.id);

      if (!customer || customer.role !== 'customer') {
        setError('Invalid customer QR code');
        return;
      }

      // Only create new session if we don't have one, or it's empty
      if (!scanSession || (scanSession.scannedItems?.length ?? 0) === 0) {
        setScanSession({
          customerId: customer.id,
          customerName: customer.name,
          scannedItems: [],
          totalPoints: 0,
          totalCommission: 0,
        });

        setStep('bottle');
        setSuccess(`Customer ${customer.name} verified!`);
        setTimeout(() => setSuccess(''), 3000);
        // isProcessingQR will be reset by useEffect when step changes
      } else {
        isProcessingQR.current = false;
      }
    } catch (err) {
      setError('Invalid QR code format');
      isProcessingQR.current = false;
    }
  };

  const handleBottleBarcodeScan = (barcode: string) => {
    setError('');

    const packaging = packagingTypes.find(p => p.barcode === barcode);

    if (!packaging) {
      setError(`Barcode tidak terdaftar: ${barcode}. Produk ini belum ada dalam sistem.`);
      return;
    }

    setScannedPackaging(packaging);
  };

  const handleAddItem = () => {
    if (!scannedPackaging || !scanSession) return;

    const existingItem = scanSession.scannedItems.find(
      item => item.packagingType.id === scannedPackaging.id
    );

    const commission = COMMISSION_RATES.COLLECTION;

    if (existingItem) {
      // Update quantity if same item scanned again
      setScanSession({
        ...scanSession,
        scannedItems: scanSession.scannedItems.map(item =>
          item.packagingType.id === scannedPackaging.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        totalPoints: scanSession.totalPoints + scannedPackaging.points,
        totalCommission: scanSession.totalCommission + commission,
      });
    } else {
      // Add new item
      setScanSession({
        ...scanSession,
        scannedItems: [
          ...scanSession.scannedItems,
          { packagingType: scannedPackaging, quantity: 1 },
        ],
        totalPoints: scanSession.totalPoints + scannedPackaging.points,
        totalCommission: scanSession.totalCommission + commission,
      });
    }

    setScannedPackaging(null);
    setSuccess(`Added ${scannedPackaging.name}!`);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleCompleteTransaction = async () => {
    if (!scanSession || !user || scanSession.scannedItems.length === 0) return;

    setIsProcessing(true);

    try {
      // Create a transaction for each scanned item
      for (const item of scanSession.scannedItems) {
        for (let i = 0; i < item.quantity; i++) {
          createTransaction({
            customerId: scanSession.customerId,
            customerName: scanSession.customerName,
            mitraId: user.id,
            mitraName: user.name,
            packagingType: item.packagingType,
            pointsEarned: item.packagingType.points,
            commission: COMMISSION_RATES.COLLECTION,
            location: user.address,
            status: 'completed',
          });
        }
      }

      setSuccess('Transaction completed successfully!');

      // Reset session
      setTimeout(() => {
        setScanSession(null);
        setStep('customer');
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError('Failed to complete transaction');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setScanSession(null);
    setScannedPackaging(null);
    setStep('customer');
    setError('');
    setSuccess('');
  };

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {/* Step Indicator */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center space-x-2 ${step === 'customer' ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 'customer' ? 'bg-primary text-white' : scanSession ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}>
              {scanSession ? <CheckCircleIcon className="w-6 h-6" /> : <QrCodeIcon className="w-6 h-6" />}
            </div>
            <span className="font-semibold">Customer QR</span>
          </div>

          <div className={`h-0.5 w-16 ${scanSession ? 'bg-green-600' : 'bg-gray-200'}`} />

          <div className={`flex items-center space-x-2 ${step === 'bottle' ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 'bottle' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              <ViewfinderCircleIcon className="w-6 h-6" />
            </div>
            <span className="font-semibold">Scan Bottles</span>
          </div>
        </div>
      </div>

      {/* Scanner Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Scanner */}
        <div>
          {step === 'customer' ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Scan Customer QR Code</h3>
              <QRScanner
                onScan={handleCustomerQRScan}
                onError={setError}
                isActive={!scanSession}
              />
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Scan Bottle Barcodes</h3>
              <BarcodeScanner
                onScan={handleBottleBarcodeScan}
                onError={setError}
                isActive={!!scanSession}
              />

              {scannedPackaging && (
                <div className="mt-4 bg-green-50 border-2 border-green-500 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{scannedPackaging.name}</h4>
                      <p className="text-sm text-gray-600">{scannedPackaging.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+{scannedPackaging.points} pts</p>
                      <p className="text-xs text-gray-600">+{formatCurrency(COMMISSION_RATES.COLLECTION)}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleAddItem}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Add to Collection
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Session Summary */}
        <div>
          {scanSession && (
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Summary</h3>

              {/* Customer Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-600 font-semibold mb-1">Customer</p>
                <p className="font-semibold text-gray-900">{scanSession.customerName}</p>
              </div>

              {/* Items List */}
              {scanSession.scannedItems.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No items scanned yet</p>
                  <p className="text-xs mt-1">Start scanning bottle barcodes</p>
                </div>
              ) : (
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {scanSession.scannedItems.map(item => (
                    <div key={item.packagingType.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.packagingType.name}</p>
                          <p className="text-xs text-gray-500">{item.packagingType.category}</p>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-1">
                          <span className="font-semibold text-sm text-gray-900">{item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-primary font-semibold">
                          {formatNumber(item.packagingType.points * item.quantity)} pts
                        </span>
                        <span className="text-green-600 font-semibold">
                          {formatCurrency(COMMISSION_RATES.COLLECTION * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Totals */}
              <div className="border-t-2 border-gray-200 pt-4 space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-semibold">
                    {scanSession.scannedItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Points</span>
                  <span className="font-bold text-primary">{formatNumber(scanSession.totalPoints)} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Commission</span>
                  <span className="font-bold text-green-600">{formatCurrency(scanSession.totalCommission)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleCompleteTransaction}
                  disabled={scanSession.scannedItems.length === 0 || isProcessing}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Complete Transaction'
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanInterface;
