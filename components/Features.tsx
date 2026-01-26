import React from 'react';
import { CheckCircle2, Shield, PenTool, Lightbulb, Droplet } from 'lucide-react';

export const Features: React.FC = () => {
  const guarantees = [
    {
      icon: <PenTool className="w-8 h-8 text-white" />,
      title: 'التشطيبات',
      desc: 'دهانات وديكورات عالية الجودة مقاومة للرطوبة',
      duration: 'ضمان سنة',
      process: 'صيانة فورية',
      gradient: 'from-orange-400 to-red-500',
      border: 'border-orange-100 dark:border-orange-900/30'
    },
    {
      icon: <Droplet className="w-8 h-8 text-white" />,
      title: 'السباكة',
      desc: 'تأسيسات حرارية معتمدة ومواد صحية فاخرة',
      duration: 'ضمان 5 سنوات',
      process: 'استبدال وتركيب',
      gradient: 'from-blue-400 to-indigo-500',
      border: 'border-blue-100 dark:border-blue-900/30'
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-white" />,
      title: 'الكهرباء',
      desc: 'أسلاك وكابلات ومفاتيح معتمدة',
      duration: 'ضمان 10 سنوات',
      process: 'فحص وإصلاح',
      gradient: 'from-yellow-400 to-amber-500',
      border: 'border-yellow-100 dark:border-yellow-900/30'
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: 'العزل المائي',
      desc: 'عزل أسطح ودورات مياه بأفضل المواد',
      duration: 'ضمان 10 سنوات',
      process: 'اختبار دوري',
      gradient: 'from-emerald-400 to-green-500',
      border: 'border-green-100 dark:border-green-900/30'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-dark-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wide uppercase text-sm mb-2 block">الجودة والأمان</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">ضمانات تريح بالك</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => (
            <div key={idx} className={`group p-6 rounded-2xl border ${item.border} bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col`}>
              {/* Colorful Top Border/Overlay */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></div>
              
              <div className={`mb-4 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.gradient} shadow-lg shadow-gray-200 dark:shadow-none transform group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow">{item.desc}</p>
              
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                <div className="text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full">
                  {item.duration}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-green-500" />
                  {item.process}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
