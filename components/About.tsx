import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Wifi, Droplets, Zap, Gamepad2, Mountain, Building2 } from 'lucide-react';

// Reusable component for scroll-triggered animations
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealOnScroll: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const About: React.FC = () => {
  const features = [
    { icon: <Mountain size={20}/>, label: 'إطلالة خلابة', color: 'text-indigo-500' },
    { icon: <MapPin size={20}/>, label: 'قرب الخدمات', color: 'text-rose-500' },
    { icon: <Zap size={20}/>, label: 'كهرباء مستقرة', color: 'text-yellow-500' },
    { icon: <Wifi size={20}/>, label: 'ألياف بصرية', color: 'text-blue-500' },
    { icon: <Droplets size={20}/>, label: 'خزانات مستقلة', color: 'text-cyan-500' },
    { icon: <Building2 size={20}/>, label: 'سطح ترفيهي', color: 'text-purple-500' },
    { icon: <Gamepad2 size={20}/>, label: 'ألعاب أطفال', color: 'text-green-500' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-950 overflow-hidden relative">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Grid */}
          <div className="md:w-1/2">
            <RevealOnScroll>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" 
                  alt="مجمع الشام" 
                  className="rounded-2xl shadow-xl shadow-primary-900/10 dark:shadow-none border-4 border-white dark:border-gray-800 w-full h-64 object-cover transform translate-y-8 hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80" 
                  alt="تفاصيل المجمع" 
                  className="rounded-2xl shadow-xl shadow-primary-900/10 dark:shadow-none border-4 border-white dark:border-gray-800 w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </RevealOnScroll>
          </div>

          {/* Content */}
          <div className="md:w-1/2">
            <RevealOnScroll delay={200}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></span>
                <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wider text-sm">نبذة عن المجمع</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                حياة عصرية متكاملة <br/>
                <span className="text-gray-500 dark:text-gray-400">في قلب المدينة</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                يقع مجمع الشام في موقع استراتيجي يجمع بين الهدوء وقرب الخدمات الحيوية. تم تصميم المجمع ليوفر بيئة سكنية راقية وآمنة للعائلة، مع مراعاة أدق التفاصيل في التشطيب والبنية التحتية لضمان راحة السكان ورفاهيتهم.
              </p>
            </RevealOnScroll>

            <div className="flex flex-wrap gap-3">
              {features.map((feat, idx) => (
                <RevealOnScroll key={idx} delay={300 + (idx * 50)} className="inline-block">
                  <div 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-300 rounded-full border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
                  >
                    <div className={feat.color}>{feat.icon}</div>
                    <span className="text-sm font-medium">{feat.label}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};