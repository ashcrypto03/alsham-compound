import React, { useState } from 'react';
import { Check, Home, Layout, ArrowLeft } from 'lucide-react';
import { UnitType } from '../types';

interface UnitTypesProps {
  onSelectType: (type: UnitType) => void;
}

export const UnitTypes: React.FC<UnitTypesProps> = ({ onSelectType }) => {
  const [activeTab, setActiveTab] = useState<UnitType>('typeA');

  const units = {
    typeA: {
      id: 'typeA',
      title: 'النموذج A',
      area: '90 - 110 م²',
      rooms: '3 غرف وصالة',
      baths: '2 حمام',
      price: 'تبدأ من $120,000',
      features: ['إطلالة أمامية', 'مطبخ مفتوح', 'بلكونة واسعة'],
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    },
    typeB: {
      id: 'typeB',
      title: 'النموذج B',
      area: '130 - 160 م²',
      rooms: '4 غرف وصالة',
      baths: '3 حمامات',
      price: 'تبدأ من $180,000',
      features: ['غرفة خادمة', 'إطلالة بانورامية', 'غرفة ملابس'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    }
  };

  const currentUnit = units[activeTab];

  return (
    <section id="unit-types" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">أنواع الوحدات السكنية</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">صممت وحداتنا لتلبي احتياجات العائلات العصرية بمساحات مستغلة بذكاء</p>
        </div>

        {/* Tabs Controller */}
        <div className="flex justify-center mb-10">
          <div className="bg-white dark:bg-gray-800 p-1.5 rounded-2xl inline-flex relative shadow-md border border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('typeA')}
              className={`px-8 py-3 rounded-xl text-base font-bold transition-all duration-300 relative z-10 ${
                activeTab === 'typeA' ? 'text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              النموذج A (المتوسطة)
            </button>
            <button
              onClick={() => setActiveTab('typeB')}
              className={`px-8 py-3 rounded-xl text-base font-bold transition-all duration-300 relative z-10 ${
                activeTab === 'typeB' ? 'text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              النموذج B (الكبيرة)
            </button>
            
            {/* Sliding Background with Gradient */}
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl shadow-lg transition-transform duration-300 ease-spring ${
                activeTab === 'typeA' ? 'right-1.5 translate-x-0' : 'right-full translate-x-full ms-1.5'
              }`}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 overflow-hidden max-w-5xl mx-auto transition-all duration-500">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-72 md:h-auto overflow-hidden group">
              <img 
                src={currentUnit.image} 
                alt={currentUnit.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>

            {/* Info Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentUnit.title}</h3>
                  <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
                    <span className="flex items-center gap-1"><Layout size={16} className="text-primary-500"/> {currentUnit.area}</span>
                    <span className="flex items-center gap-1"><Home size={16} className="text-primary-500"/> {currentUnit.rooms}</span>
                  </div>
                </div>
                <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-lg font-bold text-sm border border-primary-100 dark:border-primary-800/50">
                  {currentUnit.price}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {currentUnit.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feat}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  onSelectType(activeTab);
                  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center justify-center gap-2 w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
              >
                <span>أنا مهتم بهذا النموذج</span>
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};