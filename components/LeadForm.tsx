import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { UnitType, PurchaseMethod, LeadFormState } from '../types';

interface LeadFormProps {
  selectedInterest: UnitType;
}

export const LeadForm: React.FC<LeadFormProps> = ({ selectedInterest }) => {
  const [formData, setFormData] = useState<LeadFormState>({
    fullName: '',
    age: '',
    interestType: selectedInterest,
    purchaseMethod: 'cash',
    phone: '',
    email: '',
    notes: '',
    consent: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormState, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, interestType: selectedInterest }));
  }, [selectedInterest]);

  const validate = () => {
    const newErrors: Partial<Record<keyof LeadFormState, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "يرجى إدخال الاسم الكامل";
    if (!formData.age || Number(formData.age) < 18) newErrors.age = "يجب أن يكون العمر 18+";
    
    // Updated Regex for Syrian mobile numbers: 09 followed by 8 digits
    if (!formData.phone.match(/^(09)([0-9]{8})$/)) {
      newErrors.phone = "رقم الجوال غير صحيح (مثال: 09xxxxxxxx)";
    }
    
    if (!formData.consent) newErrors.consent = "يجب الموافقة على الشروط";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to local storage
    const submissions = JSON.parse(localStorage.getItem('leads') || '[]');
    submissions.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('leads', JSON.stringify(submissions));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="lead-form" className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-md p-12 rounded-3xl max-w-2xl mx-auto border border-white/20 shadow-2xl animate-fade-in-up">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary-600 mx-auto mb-6">
              <CheckCircle size={40} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold mb-4">تم استلام طلبك بنجاح!</h2>
            <p className="text-lg text-primary-50 mb-8">
              شكراً لاهتمامك بمجمع الشام، {formData.fullName}.<br/>
              سيقوم أحد مستشارينا العقاريين بالتواصل معك قريباً على الرقم {formData.phone}.
            </p>
            <div className="bg-black/20 rounded-xl p-6 text-right max-w-md mx-auto">
              <h3 className="font-bold border-b border-white/20 pb-2 mb-3">ملخص الطلب:</h3>
              <p className="text-sm mb-1 opacity-90">النوع: {formData.interestType === 'typeA' ? 'نموذج A' : 'نموذج B'}</p>
              <p className="text-sm mb-1 opacity-90">طريقة الدفع: {formData.purchaseMethod === 'cash' ? 'كاش' : 'أقساط'}</p>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-8 text-sm underline hover:text-white/80"
            >
              تسجيل طلب جديد
            </button>
          </div>
        </div>
      </section>
    );
  }

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
              سجل اهتمامك الآن وسنوافيك بكافة التفاصيل والأسعار المحدثة. الفرص المميزة لا تنتظر طويلاً، كن من أوائل الملاك في مجمع الشام.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary-400 font-bold">1</div>
                <div>
                  <h4 className="font-bold">سجّل بياناتك</h4>
                  <p className="text-sm text-gray-400">املأ النموذج بدقة لضمان التواصل السريع.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary-400 font-bold">2</div>
                <div>
                  <h4 className="font-bold">استشارة مجانية</h4>
                  <p className="text-sm text-gray-400">نتواصل معك لتحديد الأنسب لميزانيتك.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary-400 font-bold">3</div>
                <div>
                  <h4 className="font-bold">معاينة وحجز</h4>
                  <p className="text-sm text-gray-400">تفضل بزيارة الموقع واحجز وحدتك.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2 w-full">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-s-4 border-primary-500 ps-3">نموذج تسجيل الرغبات</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'} outline-none focus:ring-2 focus:ring-primary-200 transition-all`}
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    placeholder="09xxxxxxxx"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'} outline-none focus:ring-2 focus:ring-primary-200 transition-all text-left`}
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العمر <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'} outline-none focus:ring-2 focus:ring-primary-200 transition-all`}
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">النوع المهتم به</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 outline-none focus:ring-2 focus:ring-primary-200 transition-all bg-white"
                    value={formData.interestType}
                    onChange={(e) => setFormData({...formData, interestType: e.target.value as UnitType})}
                  >
                    <option value="typeA">نموذج A (90-110م)</option>
                    <option value="typeB">نموذج B (130-160م)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">طريقة الشراء</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 outline-none focus:ring-2 focus:ring-primary-200 transition-all bg-white"
                    value={formData.purchaseMethod}
                    onChange={(e) => setFormData({...formData, purchaseMethod: e.target.value as PurchaseMethod})}
                  >
                    <option value="cash">كاش (دفع نقدي)</option>
                    <option value="installments">أقساط (دفعات شهرية)</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني (اختياري)</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات (اختياري)</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-start gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-5 h-5 accent-primary-600 rounded cursor-pointer"
                      checked={formData.consent}
                      onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                    />
                    <span className="text-sm text-gray-600">
                      أوافق على سياسة الخصوصية وأسمح لفريق المبيعات بالتواصل معي عبر الهاتف أو الواتساب.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>إرسال الطلب</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};