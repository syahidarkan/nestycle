import React from 'react';
import { Link } from 'react-router-dom';
import {
  GiftIcon,
  UserGroupIcon,
  MapPinIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation - Tokopedia Style */}
      <nav className="sticky top-0 bg-white border-b border-neutral-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src="/images/nestle-logo.png" alt="Nestlé Logo" className="h-6 sm:h-8" />
              <span className="text-lg sm:text-2xl font-bold text-neutral-900">
                Nestycle
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link
                to="/login"
                className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium text-neutral-700 hover:text-primary transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary-600 rounded-lg transition-colors"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Tokopedia Style Clean */}
      <section className="bg-white py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold mb-3 sm:mb-4">
                <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs">Official Nestle Indonesia Program</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 leading-tight">
                Nestlé Nestycle: Tukar Kemasan<br />
                <span className="text-primary">Jadi Poin &amp; Hadiah</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-neutral-600 mb-6 sm:mb-8 leading-relaxed">
                Program daur ulang resmi dari Nestlé Indonesia. Tukarkan kemasan produk Nestlé Anda dan dapatkan poin yang bisa ditukar dengan produk Nestlé, voucher belanja, dan hadiah menarik lainnya. Berkontribusi untuk lingkungan sambil mendapatkan reward!
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-primary hover:bg-primary-600 rounded-lg transition-all"
                >
                  Mulai Sekarang
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-primary bg-white border-2 border-primary hover:bg-primary-50 rounded-lg transition-all"
                >
                  Daftar Jadi Mitra
                </Link>
              </div>

              {/* Stats - Clean Tokopedia Style */}
              <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6">
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900">50K+</div>
                  <div className="text-xs sm:text-sm text-neutral-600">Pengguna Aktif</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900">2M+</div>
                  <div className="text-xs sm:text-sm text-neutral-600">Kemasan Terkumpul</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900">500+</div>
                  <div className="text-xs sm:text-sm text-neutral-600">Lokasi Mitra</div>
                </div>
              </div>
            </div>

            {/* Image Placeholder - Tokopedia uses product images */}
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-12 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg p-6">
                    <img src="/images/nestle-logo.png" alt="Nestlé Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-xl font-semibold text-neutral-900">Recycle • Earn • Redeem</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Tokopedia Card Style */}
      <section className="py-8 sm:py-12 md:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              Cara Kerja Nestycle
            </h2>
            <p className="text-lg text-neutral-600">
              Hanya 3 langkah mudah untuk mulai mengumpulkan poin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                <UserGroupIcon className="w-7 h-7 text-white" />
              </div>
              <div className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white text-sm font-bold rounded-full mb-3">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                Daftar Akun
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Buat akun gratis dan dapatkan QR code unik untuk scan kemasan
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                <MapPinIcon className="w-7 h-7 text-white" />
              </div>
              <div className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white text-sm font-bold rounded-full mb-3">
                2
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Kumpul & Scan
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Bawa kemasan ke mitra terdekat, scan barcode dan kumpulkan poin
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                <GiftIcon className="w-7 h-7 text-white" />
              </div>
              <div className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white text-sm font-bold rounded-full mb-3">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Tukar Hadiah
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Tukar poin dengan produk Nestle, voucher, atau top-up e-wallet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Tokopedia Style */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Kenapa Nestycle?
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                Nestycle adalah program daur ulang kemasan resmi dari Nestlé Indonesia yang memberikan reward nyata untuk setiap kontribusi Anda
              </p>

              <div className="space-y-4">
                {[
                  { text: 'Gratis mendaftar, gratis mengumpulkan poin' },
                  { text: 'Hadiah menarik dari produk Nestle hingga voucher' },
                  { text: 'Mitra tersebar di 500+ lokasi se-Indonesia' },
                  { text: 'Kontribusi nyata untuk lingkungan' },
                  { text: 'Transaksi aman dan terpercaya' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircleIcon className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-neutral-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '82g', label: 'CO2 per botol' },
                { value: '20', label: 'Botol = 1 pohon' },
                { value: '100%', label: 'Dapat didaur ulang' },
                { value: '164+', label: 'Ton CO2 terselamatkan' },
              ].map((stat, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-6 text-center border border-neutral-200">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Tokopedia Green */}
      <section className="py-10 sm:py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Mulai Mengumpulkan Poin?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Bergabung dengan ribuan pengguna yang sudah mendapatkan hadiah sambil menjaga lingkungan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-primary bg-white hover:bg-neutral-50 rounded-lg transition-all"
            >
              Buat Akun Gratis
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white border-2 border-white hover:bg-white/10 rounded-lg transition-all"
            >
              Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Tokopedia Style */}
      <footer className="bg-neutral-900 text-neutral-400 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/images/nestle-logo.png" alt="Nestlé Logo" className="h-6" />
                <span className="text-lg font-bold text-white">Nestycle</span>
              </div>
              <p className="text-sm text-neutral-500">
                Program daur ulang resmi Nestlé Indonesia
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Tentang</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/register" className="hover:text-white transition-colors">Cara Kerja</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Lokasi Mitra</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Bantuan</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Nestycle by Nestle Indonesia. All rights reserved.copy; 2025 Nestlé Indonesia. Nestycle adalah program resmi Nestlé Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default Landing;
