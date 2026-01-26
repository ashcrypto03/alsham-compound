import React from 'react';
import { MessageCircle, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { UnitType } from '../types';

interface LeadFormProps {
  selectedInterest: UnitType;
}

export const LeadForm: React.FC<LeadFormProps> = ({ selectedInterest }) => {
  
  const handleOpenChat = () => {
    // Check if chatwoot is loaded and available on window
    if ((window as any).$chatwoot) {
      (window as any).$chatwoot.toggle('open');
    } else {
      console.warn('Chatwoot not loaded yet');
      // Fallback if chat script isn't loaded
      alert("يرجى الانتظار قليلاً ريثما يتم تحميل المحادثة...");
    }
  };

  return (
    <section id="lead-form" className="py-24 relative overflow-hidden bg-slate-900">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-900/20 skew-x-12"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Text Side */}
          <div className="lg:w-1/2 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              خطوتك الأولى <br/> 
              <span className="text-primary-400">نحو امتلاك منزلك</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              تواصل معنا الآن مباشرة لمعرفة كافة التفاصيل والأسعار المحدثة. فريق المبيعات جاهز للإجابة على استفساراتك فوراً عبر المحادثة المباشرة.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-400 font-bold shrink-0">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">افتح المحادثة</h4>
                  <p className="text-sm text-gray-400">اضغط على زر المحادثة للتحدث مع أحد مستشارينا.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-400 font-bold shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">استشارة فورية</h4>
                  <p className="text-sm text-gray-400">احصل على إجابات سريعة حول الأسعار والمساحات.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-400 font-bold shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">معاينة وحجز</h4>
                  <p className="text-sm text-gray-400">نسّق موعد زيارتك للموقع بكل سهولة عبر المحادثة.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA Card Side (Replaces Form) */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl w-full max-w-md text-center border border-gray-100 dark:border-gray-700 relative overflow-hidden">
               {/* Decorative blob inside card */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-6 shadow-inner">
                    <MessageCircle size={40} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    هل لديك استفسار؟
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    نحن متواجدون الآن لخدمتك. ابدأ المحادثة لتتعرف أكثر على {selectedInterest === 'typeA' ? 'النموذج A' : 'النموذج B'} وعروض التقسيط المتاحة.
                </p>
                
                <button
                    onClick={handleOpenChat}
                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2 group"
                >
                    <span>ابدأ المحادثة الآن</span>
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                
                <p className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    متاحون الآن للرد المباشر
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
