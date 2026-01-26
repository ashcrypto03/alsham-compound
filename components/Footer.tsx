import React from 'react';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            
            {/* Brand */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">مجمع <span className="text-primary-400">الشام</span></h2>
              <p className="mb-6 opacity-80">
                الخيار الأمثل للسكن العصري. جودة في البناء، رقي في التصميم، وتميز في الموقع.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                  <span className="font-bold">X</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                  <span className="font-bold">In</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                  <span className="font-bold">Fb</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">تواصل معنا</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary-400"/>
                  <span dir="ltr">+963 11 000 0000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary-400"/>
                  <span>info@alsham-compound.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary-400"/>
                  <span>سوريا، دمشق</span>
                </li>
              </ul>
            </div>
            
            {/* Google Map Embed */}
            <div className="h-48 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 relative shadow-lg group">
              <iframe
                title="موقع مجمع الشام"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?q=Damascus,Syria&hl=ar&z=13&output=embed"
                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                style={{ filter: 'grayscale(20%)' }}
                loading="lazy"
              ></iframe>
              {/* Overlay Label */}
              <div className="absolute top-2 right-2 pointer-events-none">
                 <span className="bg-white/90 text-gray-900 px-2 py-1 rounded-md text-xs font-bold shadow-sm">موقع المشروع</span>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 مجمع الشام السكني. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button 
          onClick={scrollToForm}
          className="flex-1 bg-primary-600 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>تواصل معنا</span>
        </button>
        <button className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <MessageCircle size={20} />
          <span>واتساب</span>
        </button>
      </div>
    </>
  );
};
