import React from 'react';
import { ChevronDown, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop" 
          alt="مجمع الشام السكني" 
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-primary-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 dark:to-dark-950" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-black/30 backdrop-blur-md border border-primary-400/30 px-4 py-1.5 rounded-full mb-6 animate-fade-in-up hover:bg-white/20 transition-colors cursor-default">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
          </span>
          <span className="text-sm font-medium text-primary-50">متاح الآن للحجز</span>
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight drop-shadow-lg">
          مجمع <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-300">الشام</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto font-light drop-shadow-md">
          شقق مكسية جاهزة للتسليم بتصاميم عصرية ومساحات تناسب طموحك
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => scrollToSection('lead-form')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg shadow-primary-900/50 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 border-b-4 border-primary-700 hover:border-primary-600"
          >
            سجّل رغبتك الآن
          </button>
          <button 
            onClick={() => scrollToSection('unit-types')}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            اطّلع على الشقق
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-200">
          <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-accent-400" />
            <span>جاهزة للتسليم</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors">
            <ShieldCheck className="w-5 h-5 text-accent-400" />
            <span>تشطيبات مضمونة</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors">
            <MapPin className="w-5 h-5 text-accent-400" />
            <span>موقع استراتيجي</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('about')}>
        <ChevronDown className="w-8 h-8 text-white drop-shadow-md" />
      </div>
    </section>
  );
};