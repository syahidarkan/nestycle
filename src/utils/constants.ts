// Commission rates for mitra partners
export const COMMISSION_RATES = {
  COLLECTION: 300, // Rp 300 per bottle collected
  REFILL: 1000,    // Rp 1000 for refillable bottles
};

// Token expiry time (24 hours)
export const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

// Environmental impact calculations
export const ENVIRONMENTAL_IMPACT = {
  CO2_PER_BOTTLE: 0.082, // kg of CO2 saved per bottle recycled
  TREES_EQUIVALENT: 20,   // bottles needed to equal 1 tree planted
};

// Collection point locations (simulated)
export const COLLECTION_POINTS = [
  {
    id: '1',
    name: 'Indomaret Sudirman',
    address: 'Jl. Sudirman No. 45, Jakarta Pusat',
    coordinates: { lat: -6.2088, lng: 106.8456 },
    hours: '08:00 - 22:00',
  },
  {
    id: '2',
    name: 'Alfamart Gatsu',
    address: 'Jl. Gatot Subroto No. 67, Jakarta Selatan',
    coordinates: { lat: -6.2276, lng: 106.8169 },
    hours: '07:00 - 23:00',
  },
  {
    id: '3',
    name: 'Warung Pak Haji',
    address: 'Jl. Cempaka Putih No. 34, Jakarta Pusat',
    coordinates: { lat: -6.1751, lng: 106.8650 },
    hours: '06:00 - 21:00',
  },
  {
    id: '4',
    name: 'Toko Berkah Jaya',
    address: 'Jl. Kebayoran Lama No. 89, Jakarta Selatan',
    coordinates: { lat: -6.2423, lng: 106.7738 },
    hours: '08:00 - 20:00',
  },
  {
    id: '5',
    name: 'Gerobak Bu Sari',
    address: 'Jl. Tanah Abang No. 56, Jakarta Pusat',
    coordinates: { lat: -6.1867, lng: 106.8139 },
    hours: '09:00 - 18:00',
  },
];
