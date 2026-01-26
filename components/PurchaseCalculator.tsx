import React, { useState, useEffect } from 'react';
import { Calculator, Banknote, Calendar, Info } from 'lucide-react';

const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="group relative inline-flex items-center mx-2 transform translate-y-0.5">
    <Info size={15} className="text-gray-400 dark:text-gray-500 cursor-help hover:text-primary-500 dark:hover:text-primary-400 transition-colors" />
    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 bg-gray-900/95 dark:bg-white/95 backdrop-blur-sm text-white dark:text-gray-900 text-xs leading-relaxed rounded-xl shadow-xl z-20 text-center pointer-events-none">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95 dark:border-t-white/95"></div>
    </div>
  </div>
);

export const PurchaseCalculator: React.FC = () => {
  const [price, setPrice] = useState<number>(150000);
  const [downPayment, setDownPayment] = useState<number>(30000);
  const [months, setMonths] = useState<number>(36);
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(0);

  useEffect(() => {
    // Ensure loan amount is not negative
    const loanAmount = Math.max(0, price - downPayment);
    // Avoid division by zero
    const monthly = months > 0 ? loanAmount / months : 0;
    setMonthlyInstallment(Math.round(monthly));
  }, [price, downPayment, months]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPrice(val);
    // Ensure down payment doesn't exceed new price
    if (val < downPayment) setDownPayment(val);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">خطط دفع مرنة</h2>
          <p className="text-gray-600 dark:text-gray-400">اختر الطريقة التي تناسب ميزانيتك، سواء كاش أو بالتقسيط المريح</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Cash Option */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
              <Banknote size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">الدفع النقدي (كاش)</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">احصل على خصم خاص عند الدفع النقدي الفوري لكامل مبلغ الوحدة.</p>
            <ul className="text-right w-full space-y-3 mb-6 bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl">
              <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> خصم يصل إلى 5%
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> استلام فوري للمفتاح
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> إفراغ فوري للصك
              </li>
            </ul>
          </div>

          {/* Calculator Option */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border-2 border-primary-100 dark:border-primary-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 opacity-10 rounded-br-full -translate-x-10 -translate-y-10"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                <Calculator size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">حاسبة الأقساط التقديرية</h3>
            </div>

            <div className="space-y-6 relative z-10">
              {/* Price Input */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  سعر العقار التقديري
                  <Tooltip text="القيمة الإجمالية المتوقعة للوحدة السكنية، تختلف حسب المساحة والإطلالة." />
                </label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="50000" max="500000" step="5000" 
                    value={price} 
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 mb-2"
                  />
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">القيمة:</span>
                    <div className="flex items-baseline gap-1" dir="ltr">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">$</span>
                      <span className="font-bold text-gray-900 dark:text-white text-xl">{price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الدفعة الأولى
                  <Tooltip text="المبلغ الذي يمكنك دفعه نقداً عند توقيع العقد كدفعة أولى." />
                </label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="0" max={price} step="1000" 
                    value={downPayment} 
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 mb-2"
                  />
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">المبلغ:</span>
                    <div className="flex items-baseline gap-1" dir="ltr">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">$</span>
                      <span className="font-bold text-gray-900 dark:text-white text-xl">{downPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Months */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar size={16} className="ml-2 text-primary-500" />
                  مدة التقسيط (أشهر)
                  <Tooltip text="الفترة الزمنية التي ترغب بتقسيط المبلغ المتبقي خلالها." />
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        months === m 
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {m} شهر
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 dark:text-gray-400 font-medium pb-1">القسط الشهري التقديري</span>
                  <div className="flex items-baseline gap-1" dir="ltr">
                    <span className="text-2xl font-bold text-primary-500">$</span>
                    <span className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                      {monthlyInstallment.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center bg-gray-50 dark:bg-gray-700/30 py-2 rounded">
                  * الأرقام تقديرية وتعتمد على الاتفاق النهائي. لا تشمل رسوم الصيانة أو الخدمات الإضافية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};