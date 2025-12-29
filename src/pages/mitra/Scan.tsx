import React, { useMemo } from 'react';
import ScanInterface from '../../components/mitra/ScanInterface';
import { packagingTypes as seedPackagingTypes } from '../../utils/seedData';

const Scan: React.FC = () => {
  const packagingTypes = useMemo(() => {
    // Always use seed data as source of truth and update localStorage
    localStorage.setItem('packaging_types', JSON.stringify(seedPackagingTypes));
    return seedPackagingTypes;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan Collection</h1>
        <p className="text-gray-600">Scan customer QR code and bottle barcodes to process collections</p>
      </div>
      <ScanInterface packagingTypes={packagingTypes} />
    </div>
  );
};

export default Scan;
