import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    { question: 'هل الشقق جاهزة للتسليم الفوري؟', answer: 'نعم، جميع الشقق مكسية بالكامل وجاهزة للتسليم والإفراغ الفوري للصك.' },
    { question: 'ما هي المرافق المتاحة في المجمع؟', answer: 'يحتوي المجمع على مواقف خاصة، خزانات مستقلة، ألياف بصرية، وكاميرات مراقبة، بالإضافة إلى منطقة ألعاب أطفال.' },
    { question: 'هل تقبلون الشراء عن طريق البنوك؟', answer: 'نعم، نقبل جميع البنوك التجارية وبرامج الدعم السكني.' },
    { question: 'ما هي الضمانات المقدمة؟', answer: 'نقدم ضمانات تصل إلى 25 سنة على الهيكل الإنشائي، و10 سنوات على السباكة والكهرباء، وسنة شاملة على التشطيبات.' },
    { question: 'كيف تتم عملية الحجز؟', answer: 'يمكنك دفع مبلغ عربون مبدئي لضمان حجز الوحدة، ثم استكمال الإجراءات البنكية أو النقدية خلال فترة متفق عليها.' },
    { question: 'هل تتوفر خدمات المياه والكهرباء؟', answer: 'نعم، جميع الخدمات واصلة (عداد كهرباء مستقل وعداد مياه مستقل لكل شقة).' },
    { question: 'هل يوجد اتحاد ملاك؟', answer: 'نعم، يتم تأسيس اتحاد ملاك فور اكتمال بيع 50% من الوحدات لضمان صيانة ونظافة المجمع.' },
    { question: 'كيف أتواصل مباشرة مع المبيعات؟', answer: 'يمكنك تعبئة النموذج أعلاه أو الاتصال مباشرة عبر الأرقام الموجودة في أسفل الصفحة.' },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">الأسئلة الشائعة</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
              >
                <span className={`font-bold text-lg transition-colors ${openIndex === idx ? 'text-primary-600 dark:text-primary-400' : 'text-gray-800 dark:text-gray-200'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`text-gray-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-primary-500' : ''}`} 
                />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};