import React from 'react';
import { Target, Users, TrendingUp, Clock } from 'lucide-react';

export const Company: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-dark-950 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">من نحن؟</h2>
            <div className="prose prose-lg text-gray-600 dark:text-gray-300 mb-8">
              <p>
                شركة رائدة في مجال التطوير العقاري، نسعى دائماً لتقديم حلول سكنية مبتكرة تجمع بين الجودة العالية والسعر المناسب. خبرتنا تمتد لأكثر من 15 عاماً في السوق المحلي، نفذنا خلالها العديد من المشاريع التي أصبحت معالم بارزة.
              </p>
              <p>
                نؤمن بأن المسكن ليس مجرد جدران، بل هو المكان الذي تبنى فيه الذكريات، لذلك نضع العميل في قلب اهتماماتنا ونحرص على الشفافية التامة في كل خطوة.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-900/50">
                <Target className="text-primary-600 dark:text-primary-400 mb-2" />
                <h4 className="font-bold text-gray-900 dark:text-white">رؤيتنا</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">ريادة التطوير العقاري بمعايير عالمية.</p>
              </div>
              <div className="p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl border border-accent-100 dark:border-accent-900/50">
                <Users className="text-accent-600 dark:text-accent-400 mb-2" />
                <h4 className="font-bold text-gray-900 dark:text-white">رسالتنا</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">توفير سكن راقٍ يحقق الرفاهية.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-600 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
            
            <h3 className="text-2xl font-bold mb-8 relative z-10">لماذا تختارنا؟</h3>
            
            <div className="space-y-6 relative z-10">
              {[
                { icon: <Clock />, title: "التزام بالمواعيد", desc: "نسلم مشاريعنا في الوقت المحدد دون تأخير." },
                { icon: <TrendingUp />, title: "قيمة استثمارية متزايدة", desc: "مواقعنا المختارة تضمن ارتفاع قيمة عقارك مستقبلاً." },
                { icon: <Users />, title: "خدمة ما بعد البيع", desc: "فريق مخصص لخدمتك حتى بعد استلام المفتاح." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-primary-500/20 flex items-center justify-center shrink-0 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-primary-400 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};